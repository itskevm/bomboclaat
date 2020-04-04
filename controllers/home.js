//const { pool } = require('../config')
const { Pool, Client } = require('pg')
const pool = new Pool()

module.exports = function(app) {

    app.get("/", function(req, res){
        console.log("Root was requested");
        var full = new Date();
        var dt = full.getFullYear();
        
        pool.query('SELECT * FROM schedule', (err, res) => {
            console.log(err, res)
            pool.end()
          })
        
        /*
        pool.query('SELECT * FROM schedule', (error, results) => {
            if (error) {
                console.log("sup son")
                throw error
                
            }
            console.log("you passed")
            Response.status(200).json(results.rows)
        })
        */
        
        res.render("home", {dt : dt});
    });

}