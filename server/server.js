const express = require("express");
const todoRoutes = require('./routes/todos');
const cors = require('cors')
const db = require('./db')

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
