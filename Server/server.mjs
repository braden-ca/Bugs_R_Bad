import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
//const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/** import connection file */
import connectToDatabase from "./Database/conn.mjs";
import routes from "./routes/taskRoutes.mjs";

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

app.use('/api', router)

app.get('/', (req, res) => {
  try{
       res.json("Get request")
  } catch (error) {
       res.json(error)
  }
})

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
