"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LoginPayload } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Login } from "@/store/Slices/AuthSlice";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

export function LoginForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const [login, setLogin] = useState<LoginPayload>({ email: "", password: "" });
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { loginLoading } = useAppSelector((state) => state.Auth);
  const handleLogin = () => {
    if (!login.email || !login.password) {
      toast({ title: "Fill all Fields", variant: "destructive" });
      return;
    }
    dispatch(
      Login({
        ...login,
        onSuccess: (message) => {
          router.push("/");
          toast({ title: message, variant: "default" });
          setLogin({ email: "", password: "" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={login.email}
            placeholder="m@example.com"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            disabled={loginLoading}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            disabled={loginLoading}
          />
        </div>
        <Button
          className="w-full bg-red-500"
          onClick={handleLogin}
          disabled={loginLoading}
        >
          {loginLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </div>
  );
}
