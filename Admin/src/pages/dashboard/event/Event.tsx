import CardWrap from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ADD_CONTEST,
  COMBOBOX_INPUT_EVENT_TYPE,
  EVENTS_FIELDS,
  FIELD_NAME_EVENT,
  FIELD_NAME_UPCOMING_EVENT,
  FIELD_EVENT,
  FormValues,
  UPCOMING_EVENT_DATA,
} from "@/lib/constant/event";
import {
  AddEventContestSchema,
  AddEventSchema,
  defaultValues,
  defaultValuesAddEvent,
} from "@/schema/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import ActionDialog from "@/components/Dialog";
import ActionForm from "@/components/Form";
import ActionPopover from "@/components/Popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useShowAccount } from "@/hooks/tanstack/account/account";
import {
  useAddContest,
  useAddEvent,
  useDestroyEvent,
  useGetEvent,
} from "@/hooks/tanstack/event/event";
import useHandleOnSubmit from "@/hooks/utils/handleSubmit";
import { urlSrc } from "@/lib/helper-src";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Toaster } from "sonner";
import { z } from "zod";

const Event = () => {
  const location = useLocation();

  const { mutateAsync: useMutateDestroyEvent } = useDestroyEvent();

  const { mutateAsync: mutateAddContest } = useAddContest();

  const { data: upcomingEvents } = useGetEvent();

  const { mutateAsync: mutateAddEvent } = useAddEvent();

  const [position, setPosition] = useState("top");

  const { data: useGetAccount } = useShowAccount();

  const addEventRoute = "event/add-event";
  const upcomingEvent = "event/upcoming-event";
  const previousEvent = "event/previous-event";

  const form = useForm<FormValues>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: defaultValuesAddEvent,
  });

  console.log(location.pathname.includes(addEventRoute));

  useEffect(() => {
    form.reset();
  }, [location.pathname]);

  const { handleOnSubmit, isSubmit, fileInputRef } = useHandleOnSubmit();

  const handleOnSubmitAddEvent = async (
    data: z.infer<typeof AddEventSchema>
  ) => {
    await handleOnSubmit({
      data: data,
      mutationFn: mutateAddEvent,
      form: form,
    });
  };

  const accountData =
    useGetAccount?.account?.map((item) => ({
      label: item.name,
      value: item.name,
    })) || [];

  const emptyValue = {
    label: "SELECT",
    value: "",
  };

  const updatedAccountData = [emptyValue, ...accountData];

  return (
    <div className="h-full">
      <Toaster position="top-right" richColors />
      {location.pathname.includes(addEventRoute) && (
        <CardWrap title="Add Event" info="Event Info" fields={FIELD_EVENT}>
          <div className="flex w-full gap-2">
            <ActionForm
              fields={FIELD_EVENT}
              fieldNames={FIELD_NAME_EVENT}
              comboboxField={updatedAccountData ?? []}
              buttonText="Add Event"
              onSubmit={handleOnSubmitAddEvent}
              submitCombobox={isSubmit}
              form={form}
              fileInputRef={fileInputRef}
            />

            <div className="w-full flex justify-center">
              <Card className="p-6 w-96 h-fit border-2">
                <div className="flex flex-col w-full space-y-4 ">
                  <div>
                    {(() => {
                      const poster = form.watch("poster");
                      return (
                        <img
                          src={
                            poster instanceof File
                              ? URL.createObjectURL(poster)
                              : "https://dummyimage.com/1920x1080/ededed/000000&text=Image"
                          }
                          alt=""
                          className="h-96 w-full rounded-md border-[1px] border-slate-950"
                        />
                      );
                    })()}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      {UPCOMING_EVENT_DATA.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <h3 className="font-medium">{item.title}:</h3>
                          <p>{form.watch(item.fieldNames) as string}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </CardWrap>
      )}

      {location.pathname.includes(upcomingEvent) && (
        <CardWrap title="Upcoming Event" info="Events">
          <div className="grid grid-cols-2 2xl:grid-cols-5 gap-7 h-[calc(100vh-15rem)] overflow-y-scroll ">
            {upcomingEvents?.map((item) => (
              <Card className="p-6 w-96 h-fit border-2" key={item.id}>
                <div className="flex flex-col w-full space-y-4">
                  <ActionPopover
                    id={item.id}
                    tanstack={useMutateDestroyEvent}
                  />
                  <div>
                    <img
                      src={`${urlSrc}${item.poster}`}
                      alt={`${urlSrc}${item.poster}`}
                      className="h-96 w-full rounded-md border-[1px] border-slate-950"
                    />
                  </div>
                  <div className="space-y-2">
                    {EVENTS_FIELDS.map(({ label, value }) => (
                      <div className="flex gap-2" key={label}>
                        <h3 className="font-medium">{label}:</h3>
                        <p>{value(item)}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <ActionDialog
                      buttonTitle="Add Contest"
                      buttonSaveTitle="Save"
                      dialogTitle="Add Contest"
                      dialogDescription="Add Contest Info"
                      dialogInputLabel={ADD_CONTEST}
                      schema={AddEventContestSchema}
                      defaultValues={defaultValues}
                      fieldNames={FIELD_NAME_UPCOMING_EVENT}
                      comboboxField={COMBOBOX_INPUT_EVENT_TYPE}
                      mutate={mutateAddContest}
                      showButton={true}
                      id={item.id}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardWrap>
      )}

      {location.pathname.includes(previousEvent) && (
        <CardWrap title="Previous Event" info="Events">
          <div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top">
                      Top
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      Bottom
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      Right
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardWrap>
      )}
    </div>
  );
};

export default Event;
