import { useState } from 'react';
import {
  ShoppingBag,
  Building2,
  Landmark,
  Scissors,
  Fuel,
  GraduationCap,
  UtensilsCrossed,
  Hotel,
  ChevronDown,
  MapPin,
  MessageCircle
} from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: string;
  location: string;
}

const providerTypes = [
  { id: 'supermarket', name: 'Supermarket', icon: ShoppingBag },
  { id: 'hospital', name: 'Hospital', icon: Building2 },
  { id: 'bank', name: 'Bank', icon: Landmark },
  { id: 'salon', name: 'Salon', icon: Scissors },
  { id: 'petrol-station', name: 'Petrol station', icon: Fuel },
  { id: 'school', name: 'School', icon: GraduationCap },
  { id: 'eatery', name: 'Eatery', icon: UtensilsCrossed },
  { id: 'hotel', name: 'Hotel', icon: Hotel },
];

const locations = ['Lekki', 'Victoria Island', 'Ikeja', 'Surulere', 'Ajah'];

export default function ProviderSearch() {
  const [selectedProvider, setSelectedProvider] = useState('supermarket');
  const [selectedLocation, setSelectedLocation] = useState('Lekki');
  const [showProviderDropdown, setShowProviderDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<Provider[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const selectedProviderType = providerTypes.find(p => p.id === selectedProvider);

  const handleSearch = () => {
    const mockResults: Provider[] = [
      { id: '1', name: 'Most Famous Supermarket', type: selectedProvider, location: selectedLocation },
      { id: '2', name: 'Another Supermarket', type: selectedProvider, location: selectedLocation },
      { id: '3', name: 'Shoprite', type: selectedProvider, location: selectedLocation },
      { id: '4', name: 'Cravings', type: selectedProvider, location: selectedLocation },
      { id: '5', name: 'The place', type: selectedProvider, location: selectedLocation },
    ];
    setSearchResults(mockResults);
    setHasSearched(true);
  };

  if (hasSearched) {
    return (
      <div className="bg-white p-6">
        <h2 className="text-2xl font-bold mb-6">Results ({searchResults.length})</h2>
        <div className="space-y-4">
          {searchResults.map((result) => (
            <div key={result.id} className="bg-gray-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">{result.name}</h3>
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Get directions</span>
                </button>
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white p-6">
      <h1 className="text-3xl font-bold mb-12">Find a service provider</h1>

      <div className="space-y-8">
        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">
            What kind of provider are you looking for?
          </label>
          <div className="relative">
            <button
              onClick={() => setShowProviderDropdown(!showProviderDropdown)}
              className="w-full bg-gray-100 rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-900 font-medium">
                {selectedProviderType?.name}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-700" />
            </button>

            {showProviderDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-10 border border-gray-200">
                {providerTypes.map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <button
                      key={provider.id}
                      onClick={() => {
                        setSelectedProvider(provider.id);
                        setShowProviderDropdown(false);
                      }}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-6 h-6 text-gray-700" />
                        <span className="text-gray-900 font-medium">{provider.name}</span>
                      </div>
                      {selectedProvider === provider.id && (
                        <div className="text-green-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">
            In what location are you searching for?
          </label>
          <div className="relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="w-full bg-gray-100 rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-900 font-medium">{selectedLocation}</span>
              <ChevronDown className="w-5 h-5 text-gray-700" />
            </button>

            {showLocationDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-10 border border-gray-200">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-900 font-medium">{location}</span>
                    {selectedLocation === location && (
                      <div className="text-green-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

    <div className='flex items-center justify-end'>
            <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
    </div>
      </div>
    </div>
  );
}
