//const { pool } = require('../config')
const { Pool } = require('pg')
const connectionString = 'postgres://wijeezpfrowzgj:0d742ba8ed25fae44c5999999385c5771bf52bd868791616a9c5b75e27232424@ec2-54-92-174-171.compute-1.amazonaws.com:5432/deal6623ob8hm2'
const pool = new Pool({
    connectionString: connectionString,
})

function loadDb(err) {

};

module.exports = function(app) {

    app.get("/", function(req, res){
        console.log("Root was requested");
        var full = new Date();
        var dt = full.getFullYear();
        var id = "777"
        var name = "shaq daddy"

        pool.query('SELECT * FROM schedule',  name = function(err, result) {
            console.log("start me funky: ")
            console.log(err);
            console.log(result.rows[0]);
            console.log(result.rows.length);
            id = result.rows[0].schedule_id;
            return result.rows[0].schedule_name;
            console.log(id);
            console.log(name);
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
        
        res.render("home", {
            dt : dt,
            id : id,
            name : name
        });
    });

}