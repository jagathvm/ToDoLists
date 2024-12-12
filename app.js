import "dotenv/config";
import express from "express";
import toDoRouter from "./server/routes/todo-route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", toDoRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening requests at ${process.env.PORT}`);
});
