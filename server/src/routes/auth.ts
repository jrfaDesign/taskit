import { Router } from "express";
import { db } from "../db";
import { users } from "../db/schema";
import { supabase } from "..";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Sign up user with Supabase Auth
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !authData?.user) {
      res.status(400).json({ error: error?.message || "Signup failed" });
      console.log(error);
      return;
    }

    const user = authData.user; // safe to use now

    // Insert user into your DB
    await db.insert(users).values({
      id: user.id,
      email,
      displayName: displayName,
      isVerified: !!user.email_confirmed_at,
      profileImageUrl: user.user_metadata?.avatar_url || null,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Sign in user with Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData?.user) {
      res
        .status(401)
        .json({ error: authError?.message || "Invalid credentials" });
      return;
    }

    const userId = authData.user.id;
    console.log("user", authData.user);

    const allUsers = await db.select().from(users);

    console.log("alliusers", allUsers);

    // Fetch user from your users table
    // Assuming you use some kind of DB client `db` with a users table
    const userRecord = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!userRecord || userRecord.length === 0) {
      res.status(404).json({ error: "User not found in database" });
      return;
    }

    const user = userRecord[0];

    // Return user info (exclude sensitive info)
    res.json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      isVerified: user.isVerified,
      profileImageUrl: user.profileImageUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
