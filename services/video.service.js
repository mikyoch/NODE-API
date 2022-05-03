const db = require("../database/database")

function runQuery (req, params = []) {
  return new Promise(function (resolve, reject) {
      db.get(req, params, function (err, row) {
          if (err)
            reject(err);
      }, function (err, data) {
          if (err) {
              reject(err);
          }
          else
            resolve(data);
      });
  });
}

const totalSize = async ( name ) => {
  try {
    var sql = 'select sum(size) as total from created JOIN metadata ON created.video_id = metadata.video_id where created.user = ?';
    data = await runQuery(sql, [name]);
    return data;
  } catch (err) {
    return console.error(err.message);
  }
}

const getVideoMetadata = async ( videoId ) => {
  try {
    var sql = 'select size, count, created.user as createdBy from metadata JOIN created on created.video_id = metadata.video_id where metadata.video_id = ?'
    data = await runQuery(sql, [videoId]);
    return data;
  } catch (err) {
    return console.error(err.message);
  }
}

const updateVideoMetadata = async( id, payload ) => {
  try {
    var sql = 'update metadata set size = ?, count = ? where video_id = ?';
    var size = parseInt(payload.size);
    var count = parseInt(payload.count);
    data = await runQuery(sql, [size, count, id]);
  } catch (err) {
    return console.error(err.message);
  }
}

module.exports = {
  totalSize: totalSize,
  getVideoMetadata: getVideoMetadata,
  updateVideoMetadata: updateVideoMetadata
}
