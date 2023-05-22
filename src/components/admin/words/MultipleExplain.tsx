import { Field, FieldArray, FieldProps } from "formik";
import {
  Editable,
  EditableInput,
  EditablePreview,
  FormLabel,
  IconButton,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { ChangeEvent } from "react";
import { MdCheckCircle } from "react-icons/all";

type MultipleExplainProps = FieldProps & { className?: string };

export default function MultipleExplain({
  field,
  form,
  className,
  ...props
}: MultipleExplainProps) {
  return (
    <div className={className}>
      <FieldArray
        name={field.name}
        render={(helpers) => (
          <div>
            <FormLabel>
              <span>Nghĩa</span>
              <IconButton
                aria-label={""}
                type={"button"}
                onClick={() => helpers.push({ explain: "..." })}
                size="sm"
                icon={<AddIcon />}
                className={"ml-4"}
                variant={"outline"}
                colorScheme={"blue"}
              ></IconButton>
            </FormLabel>
            <List>
              {(field.value as any[]).map((val, index) => (
                <ListItem key={index} className={"flex items-center"}>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <Field name={`${field.name}.${index}.explain`}>
                    {
                      //@ts-ignore
                      ({ field: explainField }) => (
                        <Editable
                          className={"flex-1"}
                          value={explainField.value}
                          onChange={(next) => {
                            console.log(next);
                            explainField.onChange({
                              target: {
                                id: `${field.name}.${index}.explain`,
                                name: `${field.name}.${index}.explain`,
                                value: next,
                              },
                            } as ChangeEvent<HTMLInputElement>);
                          }}
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      )
                    }
                  </Field>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      />
    </div>
  );
}
