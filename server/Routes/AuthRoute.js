import { Router } from "express";
import {
  register,
  login,
  users,
  electionRegister,
  elections,
  candidateRegister,
  candidates,
} from "../Controller/AuthController.js";

const router = Router();

router.post("/register", register.validator, register.controller);
router.post("/login", login.validator, login.controller);
router.post(
  "/candidate/register",
  candidateRegister.validator,
  candidateRegister.controller
);
router.post(
  "/election/register",
  electionRegister.validator,
  electionRegister.controller
);
router.get("/candidates", candidates.controller);
router.get("/elections", elections.controller);
router.get("/users", users.controller);

export default router;
