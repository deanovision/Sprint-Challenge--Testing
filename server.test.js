const request = require("supertest");
const server = require("./server");
const db = require("./data/dbConfig");

describe("GET /games", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });
  test("should return 200 OK", () => {
    return request(server)
      .get("/games")
      .expect(200);
  });
  test("should be JSON", () => {
    return request(server)
      .get("/games")
      .then(res => {
        expect(res.type).toBe("application/json");
      });
  });
  test("should return an array", () => {
    return request(server)
      .get("/games")
      .then(res => {
        expect(res).toEqual(expect.arrayContaining([]));
      });
  });
});

describe("POST /games", () => {
  test("should return 201 when game is added", () => {
    const game = {
      title: "Street Fighter",
      genre: "Fighting",
      releaseYear: 1992
    };
    return request(server)
      .post("/games")
      .send(game)
      .expect(201);
  });
  test("should return 422", () => {
    const game2 = {
      title: "Street Fighter",
      releaseYear: 1992
    };
    return request(server)
      .post("/games")
      .send(game2)
      .expect(422);
  });
  test("should return JSON", () => {
    const game3 = {
      title: "Street Fighter",
      genre: "Fighting",
      releaseYear: 1992
    };
    return request(server)
      .post("/games")
      .send(game3)
      .then(res => {
        expect(res.type).toBe("application/json");
      });
  });
});
