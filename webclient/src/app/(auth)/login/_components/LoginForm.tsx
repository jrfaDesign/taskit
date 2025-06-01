"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import AuthRedirectMessage from "../../_components/AuthRedirectMessage";
import LegalDisclaimer from "../../_components/LegalDisclaimer";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabaseLoginServer } from "../../actions";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleLogin = async (data: LoginFormData) => {
    const result = await supabaseLoginServer(data);

    if (!result.success) {
      toast.error(result.message, { position: "top-center" });
    } else {
      toast.success("Login successful!");
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email",
            },
          })}
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 16,
              message: "Password must be at least 16 characters",
            },
          })}
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Log in
      </Button>

      <AuthRedirectMessage
        url="/signup"
        message="Don´t have an acount?"
        linkText="Sign Up"
      />

      <LegalDisclaimer />
    </form>
  );
};

export default LoginForm;
