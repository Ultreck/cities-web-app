"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Loader, MapPin, Upload, X, Plus } from "lucide-react";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { Textarea } from "../../ui/textarea";
import { toast } from "react-toastify";
import { useCreateRentPropertyMutation } from "@/apis/communityMutation";

const rentPostSchema = z.object({
  community_id: z.string().min(1, "Community ID is required"),
  name: z.string().min(1, "Property name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  price: z.number().min(0, "Price must be positive"),
  rent_type: z.enum(['monthly', 'yearly']),
});

export type RentPostProps = z.infer<typeof rentPostSchema>;

interface RentPostModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  communityId?: string;
}

export function RentPostingModal({
  open,
  setOpen,
  communityId = "",
}: RentPostModalProps) {
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const {mutateAsync:createRentPost, isPending:isSubmitting}= useCreateRentPropertyMutation()

  const form = useForm<RentPostProps>({
    resolver: zodResolver(rentPostSchema),
    defaultValues: {
      community_id: communityId,
      name: "",
      description: "",
      location: "",
      price: 0,
      rent_type: "monthly",
    },
  });

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setMediaFiles(files);

    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string);
            if (newPreviews.length === files.length) {
              setPreviewImages([...previewImages, ...newPreviews]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    // Also remove from mediaFiles if needed
    if (mediaFiles) {
      const updatedFiles = Array.from(mediaFiles).filter((_, i) => i !== index);
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach(file => dataTransfer.items.add(file));
      setMediaFiles(dataTransfer.files);
    }
  };

  const onSubmit = async (data: RentPostProps) => {
    try {

      // Create FormData instance
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // Append media files if any
      if (mediaFiles) {
        for (let i = 0; i < mediaFiles.length; i++) {
          formData.append('media', mediaFiles[i]);
        }
      }

      console.log("Rent post data:", data);
      console.log("Media files:", mediaFiles);

      await createRentPost(formData);

      form.reset();
      setMediaFiles(null);
      setPreviewImages([]);
      toast.success("Rental property posted successfully!");
      setOpen(false);
    } catch (err: any) {
      console.error("Failed to create rent post:", err);
      toast.error(
        err.response?.data?.message || "There was an error posting this property, please try again."
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full md:w-[550px] !max-w-none min-h-screen overflow-y-auto">
        <SheetHeader className="px-6 md:px-8">
          <SheetTitle className="text-lg md:text-2xl">Post Rental Property</SheetTitle>
          <SheetDescription>List your property for rent</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
            {/* Property Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 bg-gray-100 border-0"
                      placeholder="Fully detached 2 bedroom flat"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the property features, amenities, and location benefits..."
                      className="resize-none bg-gray-100 border-0 min-h-32"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        className="h-11 bg-gray-100 border-0 pl-10"
                        placeholder="Diya Street, Gbagada Phase 1"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price and Rent Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-gray-100 border-0"
                        type="number"
                        placeholder="2000000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rent_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent Type</FormLabel>
                    <FormControl>
                      <select
                        className="h-11 bg-gray-100 border-0 rounded-md px-3 w-full"
                        {...field}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Preview Gallery */}
            {previewImages.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-4 justify-between mb-2">
                  <h1 className="font-semibold">{previewImages.length > 1 ? "Images" : "Image"}</h1>
                  <div className='h-5 w-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs'>
                    {previewImages.length}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {previewImages.slice(0, 3).map((image, index) => {
                    const isThirdSlot = index === 2;
                    const hasExtraImages = previewImages.length > 3;
                    const hideRemoveButton = isThirdSlot && hasExtraImages;

                    return (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover object-top rounded-lg border border-slate-200"
                        />

                        {!hideRemoveButton && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 cursor-pointer bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        )}

                        {isThirdSlot && hasExtraImages && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              +{previewImages.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Media Upload Button */}
            <div className="mb-6">
              <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors group">
                <Plus
                  size={20}
                  className="text-slate-500 group-hover:text-blue-500"
                />
                <span className="text-slate-600 group-hover:text-blue-600 font-medium">
                  Add property images
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
              </label>
            </div>
          </form>
        </Form>

        <SheetFooter>
          <div className="px-6 md:px-8 flex flex-col-reverse md:flex-row gap-4 md:justify-end w-full">
            <Button 
              variant="outline" 
              className="cursor-pointer" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              className="py-3 text-lg font-semibold rounded-full cursor-pointer md:rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting && <Loader className="animate-spin mr-2" size={18} />}
              {isSubmitting ? "Posting..." : "Post Property"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}