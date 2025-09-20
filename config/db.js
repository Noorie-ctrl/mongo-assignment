const mongoose = require("mongoose");

const CONNECTION_STRING =
  "mongodb+srv://iotb-user:67g52lkSWuQPJcsM@my-free-cluster.r4qky.mongodb.net/notesdb?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
