import { z } from "zod";

export const validateRegisterUserSchema = z.object({
  fullname: z.string().min(5, {
    message: "Username must be at least 5 characters long ",
  }),
  email: z.email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    })
});

export const validateLoginUserSchema = z.object({
   fullname: z.string().min(5, {
    message: "Username must be at least 5 characters long ",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});


export const validateTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 4 characters long")
    .max(40, "Title is too long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  tags: z.string().nonempty("please select a tag"),
});
