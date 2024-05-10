import express from "express";
import cors from "cors";
//const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


/** import connection file */
import connectToDatabase from "./Database/conn.mjs";
import routes from "./Routes/taskRoutes.mjs";

// Middleware to parse JSON in request bodies
app.use(express.json());

var corsoptions={
  origin: true,
  credentials: true
}
app.use(cors(corsoptions));
app.use(routes);
app.get("/", (req, res) => {
  res.status(200).send({ message: 'Task deleted successfully.' });
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

