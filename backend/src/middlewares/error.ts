import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", () => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});
