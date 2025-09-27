'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  age: z.coerce.number().min(18, 'Must be at least 18').max(50),
  gender: z.enum(['Male', 'Female', 'Other']),
  university: z.string().min(3, 'University is required.'),
  city: z.string().min(3, 'City is required.'),
  budget_PKR: z.coerce.number().min(5000, 'Budget must be at least 5000 PKR.'),
  cleanliness: z.enum(['Tidy', 'Average', 'Messy']),
  sleep_schedule: z.enum(['Early bird', 'Night owl', 'Flexible']),
  study_habits: z.enum(['In-person classes', 'Online classes', 'Group studies', 'Quiet study']),
  food_pref: z.enum(['Cooks at home', 'Eats out', 'Flexible']),
  contact_number: z.string().regex(/^03\d{2}-\d{7}$/, 'Invalid format (e.g., 0300-1234567).'),
});

export default function OnboardingForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      age: 18,
      university: '',
      city: '',
      budget_PKR: 15000,
      contact_number: '',
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend/Firestore
    toast({
      title: 'Profile Created!',
      description: 'Your profile has been successfully created. Redirecting to dashboard...',
    });
    setTimeout(() => router.push('/dashboard'), 2000);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto glassmorphic">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">Create Your Profile</CardTitle>
        <CardDescription>
          Tell us about yourself to find the best matches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ahmed Khan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0300-1234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., NUST, LUMS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Islamabad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget_PKR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Budget (PKR)</FormLabel>
                      <FormControl>
                        <Input type="number" step="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cleanliness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cleanliness</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select cleanliness level" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tidy">Tidy</SelectItem>
                          <SelectItem value="Average">Average</SelectItem>
                          <SelectItem value="Messy">Messy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sleep_schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Schedule</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select sleep schedule" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Early bird">Early Bird</SelectItem>
                            <SelectItem value="Night owl">Night Owl</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="study_habits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Study Habits</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select study habits" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="In-person classes">In-person classes</SelectItem>
                            <SelectItem value="Online classes">Online classes</SelectItem>
                            <SelectItem value="Group studies">Group studies</SelectItem>
                            <SelectItem value="Quiet study">Quiet study</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="food_pref"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select food preference" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Cooks at home">Cooks at home</SelectItem>
                            <SelectItem value="Eats out">Eats out</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Button type="submit" size="lg" className="w-full md:w-auto glow-primary">
              Save Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
