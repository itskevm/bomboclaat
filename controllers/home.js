const { pool } = require('../config')

module.exports = function(app) {

    app.get("/", function(req, res){
        console.log("Root was requested");
        var full = new Date();
        var dt = full.getFullYear();
        
        pool.query('SELECT * FROM schedule', (error, results) => {
            if (error) {
                console.log("sup son")
                throw error
                
            }
            console.log("you passed")
            Response.status(200).json(results.rows)
        })
        
        
        res.render("home", {dt : dt});
    });

}