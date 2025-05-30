"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /users - get all users
router.get("/", async (req, res) => {
    res.json({ message: "Get all users" });
});
// GET /users/:id - get user by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user with id ${id}` });
});
// POST /users - create new user
router.post("/", async (req, res) => {
    const newUserData = req.body;
    res.json({ message: "Create user", data: newUserData });
});
// PUT /users/:id - update user by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    res.json({ message: `Update user ${id}`, data: updateData });
});
// DELETE /users/:id - delete user by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete user ${id}` });
});
exports.default = router;
