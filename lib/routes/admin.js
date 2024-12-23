import express from "express";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/admin", authenticateToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin!" });
});

export default router;
