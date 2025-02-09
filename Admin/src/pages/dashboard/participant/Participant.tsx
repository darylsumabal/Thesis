import CardWrap from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FIELD_NAME_PARTICIPANT,
  FIELD_PARTICIPANT,
  FIELD_TEAM_PARTICIPANT,
  FIELD_NAME_TEAM_PARTICIPANT,
} from "@/lib/constant/participants";
import {
  addParticipantSchema,
  defaultValuesParticipants,
  addTeamParticipantSchema,
  defaultValuesTeamsParticipant,
} from "@/schema/participants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";

const Participant = () => {
  const location = useLocation();

  const addParticipantRoute = "participant/add-participant";
  const addTeamRoute = "participant/add-team";

  const formParticipant = useForm({
    resolver: zodResolver(addParticipantSchema),
    defaultValues: defaultValuesParticipants,
  });

  const formTeamParticipant = useForm({
    resolver: zodResolver(addTeamParticipantSchema),
    defaultValues: defaultValuesTeamsParticipant,
  });

  const onSubmitParticipant = (data: z.infer<typeof addParticipantSchema>) => {
    console.log(data);
  };

  const onSubmitTeamParticipant = (
    data: z.infer<typeof addTeamParticipantSchema>
  ) => {
    console.log(data);
  };

  return (
    <div className="h-full">
      {location.pathname.substring(11).trim() === addParticipantRoute && (
        <CardWrap
          title="Add Participants"
          info="Participants"
          children={
            <div>
              <Form {...formParticipant}>
                <form
                  onSubmit={formParticipant.handleSubmit(onSubmitParticipant)}
                >
                  <div className="grid w-full items-center gap-4">
                    {FIELD_PARTICIPANT.map((input, index) => (
                      <FormField
                        key={index}
                        name={
                          FIELD_NAME_PARTICIPANT[
                            input.label as keyof typeof FIELD_NAME_PARTICIPANT
                          ]
                        }
                        control={formParticipant.control}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-1.5">
                            <FormLabel
                              htmlFor={input.label}
                              className="font-medium"
                            >
                              {input.label}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={input.label}
                                type={input.inputType}
                                placeholder=""
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end mt-10 w-full">
                    <Button type="submit">Add Participant</Button>
                  </div>
                </form>
              </Form>
            </div>
          }
        />
      )}
      {location.pathname.substring(11).trim() === addTeamRoute && (
        <CardWrap
          title="Add Teams"
          info="Teams"
          children={
            <div>
              <Form {...formTeamParticipant}>
                <form
                  onSubmit={formTeamParticipant.handleSubmit(
                    onSubmitTeamParticipant
                  )}
                >
                  <div className="grid w-full items-center gap-4">
                    {FIELD_TEAM_PARTICIPANT.map((input, index) => (
                      <FormField
                        key={index}
                        name={
                          FIELD_NAME_TEAM_PARTICIPANT[
                            input.label as keyof typeof FIELD_NAME_TEAM_PARTICIPANT
                          ]
                        }
                        control={formTeamParticipant.control}
                        render={({ field }) => (
                          <div className="flex flex-col space-y-1.5">
                            <FormLabel
                              htmlFor={input.label}
                              className="font-medium"
                            >
                              {input.label}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={input.label}
                                type={input.inputType}
                                placeholder=""
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end mt-10 w-full">
                    <Button type="submit">Add Team</Button>
                  </div>
                </form>
              </Form>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Participant;
