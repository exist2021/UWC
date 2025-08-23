"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { sendContactMessage } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(data: ContactFormValues) {
    const result = await sendContactMessage(data);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We will get back to you shortly.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: result.message || "There was an error sending your message. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 98765 43210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="How can we help you?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I allow this website to store my submission so they can respond to my inquiry.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" variant="destructive" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
