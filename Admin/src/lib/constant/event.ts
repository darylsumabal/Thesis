import { Field } from "@/components/Card";
import { ComboboxData } from "@/components/Combobox";
import { Events } from "@/services/api/event/event";

type EventFields<T, R = string> = {
  label: string;
  value: (item: T) => R;
};

export const EVENTS_FIELDS: EventFields<Events>[] = [
  {
    label: "Event Name/Title",
    value: (item) => item.name,
  },
  {
    label: "Head Organizer",
    value: (item) => item.organizer,
  },
  {
    label: "Description",
    value: (item) => item.description,
  },
  {
    label: "Start Date",
    value: (item) => item.date,
  },

  {
    label: "Venue",
    value: (item) => item.venue,
  },
];

export const fields: Field[] = [
  {
    label: "EVENT TITLE/NAME",
    inputType: "text",
  },
  {
    label: "DESCRIPTION",
    inputType: "textarea",
  },
  {
    label: "DATE TO START EVENT",
    inputType: "date",
  },
  {
    label: "EVENT HEAD ORGANIZER",
    inputType: "combobox",
  },
  {
    label: "VENUE",
    inputType: "text",
  },
  {
    label: "POSTER",
    inputType: "file",
  },
];

export const fieldNames = {
  "EVENT TITLE/NAME": "name",
  DESCRIPTION: "description",
  "DATE TO START EVENT": "date",
  "EVENT HEAD ORGANIZER": "organizer",
  VENUE: "venue",
  POSTER: "poster",
} as const;

export type FormValues = {
  name: string;
  description: string;
  date: string;
  organizer: string;
  venue: string;
  poster: File | null;
};

export type EventData = {
  title: string;
  description: string;
  fieldNames: keyof FormValues;
};

export const upcomingEventData: EventData[] = [
  {
    title: "Event Name/Title",
    description: "International Event",
    fieldNames: "name",
  },
  {
    title: "Description",
    description: "To showcase talent and sportmanship ",
    fieldNames: "description",
  },
  {
    title: "Start Date",
    description: "Noverber 29, 2023",
    fieldNames: "date",
  },
  {
    title: "Head Organizer",
    description: "Daryl",
    fieldNames: "organizer",
  },
  {
    title: "Venue",
    description: "BISU",
    fieldNames: "venue",
  },
];

export const fieldNamesUpcomingEvent = {
  "CONTEST TITLE/NAME": "contest_name",
  DESCRIPTION: "contest_description",
  "SELECT TYPE OF SCORING": "contest_scoring_type",
  VENUE: "contest_venue",
  POSTER: "contest_poster",
} as const;

export const addContest: Field[] = [
  {
    label: "CONTEST TITLE/NAME",
    inputType: "text",
  },
  {
    label: "DESCRIPTION",
    inputType: "textarea",
  },
  {
    label: "SELECT TYPE OF SCORING",
    inputType: "combobox",
  },
  // {
  //   label: "INITIAL ROUND",
  //   inputType: "text",
  // },
  // {
  //   label: "SCHEDULE OF CONTEST",
  //   inputType: "text",
  // },
  {
    label: "VENUE",
    inputType: "text",
  },
  {
    label: "POSTER",
    inputType: "file" as const,
  },
];

export const comboboxInputEventType: ComboboxData[] = [
  {
    label: "SELECT",
    value: "",
  },
  {
    label: "Point Based",
    value: "Point Based",
  },
  {
    label: "Rankend Based",
    value: "Rankend Based",
  },
  {
    label: "Multiple Round",
    value: "Multiple Round",
  },
];
