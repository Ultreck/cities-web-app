import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { userFormSchema } from "@/lib/formSchemas";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserMutation } from "@/apis/auth";
import { selectUserDetails } from "@/redux/selectors";
import UpdateUserCountrySelect from "../registrations/UpdateUserCountrySelect";

// Update schema for profile update
export const profileUpdateSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  user_name: z.string().min(3, "Username must be at least 3 characters"),
  gender: z.enum(["male", "female", "others"]),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  country_code: z.string().min(1, "Country code is required"),
  bio_info: z.string().optional(),
});

export type ProfileUpdateProps = z.infer<typeof profileUpdateSchema>;

export function ProfileUpdateDialog({open, setOpen}:{open:boolean,setOpen: (open:boolean)=>void}) {
  const user = useSelector(selectUserDetails);
  const { mutateAsync: updateUser,isPending:loading } = useUpdateUserMutation()
//   const [] = useState(false);
console.log("User in ProfileUpdateDialog:", user);

  const form = useForm<ProfileUpdateProps>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      user_name: "",
      gender: "male",
      city: "",
      state: "",
      country: "",
      country_code: "",
      bio_info: "",
    },
  });

  // Populate form with user data when dialog opens
  useEffect(() => {
  if (user && open) {
    const safeValues: ProfileUpdateProps = {
      first_name: String(user.first_name || ""),
      last_name: String(user.last_name || ""),
      email: String(user.email || ""),
      phone_number: String(user.phone_number || ""),
      user_name: String(user.user_name || ""),
      gender: (user.gender as "male" | "female" | "others") || "male",
      city: String(user.city || ""),
      state: String(user.state || ""),
      country: String(user.country || ""),
      country_code: String(user.country_code || ""),
      bio_info: String(user.bio_info || "")
    };

    form.reset(safeValues);
  }
}, [user, open, form]);


  const onSubmit = async (data: ProfileUpdateProps) => {
    try {
      const rawData = { ...data, phone_number: Number(data.phone_number) };
      
      // const res = await clientApi.put(`/user/update/${user.unique_id}`, rawData);
      const res = await updateUser(rawData);
      toast.success(res.data.message || "✅ Profile updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Update Your Profile
          </DialogTitle>
          <DialogDescription>
            Update your personal information below. All fields marked are required.
          </DialogDescription>
        </DialogHeader>

           <Form {...form}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input className="h-11" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input className="h-11" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <UpdateUserCountrySelect form={form} />
                      <Input
                        className="h-11"
                        placeholder="070*******25"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Male", "Female", "Others"].map((gen, index) => (
                          <SelectItem key={index} value={gen.toLowerCase()}>
                            {gen}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Gbagada"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Town</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Lagos"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="Nigeria"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio_info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 sm:gap-0 space-x-4">
              <Button disabled={loading} variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={loading}
              >
                {loading && <Loader className="animate-spin mr-2" size={16} />}
                {loading ? "Please wait..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}