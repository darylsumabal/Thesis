import { z } from "zod";

export const AddEventSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a event name",
  }),
  description: z.string().min(1, {
    message: "Please enter a event description",
  }),
  date: z.string().min(1, {
    message: "Please enter a date",
  }),
  organizer: z.string().min(1, {
    message: "Please enter a event organizer",
  }),
  venue: z.string().min(1, {
    message: "Please enter a event venue",
  }),
  poster: z
    .any()
    .refine((file) => file === null || file instanceof File, {
      message: "Please upload a valid image",
    })
    .refine((file) => file !== null, {
      message: "No image uploaded. Please upload an image.",
    }),
});

export const AddEventContestSchema = z.object({
  contest_name: z.string().min(1, {
    message: "Please enter a contest title",
  }),
  contest_description: z.string().min(1, {
    message: "Please enter a description",
  }),
  contest_scoring_type: z.string().min(1, {
    message: "Please enter a scoring type",
  }),
  contest_venue: z.string().min(1, {
    message: "Please enter a venue",
  }),
  contest_poster: z
    .any()
    .refine((file) => file === null || file instanceof File, {
      message: "Please upload a valid image",
    })
    .refine((file) => file !== null, {
      message: "No image uploaded. Please upload an image.",
    }),
});

type DefaultValuesEvent = {
  contest_name: string;
  contest_description: string;
  contest_scoring_type: string;
  contest_venue: string;
  contest_poster: File | null;
};

export const defaultValues: DefaultValuesEvent = {
  contest_name: "",
  contest_description: "",
  contest_scoring_type: "",
  contest_venue: "",
  contest_poster: null,
};

type DefaultValuesAddEvent = {
  name: string;
  description: string;
  date: string;
  organizer: string;
  venue: string;
  poster: File | null;
};

export const defaultValuesAddEvent: DefaultValuesAddEvent = {
  name: "",
  description: "",
  date: "",
  organizer: "",
  venue: "",
  poster: null,
};
