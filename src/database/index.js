import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//connecting to MongoDB database
const connectToDB = async () => {
  const connectionURL = process.env.DB_URL;

  mongoose
    .connect(connectionURL, configOptions)
    .then(() => console.log("db connected"))
    .catch((err) =>
      console.log(`Something went wrong in DB connection ${err.message}`)
    );
};

export default connectToDB;
