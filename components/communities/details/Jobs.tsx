'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { CreatePostModal, PostData } from './CreatePostModal';
import { JobCard } from './JobCard';
import { useGetJobs } from '@/apis/communityMutation';
import { JobPostingModal } from '../modals/JobPostingModal';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  description: string;
  company_logo?: string | null;
  currency?: string;
  link?: string | null;
}

export default function Jobs({ community, hasJoined }: { community: any, hasJoined:boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [localJobs, setLocalJobs] = useState<Job[]>([]);
  const { data: jobData, isLoading } = useGetJobs(community?.unique_id);


  // Transform API data to Job format
  const apiJobs: Job[] = jobData?.map((job: any) => ({
    id: job.unique_id,
    title: job.role || 'No title',
    company: job.company || 'Company not specified',
    location: job.location || 'Location not specified',
    salary: `${job.currency || ''} ${job.amount || 'Negotiable'}`.trim(),
    type: 'Full-time', // You might want to add this field to your API
    postedDate: formatDate(job.createdAt),
    description: job.description || job.about || 'No description provided',
    company_logo: job.company_logo,
    currency: job.currency,
    link: job.link
  })) || [];

  // Combine API jobs with locally created jobs
  const allJobs = [...apiJobs, ...localJobs];

  const handleCreateJob = (data: PostData) => {
    const newJob: Job = {
      id: String(Date.now()), // Temporary ID for local jobs
      title: data.title,
      company: data.category || 'Company Name',
      location: data.location || 'TBD',
      salary: data.salary || 'Negotiable',
      type: 'Full-time',
      postedDate: 'Just now',
      description: data.description,
    };
    setLocalJobs(prev => [newJob, ...prev]);
    setIsModalOpen(false);
  };

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date to relative time
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  // Skeleton loading component
  const JobCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-40 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-2xl">💼</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No job opportunities yet</h3>
        <p className="text-gray-600 mb-6">
          There are currently no job postings in this community. Be the first to post a job opportunity!
        </p>
      {hasJoined && <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Post first job
        </Button>}
      </div>
    </div>
  );

  // No search results state
  const NoSearchResults = () => (
    <div className="text-center py-8">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Search className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600">
          No jobs match your search for "<span className="font-medium">{searchQuery}</span>". Try different keywords.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
       {hasJoined && <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Post new job
        </Button>}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search jobs by title, company, location, or description..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Empty State - No jobs at all */}
      {!isLoading && allJobs.length === 0 && <EmptyState />}

      {/* Jobs Grid - When data is loaded and we have jobs */}
      {!isLoading && allJobs.length > 0 && (
        <>
          {filteredJobs.length === 0 ? (
            <NoSearchResults />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  onApply={() => console.log('Applied to:', job.title)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Job Modal */}
      <JobPostingModal open={isModalOpen} setOpen={setIsModalOpen} communityId={community?.unique_id} />
      {/* <CreatePostModal
        isOpen={isModalOpen}
        title="Post new job"
        description="Post a job opening for the community"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
        type="job"
      /> */}
    </div>
  );
}