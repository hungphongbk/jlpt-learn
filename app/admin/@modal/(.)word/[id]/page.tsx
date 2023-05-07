"use client";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import SingleWordFormModalContent from "@/src/components/admin/SingleWordFormModalContent";
import { useQuery } from "@apollo/client"; // @ts-ignore
import GET_ONE_WORD from "@/app/admin/AdminGetOneWord.graphql";

export default function WordModal({ params }: any) {
  const router = useRouter();

  const { data } = useQuery(GET_ONE_WORD, { variables: { id: params.id } });

  const initialWord = useMemo(() => {
    if (!data?.word) {
      return { word: "" };
    }

    return data.word;
  }, [data]);

  const onClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={onClose} size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <SingleWordFormModalContent
          modalTitle={`Chỉnh sửa từ vựng ${initialWord.word}`}
          word={initialWord}
          onSubmit={() => {}}
          onCancel={onClose}
        />
      </ModalContent>
    </Modal>
  );
}
