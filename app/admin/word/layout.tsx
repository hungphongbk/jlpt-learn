"use client";
import { PropsWithChildren } from "react";
import { Container } from "@chakra-ui/react";

export default function WordLayout({ children }: PropsWithChildren) {
  return <Container maxW={"3xl"}>{children}</Container>;
}
