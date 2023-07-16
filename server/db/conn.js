import mongoose from "mongoose";

export function connectDB() {
  return new Promise((res, rej) => {
    mongoose.set("strictQuery", false);
    mongoose.set("bufferCommands", false);
    mongoose
      .connect("mongodb+srv://danish79786:123@cluster0.cqhmhnn.mongodb.net/")
      .then(() => {
        console.log("DATABASE IS CONNECTED :)");
        res();
      })
      .catch(rej);
  });
}
