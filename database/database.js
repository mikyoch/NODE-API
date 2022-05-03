const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite" 

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE created (
            video_id text PRIMARY KEY,
            user text
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO created (user, video_id) VALUES (?,?)'
            db.run(insert, ["User1", "Video1"])
            db.run(insert, ["User1", "Video2"])
            db.run(insert, ["User1", "Video3"])
            db.run(insert, ["User2", "Video4"])
            db.run(insert, ["User2", "Video5"])
            db.run(insert, ["User2", "Video6"])
            db.run(insert, ["User3", "Video7"])
        }})
        db.run(`CREATE TABLE metadata (
            video_id text PRIMARY KEY,
            size INTEGER,
            count INTEGER
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO metadata (video_id, size, count) VALUES (?,?,?)'
            db.run(insert, ["Video1", "120", "1100"])
            db.run(insert, ["Video2", "80", "2000"])
            db.run(insert, ["Video3", "250", "900"])
            db.run(insert, ["Video4", "90", "600"])
            db.run(insert, ["Video5", "75", "700"])
            db.run(insert, ["Video6", "300", "3000"])
            db.run(insert, ["Video7", "200", "2200"])
        }})
    }
});

module.exports = db;