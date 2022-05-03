var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { totalSize, getVideoMetadata, updateVideoMetadata } = require("./services/video.service")

var HTTP_PORT = 80

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/total/:name", async (req, res, next) => {
    try {
        const name = req.params.name;
        const result = await totalSize( name );
        res.json({
            message: "success",
            data: result
        });
    } catch (err) {
        next(err);
    }
});


app.get("/video/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await getVideoMetadata( id );
        res.json({
            message: "success",
            data: result
        });
    } catch (err) {
        next(err);
    }
});

app.patch("/videos/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const result = await updateVideoMetadata( id, payload );
        res.json({
            message: "success",
            data: result
        });
    } catch (err) {
        next(err);
    }
});

