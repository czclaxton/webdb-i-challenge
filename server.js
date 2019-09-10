const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();
server.use(express.json());

server.get("/accounts", (req, res) => {
  db("accounts")
    .then(accounts => {
      //   console.log(accounts);
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

server.post("/accounts", (req, res) => {
  const accountData = req.body;

  db("accounts")
    .insert(accountData)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.put("/accounts/:id", (req, res) => {
  const id = req.params.id;

  db("accounts")
    .where("id", id)
    // .where({ id: id }) SAME AS ABOVE
    .update({ name: req.body.name, budget: req.body.budget })
    .then(update => res.status(200).json(update))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error updating" });
    });
});

server.delete("/accounts/:id", (req, res) => {
  const id = req.params.id;

  db("accounts")
    .where("id", id)
    .del()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error deleting" });
    });
});

module.exports = server;
