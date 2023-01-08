require("dotenv").config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
const cors = require("cors");
import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bookingRoute from "./routes/bookingRoute";
import faqRoute from "./routes/faqRoute";
import testimonialRoute from "./routes/testimonialRoute";
import path from "path";

// CONFIGURATIONS & MIDDLEWARE
const app = express();
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); //-->converts/parse data to object

app.use(
  cors({
    origin: [
      "https://jt-toursandtravels-admin.web.app",
      "https://jt-toursandtravels.web.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(cookieParser()); // helps send http-only cookie
app.use(express.urlencoded({ extended: false })); //--> helps handle data via URL
app.use(errorHandler); // custom error middleware
// app.options("*", cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // fill upload util is going to point in uploads folder

// ROUTES MIDDLEWARE.
app.use("/api/users", userRoute); // user routes.
app.use("/api/products", productRoute); // product routes
app.use("/api/booking", bookingRoute); // booking routes
app.use("/api/faq", faqRoute); //frequently asked question routes
app.use("/api/testimonial", testimonialRoute); // testimonial

app.get("/", (req: Request, res: Response) => {
  res.send("Home Page");
});

// CONNECT TO DB AND START SERVER
mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err: string) => console.log(err));
