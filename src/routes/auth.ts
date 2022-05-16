import express from "express";
import { body, validationResult } from "express-validator";
import User from "../Models/userSchema";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkAuth } from "../Middleware/checkAuth";
import { stripe } from "../utils/stripe";

const router = express.Router();

//post req for sign up
router.post(
  "/signup",
  body("email").isEmail().withMessage("The Email is invalid"),
  body("password").isLength({ min: 5 }).withMessage("The Password is invalid"),
  async (req, res) => {
    //validation part
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      //checking throw every error msg
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.json({ errors, data: null });
    }
    //using userSchema validation
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        errors: [{ msg: "Email Already in Use." }],
        data: null,
      });
    }
    //hash the password
    const hashedPassword = await bycrpt.hash(password, 10);

    const customer = await stripe.customers.create(
      {
        email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );
    const newUser = await User.create({
      email,
      password: hashedPassword,
      stripeCustomerId: customer.id,
    });

    const token = await jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: 360000 }
    );
    res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          stripeCustomerId: customer.id,
        },
      },
    });
  }
);
// post the user Data and compire it

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ errors: [{ msg: "Invalid credentials" }], data: null });
  }

  const isMatch = await bycrpt.compare(password, user.password);
  if (!isMatch) res.status(400).send("cannot find user");

  const token = await jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: 360000 }
  );

  res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

router.get("/me", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });

  return res.json({
    errors: [],
    data: {
      user: {
        id: user._id,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
      },
    },
  });
});

export default router;
