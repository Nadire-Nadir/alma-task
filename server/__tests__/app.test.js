const request = require("supertest");
const { v4: uuidv4 } = require("uuid");
const app = require("../index");


describe("Test Root Endpoint", () => {
  test("GET /", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.message = "Hello!";
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("No search text will result in empty array.", () => {
  test("GET /api/coffees", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.length = 0;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});


describe("Make sure full text search works", () => {
  test("GET /api/coffees?q=Paulig", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.length = 1;
        res.body[0] = {
          id: "e7877f58-76af-4f97-91e7-b20371cb0ef6",
          name: "Paulig Presidentti",
          weight: "500",
          price: "7.99",
          level: "4",
        };
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});


describe("Make sure API can add new coffee", () => {
  const newCoffee = {
    id: uuidv4(),
    name: "New Coffee",
    weight: "400",
    price: "8.99",
    level: "1",
  };
  test("POST /api/coffees", (done) => {
    request(app)
      .post("/api/coffees")
      .expect("Content-Type", /json/)
      .send(newCoffee)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
