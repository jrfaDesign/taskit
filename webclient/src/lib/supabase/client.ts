import { createClient as createSupabaseAtClient } from "@supabase/supabase-js";

export const SUPABASE_CLIENT = createSupabaseAtClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function createClient() {
  return createSupabaseAtClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const getSession = SUPABASE_CLIENT.auth.getSession;
export const getUser = SUPABASE_CLIENT.auth.getUser;
export const signOut = SUPABASE_CLIENT.auth.signOut;
