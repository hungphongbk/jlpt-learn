"use client";
import { FcGoogle } from "react-icons/all";
import { login } from "@/src/firebase/auth";
import { useRouter } from "next/navigation";
import { Card } from "@chakra-ui/card";
import { Button } from "@chakra-ui/react";

export default function Page() {
  const router = useRouter();

  return (
    <div className={"h-screen flex items-center justify-center"}>
      <Card className={"w-3/12"}>
        <div className={"flex flex-col gap-4"}>
          {/*<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">*/}
          {/*  Đăng nhập*/}
          {/*</h5>*/}
          <Button
            onClick={() => login().then(() => router.push("/home"))}
            leftIcon={<FcGoogle />}
          >
            Đăng nhập
          </Button>
        </div>
      </Card>
    </div>
  );
}
