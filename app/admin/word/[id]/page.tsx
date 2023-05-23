"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import SingleWordFormModalContent from "@/src/components/admin/words/SingleWordFormModalContent";
import { CardHeader, Heading } from "@chakra-ui/react";
import useGetOneWord from "@/src/components/admin/useGetOneWord";

export default function WordPage({ params }: any) {
  const router = useRouter();

  const { initialWord } = useGetOneWord(params.id);

  return (
    <Card mt={4}>
      <SingleWordFormModalContent
        modalTitle={
          <Heading size={"md"}>Chỉnh sửa từ vựng {initialWord.word}</Heading>
        }
        word={initialWord}
        onSubmit={() => {}}
        onCancel={() => {}}
        Header={CardHeader}
        Body={CardBody}
        Footer={CardFooter}
      />
    </Card>
  );
}
