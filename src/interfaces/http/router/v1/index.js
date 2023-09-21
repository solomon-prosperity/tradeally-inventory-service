import express from "express";
// import other routes
import userRouter from "./userRouter";
import inventoryRouter from "./inventoryRouter";

const router = express.Router();

// mount routes
router.use("/users", userRouter);
router.use("/inventory", inventoryRouter);

module.exports = router;
