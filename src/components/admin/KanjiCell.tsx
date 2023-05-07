import React, { useEffect, useRef, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TextField from "@/src/components/common/TextField";
import { Field, Formik } from "formik";

const GET_ONE_KANJI = gql`
  query AdminGetOneKanji($id: String!) {
    kanji(id: $id) {
      id
      hv
    }
  }
`;

const UPSERT_ONE_KANJI = gql`
  mutation AdminUpsertOneKanji($id: String!, $kanji: KanjiUpsertInput!) {
    upsertKanji(id: $id, kanji: $kanji) {
      id
      hv
    }
  }
`;

const AddNewKanji = ({ kanji }: { kanji: string }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [mutate] = useMutation(UPSERT_ONE_KANJI, {
    refetchQueries: ["AdminGetOneKanji"],
  });

  const ref = useRef<any>();

  return (
    <Popover isOpen={isOpen} onClose={onClose} initialFocusRef={ref}>
      <PopoverTrigger>
        <IconButton
          aria-label={""}
          colorScheme="teal"
          size="xs"
          icon={<AddIcon />}
          className={"rounded-full"}
          onClick={onToggle}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <Formik
          initialValues={{ hv: "" }}
          onSubmit={async (values) => {
            await mutate({
              variables: {
                id: kanji,
                kanji: values,
              },
            });
            onClose();
          }}
        >
          {(formikProps) => (
            <>
              <PopoverBody>
                <div className="flex gap-4">
                  <div
                    className={
                      "w-20 aspect-square border border-sky-500 flex items-center justify-center"
                    }
                  >
                    <div className={"text-4xl font-jp"}>{kanji}</div>
                  </div>
                  <Field
                    ref={ref}
                    as={TextField}
                    name={"hv"}
                    className={"flex-1"}
                    label="Hán Việt"
                    id="first-name"
                  />
                </div>

                <Button onClick={formikProps.submitForm} mt={4}>
                  Cập nhật
                </Button>
              </PopoverBody>
            </>
          )}
        </Formik>
      </PopoverContent>
    </Popover>
  );
};

const KanjiCell = ({ value }: { value: any }) => {
  const [computed, setComputed] = useState(() => {
    if (typeof value === "string") return { id: value, hv: null };
    return value;
  });

  const [getKanji, { called, data }] = useLazyQuery(GET_ONE_KANJI, {
    variables: { id: computed.id },
  });

  useEffect(() => {
    if (!computed.hv && !called) {
      // noinspection JSIgnoredPromiseFromCall
      getKanji();
    }
  }, [called, computed.hv, getKanji]);
  useEffect(() => {
    if (data?.kanji) {
      setComputed(data.kanji);
    }
  }, [data]);

  return (
    <div className={"flex flex-col items-center gap-2"}>
      <div
        className={
          "w-20 aspect-square border border-sky-500 flex items-center justify-center"
        }
      >
        <div className={"text-4xl font-jp"}>{computed.id}</div>
      </div>
      {computed.hv ? (
        <span className="text-sky-700 uppercase font-semibold">
          {computed.hv}
        </span>
      ) : (
        <AddNewKanji kanji={computed.id} />
      )}
    </div>
  );
};

export default KanjiCell;
