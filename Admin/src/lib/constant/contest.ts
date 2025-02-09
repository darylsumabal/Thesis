import { Field } from "@/components/Card";
import { ComboboxData } from "@/components/Combobox";
import { Contest } from "@/services/api/contest/contest";

type ContestListType = {
  label: string;
  description: string;
};
type ContestCardType = {
  contest: ContestListType[];
};

type ContestFields<T, R = string> = {
  label: string;
  value: (item: T) => R;
};

export const CONTEST_FIELDS: ContestFields<Contest>[] = [
  { label: "Head Organizer", value: (item) => item.event.organizer },

  { label: "Event Name", value: (item) => item.event.name },

  { label: "Contest Name", value: (item) => item.contest_name },
  {
    label: "Description",
    value: (item) => item.contest_description,
  },
  {
    label: "Type of Scoring",
    value: (item) => item.contest_scoring_type,
  },
  { label: "Venue", value: (item) => item.contest_venue },
];

// type EventFields<T, R = string> = {
//   label: string;
//   value: (item: T) => R;
// };

// interface EventItem {
//   name: string;
//   description: string;
//   date: string;
//   organizer: string;
//   venue: string;
// }

// export const EVENTS_FIELDS: EventFields<EventItem>[] = [
//   {
//     label: "Event Name/Title",
//     value: (item) => item.description,
//   },
//   {
//     label: "Description",
//     value: (item) => item.description,
//   },
//   {
//     label: "Start Date",
//     value: (item) => item.date,
//   },
//   {
//     label: "Venue",
//     value: (item) => item.venue,
//   },
// ];

export const COMBOBOX_INPUT_GENDER: ComboboxData[] = [
  {
    label: "SELECT",
    value: "",
  },
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

export const contestListData: ContestCardType[] = [
  {
    contest: [
      {
        label: "Event Name",
        description: "International Event",
      },
      {
        label: "Contest Name",
        description: "International Contest",
      },
      {
        label: "Description",
        description: "To showcase talent and sportmanship",
      },
      {
        label: "Type of scoring",
        description: "Pont-Based",
      },
      {
        label: "Schedule of contest",
        description: "November 29, 2023",
      },
      {
        label: "Venue",
        description: "Hilton Hotel",
      },
    ],
  },

  {
    contest: [
      {
        label: "Event Name",
        description: "Local Event",
      },
      {
        label: "Contest Name",
        description: "Local Contest",
      },
      {
        label: "Description",
        description: "To showcase talent and sportmanship ",
      },
      {
        label: "Type of scoring",
        description: "Pont-Based",
      },
      {
        label: "Schedule of contest",
        description: "November 29, 2023",
      },
      {
        label: "Venue",
        description: "Local Hotel",
      },
    ],
  },
];

export const FIELD_PARTICIPANT_CONTEST: Field[] = [
  {
    label: "FIRST NAME",
    inputType: "text",
  },
  {
    label: "LAST NAME",
    inputType: "text",
  },
  {
    label: "DESCRIPTION",
    inputType: "textarea",
  },
  {
    label: "AGE",
    inputType: "text",
  },
  {
    label: "GENDER",
    inputType: "combobox",
  },
  {
    label: "IMAGE",
    inputType: "file",
  },
];

export const FIELD_NAME_PARTICIPANT = {
  "FIRST NAME": "first_name",
  "LAST NAME": "last_name",
  DESCRIPTION: "description",
  AGE: "age",
  GENDER: "gender",
  IMAGE: "poster_url",
} as const;

export const FIELD_TEAM_PARTICIPANT: Field[] = [
  {
    label: "TEAM NAME",
    inputType: "text",
  },
  {
    label: "TEAM DESCRIPTION",
    inputType: "textarea",
  },
  {
    label: "TEAM CAPTAIN",
    inputType: "text",
  },
  {
    label: "IMAGE",
    inputType: "file",
  },
];



export const FIELD_NAME_TEAM_PARTICIPANT = {
  "TEAM NAME": "team_name",
  "TEAM DESCRIPTION": "team_description",
  "TEAM CAPTAIN": "team_captain",
  IMAGE: "poster_url",
} as const;

export const COMBOBOX_INPUT_PARTICIPANT: ComboboxData[] = [
  {
    value: "Participants",
    label: "Add Participants",
  },
  {
    value: "Teams Participants",
    label: "Add Teams",
  },
];
