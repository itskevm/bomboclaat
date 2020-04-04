//const { pool } = require('../config')

module.exports = function(app) {

    app.get("/", function(req, res){
        console.log("Root was requested");
        var full = new Date();
        var dt = full.getFullYear();
        /*
        pool.query('SELECT * FROM schedule', (error, results) => {
            if (error) {
                console.log("sup")
                throw error
                
            }

            Response.status(200).json(results.rows)
        })
        */
        
        res.render("home", {dt : dt});
    });

}