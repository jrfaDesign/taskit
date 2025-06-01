"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthRedirectMessage from "../_components/AuthRedirectMessage";
import LegalDisclaimer from "../_components/LegalDisclaimer";
import { SignUpFormData, supabaseSignupServer } from "../actions";

const SignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = async (formData: SignUpFormData) => {
    const result = await supabaseSignupServer(formData);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Please check your email and confirm your registration", {
        position: "top-center",
      });
      router.push("/login");
    }
  };

  const password = watch("password");

  return (
    <div>
      <div className="mb-6">
        <h5 className="text-3xl font-bold">Create your account</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
            placeholder="First name"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last name"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>

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
                value: 6,
                message: "Password must be at least 6 characters",
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

        <div className="flex flex-col space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: value => value === password || "Passwords do not match",
            })}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full">
          Log in
        </Button>

        <AuthRedirectMessage
          url="/login"
          message="Already have an account?"
          linkText="Log In"
        />

        <LegalDisclaimer />
      </form>
    </div>
  );
};

export default SignUpPage;
