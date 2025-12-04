import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useState } from "react";
import { Loader } from "lucide-react";
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
import { usePostJobMutation } from "@/apis/communityMutation";
import { toast } from "react-toastify";

const jobPostingSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  amount: z.number().min(0, "Amount must be positive"),
  community_id: z.string().min(1, "Community ID is required"),
  location: z.string().min(1, "Location is required"),
  company_logo: z.string().optional(),
  link: z.string().url("Must be a valid URL").or(z.literal("")),
  description: z.string().min(1, "Description is required"),
  about: z.string().min(1, "About section is required"),
});

export type JobPostingProps = z.infer<typeof jobPostingSchema>;

interface JobPostingModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  communityId?: string;
}

export function JobPostingModal({
  open,
  setOpen,
  communityId = "",
}: JobPostingModalProps) {
    const {mutateAsync:postJob, isPending:loading} =usePostJobMutation()

  const form = useForm<JobPostingProps>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      company: "",
      role: "",
      amount: 0,
      community_id: communityId,
      location: "",
      company_logo: "",
      link: "",
      description: "",
      about: "",
    },
  });

  const onSubmit = async (data: JobPostingProps) => {
    try {
      console.log("Job posting data:", data);
      await postJob(data);
      form.reset();
       toast.error("Job posted successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Failed to post job:", err);
       toast.error(
                err.response.data.message || "There is an error creating this event, please try again."
              );
          }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full md:w-[550px] !max-w-none min-h-screen overflow-y-auto">
        <SheetHeader className="px-6 md:px-8">
          <SheetTitle className="text-lg md:text-2xl">Post New Job</SheetTitle>
          <SheetDescription>Create a new job posting for your community</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="Enter company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="e.g. Software Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      type="number"
                      placeholder="1000000"
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="e.g. Nigeria"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="https://example.com/logo.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Link</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="https://example.com/apply"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job role and responsibilities..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About the Company</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about the company..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter>
          <div className="px-6 md:px-8 flex flex-col-reverse md:flex-row gap-4 md:justify-end w-full">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={loading}
              className="py-3 text-lg font-semibold rounded-full cursor-pointer md:rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading && <Loader className="animate-spin mr-2" size={18} />}
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}