const mysql = require("mysql")
const { USER, DATABASE, MDP, HOST } = require("../json/db.json")

module.exports = async () => {

  let db = await mysql.createConnection({

    host: HOST,
    user: USER,
    password: MDP,
    database: DATABASE
  })

  return db

}