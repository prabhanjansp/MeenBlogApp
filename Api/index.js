import e from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.mongo)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
// mongoose.set('bufferCommands', false);

const app = e();
app.use(e.json()); // it will allow the  sending the data in the form of json in the body of the request
app.listen(3000, () => {
  console.log("server is running on the port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
