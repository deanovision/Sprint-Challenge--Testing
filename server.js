const express = require("express");
const server = express();
const games = require("./data/games/games-model");
server.use(express.json());

server.get("/games", (req, res) => {
  games
    .get()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
server.post("/games", (req, res) => {
  const { title, genre } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "422" });
  } else {
    games
      .add(req.body)
      .then(game => {
        res.status(201).json(game);
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  }
});
module.exports = server;
