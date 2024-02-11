import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import certificates from "./routes/certificates";
import users from "./routes/users";
import auth from "./routes/auth";
import importants from "./routes/importants";
import category from "./routes/category";
import error from "./middlewares/error";
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://certificate-wallet.vercel.app"],
  })
);

app.use(express.static("public"));
app.use("/auth", auth);
app.use("/users", users);
app.use("/certificates", certificates);
app.use("/importants", importants);
app.use("/category", category);
app.use(error);

app.get("/", (req, res) => {
  res.status(200).send("Certificate Wallet Backend");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started listenning at port ${PORT}`);
});
