const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// In-memory card collection
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" },
];

// GET all cards
app.get("/cards", (req, res) => {
  res.status(200).json(cards);
});

// GET card by ID
app.get("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ message: `Card with ID ${id} not found` });
  }
  res.status(200).json(card);
});

// POST add new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ message: "Suit and value are required" });
  }

  const newCard = {
    id: cards.length ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value,
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE card by ID
app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Card with ID ${id} not found` });
  }

  cards.splice(index, 1);
  res.status(200).json({ message: `Card with ID ${id} removed` });
});

module.exports = app;
