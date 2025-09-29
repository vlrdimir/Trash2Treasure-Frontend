import { signIn } from "@/server/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleIcon } from "@/components/icons/google";
import Image from "next/image";

export default function SignIn() {
  return (
    <main className="relative flex min-h-screen items-end justify-center p-4 text-white">
      <div className="absolute inset-0 z-0 mx-auto h-full w-full max-w-md">
        <Image
          src="/illustration.svg"
          alt="Illustration"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/50"></div>
      <div className="relative z-20 mx-auto w-full max-w-md p-4">
        <Card className="w-full border-gray-800 bg-black/60 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              Selamat Datang
            </CardTitle>
            <CardDescription>
              Masuk untuk melanjutkan ke dasbor Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
              className="w-full"
            >
              <Button
                type="submit"
                className="flex w-full items-center gap-2 bg-white text-black hover:bg-gray-200"
              >
                <GoogleIcon className="h-5 w-5" />
                Masuk dengan Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
