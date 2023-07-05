import mongoose from "mongoose";
import app from "./main";
import * as dotenv from "dotenv";
dotenv.config();

const db = `${process.env.MONGODB}`;
mongoose.connect(db);
mongoose.connection.on("connected", () =>
  console.log("hello database i'm crushing on  y🤭u   🍀🍀🍀 ")
);
mongoose.connection.on("disconnected", () =>
  console.log("you just broke my heart 💔💔")
);
const port: string | any = process.env.port || 3000;
// app.on("", () => {});
app.listen(port, () => {
  console.log(` server is running on port ${port} ⚡`);
});
