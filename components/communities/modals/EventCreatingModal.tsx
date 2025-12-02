import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useState } from "react";
import { Loader, MapPin } from "lucide-react";
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
import { Textarea } from "../../ui/textarea";
import { useCreateEventMutation } from "@/apis/communityMutation";
import { toast } from "react-toastify";

const eventCreatingSchema = z.object({
  community_id: z.string().min(1, "Community ID is required"),
  name: z.string().min(1, "Event name is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  amount: z.number().min(0, "Amount must be positive"),
  currency: z.string().min(1, "Currency is required"),
  location: z.string().min(1, "Location is required"),
  link: z.string().url("Must be a valid URL").or(z.literal("")),
  about: z.string().optional(),
});

export type EventCreatingProps = z.infer<typeof eventCreatingSchema>;

interface EventCreatingModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  communityId?: string;
}

export function EventCreatingModal({
  open,
  setOpen,
  communityId = "",
}: EventCreatingModalProps) {
  const {mutateAsync:createEvent, isPending:loading} = useCreateEventMutation()

  const form = useForm<EventCreatingProps>({
    resolver: zodResolver(eventCreatingSchema),
    defaultValues: {
      community_id: communityId,
      name: "",
      startTime: "",
      endTime: "",
      amount: 0,
      currency: "N",
      location: "",
      link: "",
      about: "",
    },
  });

  const onSubmit = async (data: EventCreatingProps) => {
    try {

    console.log("Event data:", data);
await createEvent(data)
      form.reset();
      toast.success("Event created successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Failed to create event:", err);
      toast.error(
          err.response.data.message || "There is an error creating this event, please try again."
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Post new event
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-4 px-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 bg-gray-100 border-0"
                      placeholder="NIGHT OF MERCY 14 - AMOS FENWA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-gray-100 border-0"
                        placeholder="16, Nov 10:00 am"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-gray-100 border-0"
                        placeholder="16, Nov 10:00 pm"
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        className="h-11 bg-gray-100 border-0 pl-10"
                        placeholder="Lekki"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket price</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-gray-100 border-0"
                        type="number"
                        placeholder="20000"
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
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-gray-100 border-0"
                        placeholder="N"
                        maxLength={1}
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
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Link (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 bg-gray-100 border-0"
                      placeholder="https://example.com"
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
                  <FormLabel>About Event (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about the event..."
                      className="resize-none bg-gray-100 border-0"
                      rows={3}
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
              {loading ? "Posting event..." : "Post event"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
