"use client";
import React, { PropsWithChildren } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomeLayout({ children }: PropsWithChildren) {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [router, user]);

  return children;
}
