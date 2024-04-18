import express from 'express';
//const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/** import connection file */
import connectToDatabase from './Database/conn.mjs';

app.get('/', (req, res) => {
  res.send('Hello World!');
});


 /* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/

/** start server only when we have valid connection */
async function startServer() {
  try {
    await connectToDatabase();
      app.listen(port, () => {
          console.log(`Serrver connected to http://localhost:${port}`);
      });
  } catch (error) {
      console.log("cannot connect to the server", error);
      process.exit(1);
  }
}

startServer();
