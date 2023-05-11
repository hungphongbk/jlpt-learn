import { Field, Formik, useField } from "formik";
import React, { ComponentType, ReactNode, useCallback, useMemo } from "react";
import { KANJI_REGEX } from "@/src/const";
import {
  Button,
  FormControl,
  FormLabel,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import TextField from "@/src/components/common/TextField";
import KanjiCell from "@/src/components/admin/KanjiCell";
import TagAutocomplete from "@/src/components/admin/TagAutocomplete";

const KanjiView = ({ name }: { name: string }) => {
  const [{ value }] = useField<string>(name);
  // console.log(value);
  const [{ value: existingKanjis }] = useField<any[]>("kanji");

  const kanjiChars = useMemo(() => {
    if (Array.isArray(existingKanjis)) return existingKanjis;
    return value.split("").reduce((acc, val) => {
      if (KANJI_REGEX.test(val)) return [...acc, val];
      return acc;
    }, [] as any[]);
  }, [existingKanjis, value]);
  // console.log(kanjiChars);

  return (
    <div className={"flex gap-2"}>
      {kanjiChars.map((c, index) => (
        <KanjiCell key={index} value={c} />
      ))}
    </div>
  );
};

export default function SingleWordFormModalContent({
  modalTitle,
  word,
  onSubmit,
  onCancel,
  Header = ModalHeader,
  Body = ModalBody,
  Footer = ModalFooter,
  afterSubmit,
}: {
  modalTitle: ReactNode;
  word: any;
  onSubmit: any;
  onCancel: any;
  Header?: ComponentType<any>;
  Body?: ComponentType<any>;
  Footer?: ComponentType<any>;
  afterSubmit?: any;
}) {
  const _onSubmit = useCallback(
    async (values: any) => {
      await onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <Formik initialValues={word} onSubmit={_onSubmit} enableReinitialize>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Header>{modalTitle}</Header>
          <Body>
            <div className="flex flex-col space-y-4">
              <KanjiView name={"word"} />
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Field
                  id={"pronounce"}
                  name={"pronounce"}
                  as={TextField}
                  label={"Cách đọc"}
                  placeholder={"ひらがな"}
                  variant={"filled"}
                />
                <Field
                  id={"explain"}
                  name={"explain"}
                  as={TextField}
                  label={"Giải thích"}
                  placeholder={"Nghĩa là gì..."}
                  variant={"filled"}
                />
                <FormControl id="email">
                  <FormLabel>Tags</FormLabel>
                  <TagAutocomplete name={"tags"} />
                </FormControl>
                {/*<Field as={MultiSelect} name={"tags"} id={"tags"} />*/}
              </div>
            </div>
          </Body>
          <Footer>
            <Button
              onClick={() => props.submitForm().then(() => afterSubmit?.())}
              mr={2}
            >
              OK
            </Button>
            <Button
              onClick={() => {
                const tags = [...props.values.tags];
                props
                  .submitForm()
                  .then(() => props.resetForm({ ...word, tags }));
              }}
              mr={2}
            >
              OK và tiếp tục thêm
            </Button>
            <Button color="gray" onClick={onCancel}>
              Decline
            </Button>
          </Footer>
        </form>
      )}
    </Formik>
  );
}
