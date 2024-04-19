import express from "express";
//const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/** import connection file */
import connectToDatabase from "./Database/conn.mjs";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
