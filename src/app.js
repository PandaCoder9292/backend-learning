import express from "express";
//import router (User) so that we can use the recice the request
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());

//Route declaration
app.use("/api/v1/users", userRouter);

// Example Route -> http://localhost:4000/api/v1/users/register

export default app;
