const express = require('express')
const app = express()
const port = 3000

/** import connection file */
import connect from './Database/conn.js';

app.get('/', (req, res) => {
  res.send('Hello World!')
})

 /* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/

/** start server only when we have valid connection */
connect().then(() =>{
  try {
      app.listen(port, () => {
          console.log(`Serrver connected to http://localhost:${port}`)
      })
  } catch (error) {
      console.log("cannot connect to the server");
  }
}).catch(error => {
  console.log("Invalid database connection");
  console.error(error);
})
