import { Router } from "express";
import {
  register,
  login,
  users,
  electionRegister,
  elections,
  candidateRegister,
  candidates,
  phase,
  getCandidate,
  userAction,
  getUser,
  votingMail,
  a,
} from "../Controller/AuthController.js";

const router = Router();

router.post("/register", register.validator, register.controller);
router.post("/login", login.validator, login.controller);
router.post(
  "/candidate/register",
  candidateRegister.validator,
  candidateRegister.controller
);
router.get(
  "/candidate/:username",
  getCandidate.validator,
  getCandidate.controller
);
router.post(
  "/election/register",
  electionRegister.validator,
  electionRegister.controller
);
router.get("/election/:id", phase.getPhase);
router.post("/phase/edit/:id", phase.controller);
router.get("/candidates", candidates.controller);
router.get("/voting/elections", elections.voting);
router.get("/result/elections", elections.result);
router.get("/elections", elections.controller);
router.get("/users", users.controller);
router.get("/user/:id", getUser.controller);
router.get("/user/username/:id", getUser.ByName);
router.get("/user/delete/:id", userAction.delete);
router.post("/user/edit/:id", userAction.edit);

router.post("/op", a.sc);
router.post("/votingEmail", votingMail.send);

export default router;
