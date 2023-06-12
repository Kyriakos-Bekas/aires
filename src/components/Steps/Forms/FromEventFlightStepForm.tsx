import { useMemo, useState } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { addDays, format, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/utils/cn";
import { flightFormSchema as formSchema } from "~/utils/schemas";
import {
  type CountryCode,
  locations as availableLocations,
  countries,
  type LocationCode,
} from "~/data/locations";
import { api } from "~/utils/api";
import { usePlanStore } from "~/utils/state";
import { FromEventFlightList } from "~/components/Flight";
import { type UserData } from "./ToEventFlightStepForm";

const FromEventFlightStepForm = () => {
  const [formHasBeenSubmittedOnce, setFormHasBeenSubmittedOnce] =
    useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("GR");
  const eventId = usePlanStore((state) => state.eventId);
  const { data: post } = api.post.getOne.useQuery({ id: eventId });

  const locationsMemoized = useMemo(
    () =>
      availableLocations.filter(
        (location) => location.country_code === selectedCountry
      ),
    [selectedCountry]
  );

  const [serverData, setServerData] = useState<UserData>({
    date: new Date(),
    userLocation: "ATH",
    postLocation: (post?.location as LocationCode) ?? "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "ATH",
      // Initial value is one day after the event's date
      date: addDays(post?.date || addDays(new Date(), 1), 1),
    },
  });

  const serverDataMemoized = useMemo(() => serverData, [serverData]);

  if (!post) return null;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormHasBeenSubmittedOnce(true);
    console.log(values.location);
    setServerData({
      date: values.date,
      userLocation: values.location as LocationCode,
      postLocation: (post?.location as LocationCode) ?? "",
    });
  }

  return (
    <div className="mb-6">
      <div className="mb-4 mt-6">
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Country
          </span>
        </label>
        <Select
          onValueChange={(value) => setSelectedCountry(value as CountryCode)}
          defaultValue={selectedCountry}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an airport" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem value={country.code} key={country.code}>
                {country.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="mt-2 inline-block text-sm text-slate-500">
          Choose the country you are flying to
        </span>
      </div>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locationsMemoized.map((location) => (
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
                  Choose the city you want to fly to. We&apos;ll find the
                  nearest airport to your destination!
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
                <FormLabel>Preferred Dates for Departure</FormLabel>
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
                        isBefore(date, addDays(new Date(), 1)) ||
                        // The date must be at least 1 day after the event date
                        isBefore(date, addDays(new Date(post.date), 1))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>The date of your flight</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Search Flights
            </Button>
          </div>
        </form>
      </Form>

      {formHasBeenSubmittedOnce && (
        <section className="mt-12">
          <FromEventFlightList userData={serverDataMemoized} />
        </section>
      )}
    </div>
  );
};

export default FromEventFlightStepForm;
