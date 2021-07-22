const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
let User = require("../models/user.model");

chai.use(chaiHttp);

describe("Users", () => {
  it("it shoud signup user success", (done) => {
    let User = {
      username: "test123",
      password: "testuser123",
    };

    chai
      .request(server)
      .post("/user/signup")
      .send(User)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
      });
      done();
  });
});
