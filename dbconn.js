require('dotenv').config()

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();



let userdata = {
  email:"jet.l@abc.com",
  firstname:"jet",
  lastname:"lee",
  age:35,
  isParent:true
}

//insert sql
//INSERT INTO gb.user (email, firstname, lastname, age, isparent) VALUES ("${userdata.email}","${userdata.firstname}","${userdata.lastname}",${userdata.age}, ${userdata.isParent});

let query = client.query("SELECT * FROM gb.user;", (err, res) => {
  console.log(client.query);
  
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }

  client.end();
});

console.log(query);