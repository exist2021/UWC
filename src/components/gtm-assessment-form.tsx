
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition, useState, useEffect } from 'react';
import { submitGtmRequest } from '@/app/actions';
import { GtmFitReportSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, UploadCloud } from 'lucide-react';
import { Separator } from './ui/separator';

const salesChannels = [
    { id: 'field_sales', label: 'Field Sales' },
    { id: 'inside_sales', label: 'Inside Sales' },
    { id: 'channel_partners', label: 'Channel Partners (Distributors, Resellers, VARs)' },
    { id: 'digital_marketing', label: 'Digital Marketing (Google Ads, Facebook Ads, etc.)' },
    { id: 'social_media', label: 'Social Media Marketing' },
    { id: 'events', label: 'Events and Trade Shows' },
    { id: 'affiliate', label: 'Affiliate or Referral Programs' },
    { id: 'app_stores', label: 'App Stores / Marketplaces' },
    { id: 'other', label: 'Other' },
];

type FormValues = z.infer<typeof GtmFitReportSchema>;

export function GtmAssessmentForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(GtmFitReportSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      productName: '',
      website: '',
      role: undefined,
      roleOther: '',
      salesChannels: [],
      channelDetails: {},
      challenge: '',
      goals: '',
    },
  });

  const selectedChannels = form.watch('salesChannels');
  
  useEffect(() => {
    // Clear details for channels that are no longer selected
    const currentChannelDetails = form.getValues('channelDetails');
    const newChannelDetails: { [key: string]: any } = {};
    selectedChannels.forEach(channelId => {
      if (currentChannelDetails[channelId]) {
        newChannelDetails[channelId] = currentChannelDetails[channelId];
      } else {
        // Initialize if it's a new selection
        newChannelDetails[channelId] = {
            leadToProspect: '',
            prospectToCustomer: '',
            salesCost: '',
            marketingCost: '',
        };
      }
    });
    form.setValue('channelDetails', newChannelDetails);
  }, [selectedChannels, form]);


  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await submitGtmRequest(values);
      if (result.success) {
        setIsSuccess(true);
        setSuccessMessage(result.message || 'Submission successful!');
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: result.message,
        });
      }
    });
  };

  return (
    <section id="gtm-assessment-form" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <Card className="shadow-2xl border-t-4 border-primary bg-white/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-headline text-primary">Get Your Free GTM Fit Report</CardTitle>
              <CardDescription className="pt-2 text-lg">
                Please fill out the form with accurate information about your business. This will help us create a personalized GTM feasibility report based on probability modeling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center p-8 flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                  <h3 className="text-3xl font-bold font-headline text-primary">Thank You!</h3>
                  <p className="text-muted-foreground text-lg">
                    {successMessage}
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
                    Submit Another
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                    
                    {/* Section 1: Basic Business Information */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-headline text-primary border-b pb-2">Basic Business Information</h3>
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Full Name*</FormLabel>
                          <FormControl><Input placeholder="e.g., Priya Sharma" {...field} className="py-6 text-base" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Email Address*</FormLabel>
                          <FormControl><Input placeholder="e.g., priya@example.com" {...field} className="py-6 text-base" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                       <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Phone Number</FormLabel>
                          <FormControl><Input placeholder="e.g., +91 98765 43210" {...field} className="py-6 text-base" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                      <FormField control={form.control} name="productName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Company or Product Name*</FormLabel>
                          <FormControl><Input placeholder="e.g., Sharma Innovations" {...field} className="py-6 text-base" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                      <FormField control={form.control} name="website" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Website or URL</FormLabel>
                          <FormControl><Input placeholder="https://example.com" {...field} className="py-6 text-base" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                    </div>

                    <Separator />

                    {/* Section 2: Your Role */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-headline text-primary border-b pb-2">Your Role</h3>
                       <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Role*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                               <SelectTrigger className="py-6 text-base">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="founder">Founder</SelectItem>
                              <SelectItem value="marketing_manager">Marketing Manager</SelectItem>
                              <SelectItem value="sales_manager">Sales Manager</SelectItem>
                              <SelectItem value="product_manager">Product Manager</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}/>
                      {form.watch('role') === 'other' && (
                        <FormField control={form.control} name="roleOther" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">If other, please specify</FormLabel>
                                <FormControl><Input placeholder="Your role" {...field} className="py-6 text-base" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                      )}
                    </div>
                    
                    <Separator />

                    {/* Section 3: Sales Channels */}
                    <div className="space-y-6">
                       <h3 className="text-2xl font-headline text-primary border-b pb-2">Sales Channels & Leads</h3>
                        <FormField
                            control={form.control}
                            name="salesChannels"
                            render={() => (
                            <FormItem>
                                <div className="mb-4">
                                <FormLabel className="text-lg">Select Sales Channels*</FormLabel>
                                <FormDescription>
                                Select all sales channels you are currently using or considering.
                                </FormDescription>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {salesChannels.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="salesChannels"
                                    render={({ field }) => (
                                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...field.value, item.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item.id
                                                        )
                                                    )
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-base leading-snug">{item.label}</FormLabel>
                                        </FormItem>
                                    )}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         {selectedChannels.length > 0 && selectedChannels.length <= 2 && (
                            <div className="space-y-8 pt-4">
                                {selectedChannels.map((channelId) => {
                                    const channel = salesChannels.find(c => c.id === channelId);
                                    if (!channel) return null;
                                    return (
                                        <div key={channelId} className="p-6 border rounded-lg bg-background/50">
                                            <h4 className="text-xl font-semibold text-primary mb-4">{channel.label}</h4>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <FormField control={form.control} name={`channelDetails.${channelId}.leadToProspect`} render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Lead to Prospect Rate (%)</FormLabel>
                                                        <FormControl><Input type="number" placeholder="e.g., 10" {...field} className="text-base" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <FormField control={form.control} name={`channelDetails.${channelId}.prospectToCustomer`} render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Prospect to Customer Rate (%)</FormLabel>
                                                        <FormControl><Input type="number" placeholder="e.g., 25" {...field} className="text-base" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <FormField control={form.control} name={`channelDetails.${channelId}.salesCost`} render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Avg. Monthly Sales Cost</FormLabel>
                                                        <FormControl><Input type="number" placeholder="e.g., 50000" {...field} className="text-base" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <FormField control={form.control} name={`channelDetails.${channelId}.marketingCost`} render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Avg. Monthly Marketing Cost</FormLabel>
                                                        <FormControl><Input type="number" placeholder="e.g., 25000" {...field} className="text-base" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                         )}

                         {selectedChannels.length > 2 && (
                            <div className="p-4 bg-blue-100/50 border border-blue-200 text-primary rounded-lg text-center">
                                <p>You selected multiple channels. For a custom analysis, please upload your GTM data file below or contact us directly.</p>
                            </div>
                         )}
                    </div>
                    
                    <Separator />

                    {/* Section 4: Challenges and Goals */}
                    <div className="space-y-6">
                         <h3 className="text-2xl font-headline text-primary border-b pb-2">Current GTM Challenges and Goals</h3>
                          <FormField
                            control={form.control}
                            name="challenge"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-lg">Biggest GTM Challenge*</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="e.g., 'Struggling to find the right marketing channels for our new SaaS product.'"
                                    className="min-h-[120px] text-base"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <FormField
                            control={form.control}
                            name="goals"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-lg">Short-term GTM Goals*</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="e.g., 'Acquire first 100 paying customers in the next 3 months.'"
                                    className="min-h-[120px] text-base"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                    
                    <Separator />
                    
                    {/* Section 5: File Upload */}
                     <div className="space-y-4">
                         <h3 className="text-2xl font-headline text-primary border-b pb-2">Upload Supporting Documents</h3>
                        <FormItem>
                            <FormLabel className="text-lg">GTM Plan / Pitch Deck</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                                    <div className="text-center">
                                        <UploadCloud className="w-8 h-8 mx-auto text-muted-foreground" />
                                        <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PDF, DOCX, or PPTX (Max 5MB)</p>
                                    </div>
                                    <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled/>
                                </div>
                            </FormControl>
                             <FormDescription>
                                Optional: Upload your pitch deck, GTM plan file, or any related document. (File upload is currently disabled).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </div>


                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Get My Free GTM Fit Report"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
