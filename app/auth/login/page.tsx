import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 ">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex  items-center justify-center rounded-md ">
              <Image
                src="/icon.png"
                alt="icon"
                width={1000}
                height={1000}
                className="w-32 h-32"
              />
            </div>
            <span className="font-semibold text-3xl text-red-500">
              Otaku World
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <video
          src="/videos/login.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
