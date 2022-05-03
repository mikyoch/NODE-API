const { totalSize, getVideoMetadata, updateVideoMetadata } = require("../services/video.service");

const { expect } = require("chai");

var chai = require('chai'),
chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Video Service Unit Tests", function () {
    it("should successfully get total Video size created by the specified user", async function () {
        const name = "User2";
        const returnedTotalSize = await totalSize( name );
        expect(returnedTotalSize.total).to.equal(465);
    });

    it("should return correct metadata (video size, viewers, createdBy)", async function () {
        const id = 1;
        let videoId = 'Video' + id;
        
        const fakeObject = {
            size: 120,
            count: 1100,
            createdBy: "User1"
        };
        const returnedVideoMetadata = await getVideoMetadata( videoId );
        expect(returnedVideoMetadata.createdBy).to.equal(fakeObject.createdBy);
        expect(returnedVideoMetadata.size).to.equal(fakeObject.size);
        expect(returnedVideoMetadata.count).to.eql(fakeObject.count);
    });

    it("should return correct updated metadata (video size, video_id, viewers)", function (done) {
        const videoId = 'Video7';
        
        const willUpdateVideoMetadata = {
            size: 210,
            count: 2100,
            id: videoId
        };
        
        chai.request('http://localhost/')
          .patch(`videos/${videoId}`)
          .send(willUpdateVideoMetadata)
          .set('content-type', 'application/x-www-form-urlencoded')
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            done();
          });
    });
});