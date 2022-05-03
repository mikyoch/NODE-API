var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 80

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/total/:name", (req, res, next) => {
    var sql = 'select sum(size) as total from created JOIN metadata ON created.video_id = metadata.video_id where created.user = ?'
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});


app.get("/video/:id", (req, res, next) => {
    var sql = 'select size, count, created.user as Createdby from metadata JOIN created on created.video_id = metadata.video_id where metadata.video_id = ?'
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if (row) {
            res.json({
                "message":"success",
                "data":row
            })
        } else {
            res.json({
                "message":"failed"
            })
        }
    });
});

app.patch("/:id/:size/:cnt", (req, res, next) => {
    var sql = 'update metadata set size = ?, count = ? where video_id = ?'
    var params = [req.params.size, req.params.cnt, req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success"
        })
    });
});
