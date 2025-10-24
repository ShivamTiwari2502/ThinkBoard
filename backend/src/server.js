import express from "express";
import router from "./routes/notesRote.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

const app = express();
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

//middleware
app.use(express.json()); // this middeware will parse the json body
// app.use(rateLimiter); // this middleware will limit the no of req.

// below is our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`middleware is working, ${req.method}, ${req.url}`);
//   next();
// });

app.use(cors({    // middleware is added to make request in same computer
  origin : "http://localhost:5173"
}))

app.use("/api/notes", router);

// first connect to DB then start the server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is listening at 5001");
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is listening at 5001");
});

// mongodb+srv://ooopshivamtiwari_db_user:2IvX5s4s3R8uzjx3@cluster0.cj5gqcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
