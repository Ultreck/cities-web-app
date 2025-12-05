"use client";

import { useState, useEffect } from "react";
// import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
// import { trpc } from "@/lib/trpc";
import { Globe, Lock, Users, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import clientApi from "@/apis/clientApi";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useCreatePostMutation } from "@/apis/postMutation";
import { selectUserDetails } from "@/redux/selectors";
import { RootState } from "@/redux/store";

type VisibilityType = "public" | "private" | "friends";

export default function CreatePostDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const user = useSelector(selectUserDetails);
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<VisibilityType>("public");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[] | null>(null);
  const [file, setFile] = useState<File[]>([]);
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePostMutation();

function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>): void {
  const uploadedFiles = e.currentTarget.files ? Array.from(e.currentTarget.files) : null;
  if (!uploadedFiles) return;

  setFiles(uploadedFiles);

  const previewsPromises = uploadedFiles.map((file) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") resolve(result);
        else reject(new Error("FileReader result is not a string"));
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    })
  );

  Promise.all(previewsPromises).then((previews) => {
    setPreviewImages((prev) => [...prev, ...previews]);
  });
}



  
  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    console.log(files);

    if (!content.trim()) return;
    const formData = new FormData();
    formData.append("content", content);
    if (files) {
      for (const f of files) {
        formData.append("media", f);
      }
    }

    formData.append("audience", visibility);
    try {
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const response = await createPost(formData);
      console.log("Post created:", response);
      setContent("");
      setPreviewImages([]);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const visibilityOptions = [
    { value: "public" as VisibilityType, label: "Public", icon: Globe },
    { value: "friends" as VisibilityType, label: "Friends", icon: Users },
    { value: "private" as VisibilityType, label: "Private", icon: Lock },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full md:w-[550px] !max-w-none min-h-screen overflow-y-auto">
        <SheetHeader className="px-6 md:px-8">
          <SheetTitle className="text-lg md:text-2xl">Create Post</SheetTitle>
          <SheetDescription>
            Share your thoughts with the world
          </SheetDescription>
        </SheetHeader>
        <div className="p-6 md:p-8">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
            <Avatar className="w-12 h-12 border-4 border-white">
              <AvatarImage
                src={typeof user?.profile_pic === "string" ? user.profile_pic : ""}
                alt={String(user?.first_name ?? "")}
                className="w-full h-full object-cover object-top"
              />
              <AvatarFallback className="text-4xl bg-gray-300">
                {typeof user?.first_name === "string" && user.first_name.length > 0
                  ? user.first_name.charAt(0)
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-900">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm text-slate-500">
                @{user?.user_name || "user"}
              </p>
            </div>
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <Textarea
              placeholder="What's on your mind.."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-32 text-lg placeholder:text-slate-400 resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500 mt-2">
              {content.length} characters
            </p>
          </div>

          {/* Image Preview Gallery */}
          {previewImages.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-4 justify-between mb-2">
                <h1>{previewImages.length > 1 ? "Images" : "Image"}</h1>
                <div className="h-5 w-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
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

          {/* Image Upload Button */}
          <div className="mb-6">
            <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors group">
              <Plus
                size={20}
                className="text-slate-500 group-hover:text-blue-500"
              />
              <span className="text-slate-600 group-hover:text-blue-600 font-medium">
                Add images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Visibility Selector */}
          <div className="mb-4 pb-4 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-900 mb-3">
              Who can see this?
            </p>
            <div className="flex flex-wrap gap-3">
              {visibilityOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setVisibility(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    visibility === value
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter>
          <div className="px-6 md:px-8 flex flex-col-reverse md:flex-row gap-4 md:justify-end">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isCreatingPost || (!file && !content.trim())}
              onClick={handleSubmit}
              className="py-3 text-lg font-semibold rounded-full cursor-pointer md:rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isCreatingPost ? "Creating..." : "Create post"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
