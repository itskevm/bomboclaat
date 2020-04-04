module.exports = function(app) {


    app.get ('/step', function(req, res){
        console.log("Received request for " + req.path);
        res.write('ok');
        res.end();
    })

    
}