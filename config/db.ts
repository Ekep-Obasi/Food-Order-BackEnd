import mongoose, { ConnectOptions } from "mongoose";
import { MONGO_URL } from ".";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(async function dbConnection() {
  await mongoose
    .connect(MONGO_URL, connectionParams as ConnectOptions)
    .then(() => console.log("Database connected succesfully!"))
    .catch((err) => console.log(`err: ${err}`));
})();
