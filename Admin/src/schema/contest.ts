import z from "zod";

export const addParticipantSchema = z.object({
  first_name: z.string().min(1, {
    message: "Please enter a first name",
  }),
  last_name: z.string().min(1, {
    message: "Please enter a last name",
  }),
  description: z.string().min(1, {
    message: "Please enter a description",
  }),
  age: z
    .string()
    .min(1, {
      message: "Please enter a age",
    })
    .max(120, {
      message: "Age must be less than 120",
    }),
  gender: z.string().min(1, {
    message: "Please enter a gender",
  }),
  poster_url: z
    .any()
    .refine((file) => file === null || file instanceof File, {
      message: "Please upload a valid image",
    })
    .refine((file) => file !== null, {
      message: "No image uploaded. Please upload an image",
    }),
});

type DefaultValuesParticipants = {
  first_name: string;
  last_name: string;
  description: string;
  age: string;
  gender: string;
  poster_url: File | null;
};

export const defaultValuesParticipants: DefaultValuesParticipants = {
  first_name: "",
  last_name: "",
  description: "",
  age: "",
  gender: "",
  poster_url: null,
};

export const addTeamParticipantSchema = z.object({
  team_name: z.string().min(1, {
    message: "Please enter a team name",
  }),
  team_description: z.string().min(1, {
    message: "Please enter a team description",
  }),
  team_captain: z.string().min(1, {
    message: "Please enter a team captain",
  }),
  poster_url: z
    .any()
    .refine((file) => file === null || file instanceof File, {
      message: "Please upload a valid image",
    })
    .refine((file) => file !== null, {
      message: "No image uploaded. Please upload an image",
    }),
});

type DefaultValuesTeamsParticipant = {
  team_name: string;
  team_description: string;
  team_captain: string;
  poster_url: File | null;
};

export const defaultValuesTeamsParticipant: DefaultValuesTeamsParticipant = {
  team_name: "",
  team_description: "",
  team_captain: "",
  poster_url: null,
};



// const formData = new FormData();

// if (totalScore === 100) {
//   console.log("Form submitted:", data);
//   for (const key in data) {
//     if (key !== "judges") {
//       formData.append(key, JSON.stringify(data[key as keyof typeof data]));
//     }
//   }
//   await mutateAsync({ id: Number(params.id), data: formData });
// } else {
//   toast.error("Evaluation score must be total of 100");
// }

// const updatedJudges = judgesId.includes(id)
//   ? judgesId.filter((item) => item !== id)
//   : [...selectedJudges, { id }];
