import { z } from "zod";
import { locationsNotConst as locations } from "~/data/locations";

const locationCodes = locations.map(({ city_code }) => city_code) as [
  string,
  ...string[]
];

export const eventPostFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50, {
      message: "Title must be less than 50 characters long",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters long",
    })
    .max(255, {
      message: "Description must be less than 255 characters long",
    }),
  category: z.enum(
    [
      "SKI",
      "SNOWBOARD",
      "KITESURF",
      "WINDSURF",
      "SURF",
      "MTB",
      "BMX",
      "SKATE",
      "CLIMBING",
      "HIKING",
      "CANYONING",
      "PARAGLIDING",
      "WINGSUIT",
      "SKYDIVING",
    ],
    {
      required_error: "Please select a category",
    }
  ),
  location: z.enum(locationCodes, {
    required_error: "Please select a location",
  }),
  imageUrl: z.string().url({
    message: "Please provide a valid URL",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be at least 0",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
});

export const flightFormSchema = z.object({
  location: z.string({
    required_error: "Please select a location",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
});

export const hotelFormSchema = z.object({
  checkIn: z.date({
    required_error: "Please select a date",
  }),
  checkOut: z.date({
    required_error: "Please select a date",
  }),
});
