import express from "express";

const app = express();
app.use(express.json());

//import router (User) so that we can use the recice the request
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

//Route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Example Route -> http://localhost:4000/api/v1/users/register

export default app;
