'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CreatePostModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onSubmit: (data: PostData) => void;
  type: 'event' | 'job' | 'property';
}

export interface PostData {
  title: string;
  description: string;
  location?: string;
  date?: string;
  time?: string;
  salary?: string;
  price?: string;
  category?: string;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onSubmit,
  type,
}) => {
  const [formData, setFormData] = useState<PostData>({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    salary: '',
    price: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      location: '',
      date: '',
      time: '',
      salary: '',
      price: '',
      category: '',
    });
  };

  const handleChange = (
    e: { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={4}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>

          {/* Type-specific fields */}
          {type === 'event' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {type === 'job' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <Input
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g., $50k - $70k"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </>
          )}

          {type === 'property' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <Input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., $1,200/month"
                />
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// 'use client';

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { MapPin, X } from 'lucide-react';

// interface CreatePostModalProps {
//   isOpen: boolean;
//   title: string;
//   description: string;
//   onClose: () => void;
//   onSubmit: (data: PostData) => void;
//   type: 'event' | 'job' | 'property';
// }

// export interface PostData {
//   title: string;
//   description: string;
//   location?: string;
//   date?: string;
//   time?: string;
//   salary?: string;
//   price?: string;
//   category?: string;
// }

// interface FormData {
//   title: string;
//   startDate: string;
//   startTime: string;
//   endDate: string;
//   endTime: string;
//   location: string;
//   price: string;
// }

// export const CreatePostModal: React.FC<CreatePostModalProps> = ({
//   isOpen,
//   title,
//   description,
//   onClose,
//   onSubmit,
//   type,
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     title: '',
//     startDate: '',
//     startTime: '',
//     endDate: '',
//     endTime: '',
//     location: '',
//     price: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setFormData({
//     title: '',
//     startDate: '',
//     startTime: '',
//     endDate: '',
//     endTime: '',
//     location: '',
//     price: '',
//   });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//    <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//         {/* <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <h2 className="text-xl font-bold text-gray-900">Post new event</h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-600" />
//           </button>
//         </div> */}

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div>
//             <label className="block text-base font-semibold text-gray-900 mb-2">
//               Event name
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter event name"
//               className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-base font-semibold text-gray-900 mb-2">
//               From
//             </label>
//             <div className="flex gap-3">
//               <input
//                 type="datetime-local"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-base font-semibold text-gray-900 mb-2">
//               To
//             </label>
//             <div className="flex gap-3">
//               <input
//                 type="datetime-local"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-base font-semibold text-gray-900 mb-2">
//               Location
//             </label>
//             <div className="relative">
//               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="Enter location"
//                 className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-base font-semibold text-gray-900 mb-2">
//               Ticket price
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-lg font-medium">
//                 ₦
//               </span>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="0"
//                 className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors"
//           >
//             Post event
//           </button>
//         </form>
//       </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

