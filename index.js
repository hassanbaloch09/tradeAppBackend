import express from "express";
import cors from "cors";
import PaymentsRouter from "./routes/Payment.js";
const app = express();
const PORT = process.env.PORT || 5000;

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cors());

//All routes
app.use("/payment", PaymentsRouter);

app.use("/", async (req, res) => {
  res.send("<h1>Error 404 Not Found !</h1>");
  res.end();
});

app.listen(PORT);
