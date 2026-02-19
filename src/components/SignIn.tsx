"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { signIn } from "@/lib/auth-client";

type SignInFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: "/dashboard",
      });

      if (result?.error) {
        setError("root", {
          type: "server",
          message:
            result.error.message ||
            "Invalid email or password.",
        });
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("root", {
        type: "server",
        message:
          "Something went wrong. Please try again.",
      });
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    try {
      const result = await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });

      if (result?.error) {
        setError("root", {
          type: "server",
          message:
            "Social login failed. Please try again.",
        });
      }
    } catch {
      setError("root", {
        type: "server",
        message:
          "Social login failed. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full rounded-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Sign In
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4"
          >
            {errors.root && (
              <div className="text-sm text-red-500 bg-red-50 border border-red-200 p-2 rounded-md">
                {errors.root.message}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                disabled={isSubmitting}
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message:
                      "Enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                disabled={isSubmitting}
                {...register("password", {
                  required:
                    "Password is required.",
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                disabled={isSubmitting}
                {...register("rememberMe")}
              />
              <Label htmlFor="remember">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                "Login"
              )}
            </Button>

            <div
              className={cn(
                "w-full gap-2 flex flex-col justify-between"
              )}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
                onClick={() =>
                  handleSocialSignIn("google")
                }
              >
                Sign in with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
                onClick={() =>
                  handleSocialSignIn("github")
                }
              >
                Sign in with GitHub
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <div className="flex justify-center w-full border-t py-4">
            <p className="text-center text-sm text-neutral-500">
              Not have an account?{" "}
              <span className="text-orange-400">
                <Link href="./signup">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
