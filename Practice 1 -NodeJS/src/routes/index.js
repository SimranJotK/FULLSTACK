// index.js

const express = require('express');
const app = express();

app.use(express.json()); // To parse JSON bodies

// In-memory data store
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
    { id: 2, suit: "Spades", value: "King" },
      { id: 3, suit: "DIAMONDS", value: "Queen" }
      ];

      let nextId = 4; // For assigning IDs to new cards

      // GET /cards - Get all cards
      app.get('/cards', (req, res) => {
        res.status(200).json(cards);
        });

        // GET /cards/:id - Get a specific card
        app.get('/cards/:id', (req, res) => {
          const cardId = parseInt(req.params.id);
            const card = cards.find(c => c.id === cardId);
              if (card) {
                  res.status(200).json(card);
                    } else {
                        res.status(404).json({ message: "Card not found" });
                          }
                          });

                          // POST /cards - Add a new card
                          app.post('/cards', (req, res) => {
                            const { suit, value } = req.body;
                              if (!suit || !value) {
                                  return res.status(400).json({ message: "Suit and value are required" });
                                    }

                                      const newCard = {
                                          id: nextId++,
                                              suit,
                                                  value
                                                    };

                                                      cards.push(newCard);
                                                        res.status(201).json(newCard);
                                                        });

                                                        // DELETE /cards/:id - Delete a card by ID
                                                        app.delete('/cards/:id', (req, res) => {
                                                          const cardId = parseInt(req.params.id);
                                                            const index = cards.findIndex(c => c.id === cardId);

                                                              if (index !== -1) {
                                                                  const removedCard = cards.splice(index, 1)[0];
                                                                      res.status(200).json({
                                                                            message: `Card with ID ${cardId} removed.`,
                                                                                  card: removedCard
                                                                                      });
                                                                                        } else {
                                                                                            res.status(404).json({ message: "Card not found" });
                                                                                              }
                                                                                              });

                                                                                              // Start the server
                                                                                              const PORT = 3000;
                                                                                              app.listen(PORT, () => {
                                                                                                console.log(`Server is running on http://localhost:${PORT}`);
                                                                                                });
                                                                                                