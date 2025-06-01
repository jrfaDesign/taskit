"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const __1 = require("..");
const drizzle_orm_1 = require("drizzle-orm");
const router = (0, express_1.Router)();
router.post("/signup", async (req, res) => {
    try {
        const { email, password, displayName } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        // Sign up user with Supabase Auth
        const { data: authData, error } = await __1.supabase.auth.signUp({
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
        await db_1.db.insert(schema_1.users).values({
            id: user.id,
            email,
            displayName: displayName,
            isVerified: !!user.email_confirmed_at,
            profileImageUrl: user.user_metadata?.avatar_url || null,
        });
        res.status(201).json({ message: "Signup successful" });
    }
    catch (err) {
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
        const { data: authData, error: authError } = await __1.supabase.auth.signInWithPassword({
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
        const allUsers = await db_1.db.select().from(schema_1.users);
        console.log("alliusers", allUsers);
        // Fetch user from your users table
        // Assuming you use some kind of DB client `db` with a users table
        const userRecord = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId));
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
