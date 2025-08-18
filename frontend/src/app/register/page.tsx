"use client";
import { registerUser } from "@/lib/api";
import { RegisterUserSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormInputs) => {
      return await registerUser(data.email, data.password);
    },
    onSuccess: async () => {
      console.log("Register successful");
      setIsSubmitting(false);
      setHasError(false);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    },
    onError: () => {
      setIsSubmitting(false);
      setHasError(true);
      resetField("password");
      resetField("confirmPassword");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    setIsSubmitting(true);
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    registerMutation.mutate({ email, password, confirmPassword });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {hasError && (
            <div
              className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Something went wrong!</span>{" "}
                Change a few things up and try submitting again.
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("email", { required: "Email is required" })}
                disabled={isSubmitting}
              />
              {errors.email && <p>{errors?.email?.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                autoComplete="false"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("password", {
                  required: "Password is required",
                })}
                disabled={isSubmitting}
              />
              {errors.password && <p>{errors?.password?.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                required
                autoComplete="false"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p>{errors?.confirmPassword?.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={isSubmitting}
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Login instead!
          </Link>
        </p>
      </div>
    </div>
  );
}
