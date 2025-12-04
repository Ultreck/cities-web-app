'use client';

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchItem {
  id: string;
  type: 'post' | 'community' | 'job';
  name?: string;
  title?: string;
  author?: string;
  username?: string;
  content?: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch: (item: SearchItem) => void;
  data: SearchItem[];
}

export function SearchBar({ placeholder = "Search...", onSearch, data = [] }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setShowResults(false)
      return
    }

    // Filter data based on query
    const filtered = data.filter((item) => {
      const searchText = query.toLowerCase()
      return (
        item.name?.toLowerCase().includes(searchText) ||
        item.title?.toLowerCase().includes(searchText) ||
        item.author?.toLowerCase().includes(searchText) ||
        item.username?.toLowerCase().includes(searchText) ||
        item.content?.toLowerCase().includes(searchText)
      )
    })

    setResults(filtered)
    setShowResults(true)
  }, [query, data])

  const handleSelect = (item: SearchItem) => {
    if (onSearch) {
      onSearch(item)
    }
    setQuery('')
    setShowResults(false)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder={placeholder}
          className="pl-10 pr-10 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {results.map((item, index) => (
              <button
                key={index}
                className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors"
                onClick={() => handleSelect(item)}
              >
                {/* <div className="font-medium text-sm">
                  {item.name || item.title || item.author}
                </div>
                {(item.username || item.content) && (
                  <div className="text-xs text-muted-foreground truncate">
                    {item.username || item.content}
                  </div>
                )} */}
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {showResults && results.length === 0 && query && (
        <Card className="absolute top-full mt-2 w-full z-50">
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            No results found for &quot;{query}&quot;
          </CardContent>
        </Card>
      )}
    </div>
  )
}