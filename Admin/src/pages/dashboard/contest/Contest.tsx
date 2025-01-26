import CardWrap from "@/components/Card";
import ActionCombobox from "@/components/Combobox";
import ActionForm from "@/components/Form";
import ActionPopover from "@/components/Popover";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useAddParticipant,
  useAddTeamParticipants,
  useDestroyContest,
  useGetContest,
} from "@/hooks/tanstack/contest/contest";
import {
  comboboxInput,
  comboboxInputContest,
  CONTEST_FIELDS,
  fieldNamesParticipant,
  fieldNamesTeamsParticipant,
  fieldsParticipant,
  fieldTeamsParticipant,
} from "@/lib/constant/contest";
import { urlSrc } from "@/lib/helper-src";
import useHandleOnSubmit from "@/hooks/utils/handleSubmit";
import {
  addParticipantSchema,
  addTeamParticipantSchema,
} from "@/schema/contest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { z } from "zod";
import {
  defaultValuesParticipants,
  defaultValuesTeamsParticipant,
} from "../../../schema/contest";

const Contest = () => {
  const [id, setId] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState<number | null>(null);

  const [selectedValue, setSelectedValue] = useState("Participants");

  const { data } = useGetContest();

  const { mutateAsync: mutateAddParticipant } = useAddParticipant();

  const { mutateAsync: mutateAddTeampParticipant } = useAddTeamParticipants();

  const { mutateAsync: mutateDestroyContest } = useDestroyContest();

  const { handleOnSubmit, isSubmit, fileInputRef } = useHandleOnSubmit();

  const form = useForm({
    resolver: zodResolver(addParticipantSchema),
    defaultValues: defaultValuesParticipants,
  });

  const formTeam = useForm({
    resolver: zodResolver(addTeamParticipantSchema),
    defaultValues: defaultValuesTeamsParticipant,
  });

  const handleOnSubmitParticipant = async (
    data: z.infer<typeof addParticipantSchema>
  ) => {
    await handleOnSubmit({
      data: data,
      mutationFn: mutateAddParticipant,
      form: form,
      id: id ?? "",
    });
  };

  const handleSubmitTeam = async (
    data: z.infer<typeof addTeamParticipantSchema>
  ) => {
    await handleOnSubmit({
      data: data,
      mutationFn: mutateAddTeampParticipant,
      form: form,
      id: id ?? "",
    });
  };

  const handleResetCloseDialog = (dialogId: number | null) => {
    setIsOpen(dialogId);
    form.reset();
    formTeam.reset();
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <CardWrap title="Contest List" info="Contest">
        <div className="grid grid-cols-2  2xl:grid-cols-5 gap-7  overflow-y-scroll  h-[calc(100vh-12rem)]">
          {data?.map((item, index) => (
            <Card className="p-6 w-96 h-fit border-2" key={item.id}>
              <div className="flex flex-col w-full space-y-4">
                <ActionPopover id={item.id} tanstack={mutateDestroyContest} />
                <div>
                  <img
                    src={`${urlSrc}${item.contest_poster}`}
                    alt=""
                    className="h-96 w-full rounded-md border border-slate-950"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col gap-2 ">
                    <div className="flex flex-col gap-2">
                      {CONTEST_FIELDS.map(({ label, value }) => (
                        <div className="flex gap-2" key={label}>
                          <h3 className="font-medium">{label}:</h3>
                          <p>{value(item)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Dialog
                    onOpenChange={(open) =>
                      handleResetCloseDialog(open ? index : null)
                    }
                    open={isOpen === index}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        onClick={() => {
                          setId(item.id);
                          setIsOpen(index);
                        }}
                      >
                        Add Participant
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Participant</DialogTitle>
                        <DialogDescription>
                          Participant Contest Info
                        </DialogDescription>
                      </DialogHeader>
                      <ActionCombobox
                        onSelect={(value) => setSelectedValue(value)}
                        values="Participants"
                        data={comboboxInput}
                      />
                      <div className="grid gap-2 py-4">
                        {selectedValue === "Participants" && (
                          <ActionForm
                            buttonText="Save"
                            comboboxField={comboboxInputContest}
                            fieldNames={fieldNamesParticipant}
                            fields={fieldsParticipant}
                            form={form}
                            onSubmit={handleOnSubmitParticipant}
                            submitCombobox={isSubmit}
                            fileInputRef={fileInputRef}
                          />
                        )}
                        {selectedValue === "Teams Participants" && (
                          <ActionForm
                            buttonText="Save"
                            fieldNames={fieldNamesTeamsParticipant}
                            fields={fieldTeamsParticipant}
                            form={formTeam}
                            onSubmit={handleSubmitTeam}
                            fileInputRef={fileInputRef}
                          />
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardWrap>
    </>
  );
};

export default Contest;
