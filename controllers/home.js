//const { pool } = require('../config')
const { Pool } = require('pg')
const connectionString = 'postgres://wijeezpfrowzgj:0d742ba8ed25fae44c5999999385c5771bf52bd868791616a9c5b75e27232424@ec2-54-92-174-171.compute-1.amazonaws.com:5432/deal6623ob8hm2'
const pool = new Pool({
    connectionString: connectionString,
    // comment out the next line for heroku usage
    //ssl: true
})

// comment out next line for heroku usage
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function loadDb(err) {

};

module.exports = function(app) {

    /*app.post("/schedule", async (req, res) => {
        console.log("data: " + req.body.code)
        var queryString = "SELECT * FROM schedule WHERE schedule_id=" + req.body.code;
        let quehay = 'it runs';
        console.log(quehay);
        async function setter(err, result) {
            let pope = result;
            return 'great';
        }
        pool.query(queryString, setter);
        quehay = await setter();
        console.log(quehay);
        res.end()
    })*/

    app.post("/schedule", async (req, res) => {
        //if (typeof req.body.code !== 'undefined') {
        if (req.body.code >= 0) {
            console.log("Were searching for: " + req.body.code)
            var queryStringVerify = "SELECT MAX(schedule_id) FROM schedule"
            var queryStringLoad = "SELECT * FROM schedule WHERE schedule_id=" + req.body.code;
            
            const lastValidID = await pool.query(queryStringVerify)
            console.log("this is the limit: " + lastValidID.rows[0].max + " and this is the entry " + req.body.code)
            if (req.body.code > lastValidID.rows[0].max) {
                console.log("im yelling at you");
            }
            else {
                console.log("not even yelling");
                const resulta = await pool.query(queryStringLoad)
                var queryStringLoadSked = "SELECT * FROM availability WHERE schedule_id=" + resulta.rows[0].schedule_id;
                const times = await pool.query(queryStringLoadSked)

                var fullFecha = new Date();
                var dt = fullFecha.getFullYear();
                var id = resulta.rows[0].schedule_id;
                var name = resulta.rows[0].schedule_name;
                
                var mos = 0;
                var moe = 1;
                var tus = 0;
                var tue = 1;
                var wes = 0;
                var wee = 1;
                var ths = 0;
                var the = 1;
                var frs = 0;
                var fre = 1;
                var sthapit = 'no';

                if (times.rowCount > 4) {
                    mos = times.rows[0].start_time;
                    moe = times.rows[0].end_time;
                    tus = times.rows[1].start_time;
                    tue = times.rows[1].end_time;
                    wes = times.rows[2].start_time;
                    wee = times.rows[2].end_time;
                    ths = times.rows[3].start_time;
                    the = times.rows[3].end_time;
                    frs = times.rows[4].start_time;
                    fre = times.rows[4].end_time;
                    sthapit = 'yes';
                }
                
                res.render("home", {
                    dt : dt,
                    id : id,
                    name : name,
                    mos : mos,
                    moe : moe,
                    tus : tus,
                    tue : tue,
                    wes : wes,
                    wee : wee,
                    ths : ths,
                    the : the,
                    frs : frs,
                    fre : fre,
                    sthapit : sthapit
                });            
                console.log('ended me')
            }
        }
        if (req.body.newname) {
            console.log("Youre doing Save As: " + req.body.newname);

            // whats the save string?
            var queryStringSave = "INSERT INTO schedule (schedule_name) VALUES ('" + req.body.newname + "');";
            
            // lets save and wait till it finishes
            await pool.query(queryStringSave);
            
            // whats the verify most recent schedule string?
            var queryStringVerify = "SELECT MAX(schedule_id) FROM schedule"
            // lets grab that most recent schedule data
            const lastValidID = await pool.query(queryStringVerify)

            // whats the load string? the id will be whatever the recent schedule data had
            var queryStringLoad = "SELECT * FROM schedule WHERE schedule_id=" + lastValidID.rows[0].max;
            // lets load the details
            const resulta = await pool.query(queryStringLoad)
            
            var fullFecha = new Date();
            var dt = fullFecha.getFullYear();
            var id = resulta.rows[0].schedule_id;
            var name = resulta.rows[0].schedule_name;
            var mos = 0;
            var moe = 1;
            var tus = 0;
            var tue = 1;
            var wes = 0;
            var wee = 1;
            var ths = 0;
            var the = 1;
            var frs = 0;
            var fre = 1;
            var sthapit = 'no';
            
            res.render("home", {
                dt : dt,
                id : id,
                name : name,
                mos : mos,
                moe : moe,
                tus : tus,
                tue : tue,
                wes : wes,
                wee : wee,
                ths : ths,
                the : the,
                frs : frs,
                fre : fre,
                sthapit : sthapit
            });            
            console.log('ended me')
        }
        if (req.body.sid >= 0) {
            console.log("Youre updating with ID: " + req.body.sid);
            
            // whats the save availability string?
            //var queryStringSave = "INSERT INTO availability (schedule_id, "+",) VALUES ('" + req.body.sid + "');";
            var queryStringSaveMo = "INSERT INTO availability (schedule_id, day_chosen, start_time, end_time) VALUES (" + req.body.sid + ", 0, "+req.body.mostart+", "+req.body.moend+")";
            var queryStringSaveTu = "INSERT INTO availability (schedule_id, day_chosen, start_time, end_time) VALUES (" + req.body.sid + ", 1, "+req.body.tustart+", "+req.body.tuend+")";
            var queryStringSaveWe = "INSERT INTO availability (schedule_id, day_chosen, start_time, end_time) VALUES (" + req.body.sid + ", 2, "+req.body.westart+", "+req.body.weend+")";
            var queryStringSaveTh = "INSERT INTO availability (schedule_id, day_chosen, start_time, end_time) VALUES (" + req.body.sid + ", 3, "+req.body.thstart+", "+req.body.thend+")";
            var queryStringSaveFr = "INSERT INTO availability (schedule_id, day_chosen, start_time, end_time) VALUES (" + req.body.sid + ", 4, "+req.body.frstart+", "+req.body.frend+")";
            
            await pool.query(queryStringSaveMo);
            await pool.query(queryStringSaveTu);
            await pool.query(queryStringSaveWe);
            await pool.query(queryStringSaveTh);
            await pool.query(queryStringSaveFr);
            
            var fullFecha = new Date();
            var dt = fullFecha.getFullYear();
            var id = req.body.sid;
            var name = req.body.sname;
            var mos = req.body.mostart;
            var moe = req.body.moend;
            var tus = req.body.tustart;
            var tue = req.body.tuend;
            var wes = req.body.westart;
            var wee = req.body.weend;
            var ths = req.body.thstart;
            var the = req.body.thend;
            var frs = req.body.frstart;
            var fre = req.body.frend;
            sthapit = 'yes';
            
            res.render("home", {
                dt : dt,
                id : id,
                name : name,
                mos : mos,
                moe : moe,
                tus : tus,
                tue : tue,
                wes : wes,
                wee : wee,
                ths : ths,
                the : the,
                frs : frs,
                fre : fre,
                sthapit : sthapit
            });            
            console.log('ended me')
        }

    })

    app.get("/schedule", function(req, res){
        console.log("Root was requested");
        var fullFecha = new Date();
        var dt = fullFecha.getFullYear();
        var id = "undefined"
        var name = "New Schedule";
        
        pool.query('SELECT * FROM schedule', function(err, result) {
            console.log("start me funky: ")
            console.log(err);
            console.log(result.rows[0]);
            console.log(result.rows.length);
            id = result.rows[0].schedule_id;
            name = result.rows[0].schedule_name;
            console.log(id);
            console.log(name);
          })

        res.render("home", {
            dt : dt,
            id : id,
            name : name
        });
    });

}