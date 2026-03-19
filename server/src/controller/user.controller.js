import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import responseHandler from "../utils/responseHandler.js";
import { sendToken } from "../utils/token.js";



export const registerUser = async (req, res, next) => {
  //req.body handles form collection passed from the client
  const { fullname, email, password} = req.body;
  try {
    //check if email already exists
    const [emailExists, phoneExists] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ fullname }),
    ]);
    if (emailExists)
      return next(responseHandler.errorResponse("Email already exists", 400));
    //if user email is new, proceed to creating user
    //handle verification token generation
    const verifyToken = crypto.randomBytes(16).toString("hex"); //generate unique random 16 digit numbers
    const verifyTokenExpires = new Date(Date.now() + 3600000); //1hr
    //handle password encryption
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //save the user to database
    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
      verifyToken,
      verifyTokenExpires,
    });
    //generate access and refresh token
    const { accessToken, refreshToken, cookieOptions } = sendToken(user);
    //process.nextTick - this allows not block a synchronous operations- the api response wont wait for the email to be sent
  
    //send the cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);
    //return json response
    return responseHandler.successResponse(
      res,
      accessToken,
      "Registration successfull, please check your email for verification",
      201
    );
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { fullname, password } = req.body;
  try {
    //find user in database via the email
    const user = await User.findOne({ fullname }).select("+password"); //select will include the password field, it is hidden by default
    if (!user) {
      return next(responseHandler.notFoundResponse("Account not found"));
    }
    //handle password decryption
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(responseHandler.unauthorizedResponse("Incorrect password"));
    }
    //generate access and refresh token
    const { accessToken, refreshToken, cookieOptions } = sendToken(user);
    //send the cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);
    //return json response
    return responseHandler.successResponse(
      res,
      accessToken,
      "Login successfull",
      200
    );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
    return responseHandler.successResponse(res, null, "Logout successful", 200);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).lean();
    return responseHandler.successResponse(res, user, "user found", 200);
  } catch (error) {
    next(error);
  }
};

 export const refreshAccessToken = async (req, res, next) => {
  try {
  
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(responseHandler.unauthorizedResponse("Session expired, please login again"));
    }

    // 2. Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);

    // 3. Find the user
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(responseHandler.notFoundResponse("User not found"));
    }

    // 4. Generate new tokens using your existing sendToken utility
    const { accessToken, refreshToken: newRefreshToken, cookieOptions } = sendToken(user);

    // 5. Update the cookie with the new refresh token
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    // 6. Return the new access token to the frontend
    return responseHandler.successResponse(
      res, 
      accessToken, // This goes back to your AuthProvider.jsx
      "Token refreshed successfully", 
      200
    );
  } catch (error) {
    // If the refresh token itself is expired or invalid
    return next(responseHandler.unauthorizedResponse("Invalid refresh token"));
  }
};