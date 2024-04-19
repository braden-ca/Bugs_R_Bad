import express from "express";
//const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/** import connection file */
import connectToDatabase from "./Database/conn.mjs";
import routes from "./routes/index.mjs";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(routes);

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.log("cannot connect to the server", error);
    process.exit(1);
  }
}

startServer();
