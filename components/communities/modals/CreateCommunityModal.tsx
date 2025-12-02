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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { useCreateCommunityMutation } from "@/apis/communityMutation";
import { toast } from "react-toastify";

const createCommunitySchema = z.object({
  name: z.string().min(1, "Community name is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
});

export type CreateCommunityProps = z.infer<typeof createCommunitySchema>;

interface CreateCommunityModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Mock data for countries and states
const countriesData = {
  nigeria: ["lagos", "abuja", "rivers", "oyo", "kano", "edo"],
  ghana: ["greater accra", "ashanti", "western", "eastern", "central"],
  kenya: ["nairobi", "mombasa", "kisumu", "nakuru", "eldoret"],
  "south africa": ["gauteng", "western cape", "kwazulu-natal", "eastern cape"],
};

export function CreateCommunityModal({
  open,
  setOpen,
}: CreateCommunityModalProps) {
  const { mutateAsync: createCommunity, isPending: loading } = useCreateCommunityMutation();
  const [availableStates, setAvailableStates] = useState<string[]>([]);

  const form = useForm<CreateCommunityProps>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      name: "",
      country: "",
      state: "",
      city: "",
    },
  });

  const selectedCountry = form.watch("country");

  // Update available states when country changes
  const handleCountryChange = (country: string) => {
    form.setValue("state", ""); // Reset state when country changes
    form.setValue("city", ""); // Reset city when country changes
    
    if (country && countriesData[country as keyof typeof countriesData]) {
      setAvailableStates(countriesData[country as keyof typeof countriesData]);
    } else {
      setAvailableStates([]);
    }
  };

  const onSubmit = async (data: CreateCommunityProps) => {
    try {
      console.log("Community data:", data);
      await createCommunity(data);
      form.reset();
      toast.success("Community created successfully!");
      setOpen(false);
    } catch (err: any) {
      console.error("Failed to create community:", err);
      toast.error(
        err.response?.data?.message || "There was an error creating this community, please try again."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Community
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-4 px-6">
            {/* Community Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 bg-gray-100 border-0"
                      placeholder="Enter community name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country Select */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <select
                      className="h-11 bg-gray-100 border-0 rounded-md px-3 w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleCountryChange(e.target.value);
                      }}
                    >
                      <option value="">Select Country</option>
                      {Object.keys(countriesData).map((country) => (
                        <option key={country} value={country}>
                          {country.charAt(0).toUpperCase() + country.slice(1)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* State Select */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <select
                      className="h-11 bg-gray-100 border-0 rounded-md px-3 w-full"
                      {...field}
                      disabled={!selectedCountry}
                    >
                      <option value="">Select State</option>
                      {availableStates.map((state) => (
                        <option key={state} value={state}>
                          {state.charAt(0).toUpperCase() + state.slice(1)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City Input */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 bg-gray-100 border-0"
                      placeholder="Enter city"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter className="px-6 pt-6">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={loading}
              className="w-full h-12 rounded-full text-base font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {loading && <Loader className="animate-spin mr-2" size={18} />}
              {loading ? "Creating community..." : "Create Community"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}