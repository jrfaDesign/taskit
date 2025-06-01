"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function supabaseLoginServer(formData: LoginFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { success: false, message: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}
export async function supabaseSignupServer(formData: SignUpFormData) {
  const supabase = await createClient();

  const { email, password, firstName, lastName } = formData;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        displayName: `${firstName} ${lastName}`,
        profileImageUrl: null,
      },
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}
