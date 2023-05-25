import { z } from "zod";

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
  location: z.enum(["ABQ", "ATH"], {
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
