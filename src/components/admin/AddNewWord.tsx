"use client";

import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import SingleWordFormModalContent from "@/src/components/admin/SingleWordFormModalContent";
import { Field } from "formik";

const ADD_NEW_WORD = gql`
  mutation AddNewWord($word: WordInsertInput!) {
    addNewWord(word: $word) {
      id
    }
  }
`;

export default function AddNewWord() {
  const [show, setShow] = useState(false);

  const onClick = () => setShow(true),
    onClose = () => setShow(false);

  const [mutate] = useMutation(ADD_NEW_WORD, {
    refetchQueries: ["AdminGetAllWord"],
  });

  return (
    <>
      <Button colorScheme={"blue"} onClick={onClick}>
        Thêm từ vựng
      </Button>
      <Modal isOpen={show} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <SingleWordFormModalContent
            modalTitle={
              <div className={"flex gap-4 items-center"}>
                <h3 className={"flex-none"}>Thêm từ vựng</h3>
                <Field
                  name={"word"}
                  as={Input}
                  placeholder={"何の漢字"}
                  lang={"ja"}
                />
              </div>
            }
            word={{ word: "", pronounce: "", explain: "" }}
            onSubmit={async (values: any) => {
              await mutate({ variables: { word: values } });
              onClose();
            }}
            onCancel={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
