import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  // PartnerProtectedPage as ProtectedPage,
  ProtectedPage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "~/components";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { addDays, format, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/utils/cn";
import { eventPostFormSchema as formSchema } from "~/utils/schemas";
import { api } from "~/utils/api";
import { locations as availableLocations } from "~/data/locations";
import { sportCategories as availableSportCategories } from "~/data/sportCategories";

const Dashboard: NextPage = () => {
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "BMX",
      location: "ATH",
      imageUrl: "",
      price: 0,
      date: new Date(),
    },
  });
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: (post) => {
      console.log(`Post ${post.title} created successfully!`);
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <ProtectedPage>
      <Head>
        <title>Partner Dashboard | AirES</title>
        <meta
          name="description"
          content="Manage your event posts through your presonalized dashboard"
        />
      </Head>

      <main className="container grid grid-cols-1 items-center py-8">
        <div className="grid h-full w-full grow grid-rows-2 items-center text-center">
          <h1 className="text-xl">
            This is your dashboard,{" "}
            <span className="font-semibold">{user?.fullName}</span>!
          </h1>
        </div>
        <div className="mx-auto mt-8 text-left align-top">
          <h2 className="text-xl font-medium">Ready to post a new event?</h2>
          <section className="mt-8 max-w-sm">
            <Form {...form}>
              <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My awesome event" {...field} />
                      </FormControl>
                      <FormDescription>Give your event a title</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step={0.1} />
                      </FormControl>
                      <FormDescription>
                        How much does your event cost?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="My event is going to be awesome because..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a short description of your event
                      </FormDescription>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableLocations.map((location) => (
                            <SelectItem
                              value={location.city_code}
                              key={location.city_code}
                            >
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose one of the available locations
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableSportCategories.map((category) => (
                            <SelectItem
                              className="font-sans"
                              value={category.value}
                              key={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose one of the available categories
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="http://notrealdomain.com/myImage"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Give your event an awesome title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              // The date must be at least 1 day in the future
                              isBefore(date, addDays(new Date(), 1))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>The date of your event</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPosting}>
                  Submit
                </Button>
              </form>
            </Form>
          </section>
        </div>
      </main>
    </ProtectedPage>
  );
};

export default Dashboard;
