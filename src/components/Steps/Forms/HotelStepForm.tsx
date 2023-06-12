import { memo, useEffect, useMemo, useState } from "react";
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
  SelectableItem,
} from "~/components";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { addDays, format, isBefore } from "date-fns";
import { CalendarIcon, MapPin, Star, StarHalf, X } from "lucide-react";
import { cn } from "~/utils/cn";
import { hotelFormSchema as formSchema } from "~/utils/schemas";
import { api } from "~/utils/api";
import { usePlanStore } from "~/utils/state";
import { type HotelResult } from "~/server/api/routers/hotel";

type HotelData = {
  checkIn: Date;
  checkOut: Date;
  eventId: string;
};

const HotelListItem = ({ hotel }: { hotel: HotelResult }) => {
  const {
    id,
    cardPhotos,
    title,
    primaryInfo,
    secondaryInfo,
    bubbleRating,
    isSponsored,
  } = hotel;

  return (
    <div className="text-left">
      <div>
        <div className="-ml-2 grid grid-cols-1 lg:grid-cols-2">
          {cardPhotos.length > 0 && (
            <div className="relative max-h-[12.5rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-full w-full rounded-md object-cover"
                src={cardPhotos[0]?.sizes.urlTemplate}
                alt={`${title} Thumbnail`}
              />
              {isSponsored && (
                <div className="absolute left-0 top-0 rounded-br-md bg-slate-500 px-2 py-1 text-slate-100">
                  Sponsored
                </div>
              )}
            </div>
          )}
          <div className="px-2 py-2 lg:px-4">
            <h3 className="text-lg font-medium lg:text-xl">{title}</h3>
            {secondaryInfo && (
              <div className="my-1 flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">{secondaryInfo}</span>
              </div>
            )}

            {bubbleRating && (
              <div className="my-2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-300">
                  {Array.from({ length: 5 }).map((_, i) => {
                    if (Math.floor(bubbleRating.rating) - i + 1 === 1) {
                      return Number.isInteger(bubbleRating.rating) ? (
                        <Star
                          key={`${i}${id}${JSON.stringify(bubbleRating)}`}
                          size={20}
                        />
                      ) : (
                        <div
                          className="relative"
                          key={`${i}${id}${JSON.stringify(bubbleRating)}`}
                        >
                          <Star size={20} className="absolute left-0 top-0" />
                          <StarHalf size={20} className="fill-yellow-300" />
                        </div>
                      );
                    }

                    return i + 1 <= bubbleRating.rating ? (
                      <Star
                        key={`${i}${id}${JSON.stringify(bubbleRating)}`}
                        size={20}
                        className="fill-yellow-300"
                      />
                    ) : (
                      <Star
                        key={`${i}${id}${JSON.stringify(bubbleRating)}`}
                        size={20}
                      />
                    );
                  })}
                </div>
                <span>{bubbleRating.rating}</span>
                <span className="text-sm text-slate-600">{`(${bubbleRating.count})`}</span>
              </div>
            )}

            {primaryInfo && (
              <div className="mt-3">
                <span>{primaryInfo}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HotelListItemMemoized = memo(HotelListItem);

const HotelList = ({ hotelData }: { hotelData: HotelData }) => {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const { data, isLoading } = api.hotel.getHotels.useQuery(hotelData);
  const setAccommodation = usePlanStore((state) => state.setAccommodation);

  useEffect(() => {
    setAccommodation(selectedHotel);
  }, [setAccommodation, selectedHotel]);

  if (isLoading)
    return (
      <div className="my-8 text-center text-sm md:text-base">Loading...</div>
    );
  if (!data) return null;

  const { hotels, message } = data;

  if (!hotels.length)
    return (
      <div className="my-8 text-center md:text-lg">
        <p>{message}</p>
      </div>
    );

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-6">
        <h2 className="shrink-0 text-lg font-medium">Hotels List</h2>

        {selectedHotel && (
          <button
            className="mb-1 flex items-center gap-1 text-slate-400 transition-colors hover:text-slate-800"
            onClick={() => setSelectedHotel(null)}
          >
            <X size={16} />
            <span className="text-xs">Clear selection</span>
          </button>
        )}
      </div>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <SelectableItem
              selected={
                hotel.id ===
                (
                  JSON.parse(
                    selectedHotel ?? JSON.stringify({ id: "" })
                  ) as HotelResult
                ).id
              }
              onSelected={() => setSelectedHotel(JSON.stringify(hotel))}
            >
              <HotelListItemMemoized hotel={hotel} />
            </SelectableItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HotelListMemoized = memo(HotelList);

const HotelStepForm = () => {
  const [formHasBeenSubmittedOnce, setFormHasBeenSubmittedOnce] =
    useState(false);
  const eventId = usePlanStore((state) => state.eventId);
  const { data: post } = api.post.getOne.useQuery({ id: eventId });

  const [serverData, setServerData] = useState<HotelData>({
    checkIn: new Date(post?.date ?? ""),
    checkOut: !!post?.date
      ? new Date(addDays(new Date(post.date), 1))
      : new Date(),
    eventId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: addDays(new Date(), 1),
      checkOut: !!post?.date ? addDays(post.date, 1) : addDays(new Date(), 2),
    },
  });

  const serverDataMemoized = useMemo(() => serverData, [serverData]);

  if (!post) return null;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormHasBeenSubmittedOnce(true);
    setServerData({ ...values, eventId });
  }

  return (
    <div className="mb-6 mt-8">
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-center justify-start gap-6">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Check-in</FormLabel>
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
                            <span>Pick a date to check in</span>
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
                          // The date must be at least 1 day before the event date
                          isBefore(post.date, addDays(date, 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The date of your check-in</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Checkout Date</FormLabel>
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
                          // The date must be at least 1 day after the event date
                          isBefore(date, addDays(post.date, 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The date of your checkout</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-start gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Search Hotels
            </Button>
          </div>
        </form>
      </Form>

      {formHasBeenSubmittedOnce && (
        <section className="mt-12">
          <HotelListMemoized hotelData={serverDataMemoized} />
        </section>
      )}
    </div>
  );
};

export default HotelStepForm;
