import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  refreshAccessToken,
} from "../controller/user.controller.js";
import { rateLimiter } from "../middleware/rateLimit.js";
import { validateFormData } from "../middleware/validateFormData.js";
import { validateLoginUserSchema, validateRegisterUserSchema } from "../utils/formValidation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();


router.post(
  "/create",
  rateLimiter(10),
  validateFormData(validateRegisterUserSchema),
  registerUser
);

router.post(
  "/login",
  rateLimiter(5),
  validateFormData(validateLoginUserSchema),
  loginUser
);

router.post("/logout", authenticate, logoutUser);

router.get("/get", authenticate, getUser);

router.post("/refresh-token", refreshAccessToken);

export default router;