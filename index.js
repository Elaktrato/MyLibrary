const express = require('express');
require('dotenv').config();

const {
    addBook,
    getBooks,
    getSingleBook,
    getAuthors,
    getSingleAuthor
} = require('./controllers');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post("/books", async(req, res) => {
    const newBook = req.body;
    const result = await addBook(newBook);
    res.status(201).send(result)
});

app.get("/books", async(req, res) => {
    const result = await getBooks();
    res.status(200).send(result)
});

app.get("/books/:id", async(req, res) => {
    const result = await getSingleBook(req.params.id);
    res.status(200).send(result)
});

app.get("/authors", async(req, res) => {
    const result = await getAuthors();
    res.status(200).send(result)
});

app.get("/authors/:id", async(req, res) => {
    const result = await getSingleAuthor(req.params.id);
    res.status(200).send(result)
});

app.listen(PORT, () => {
    console.log("Book API running on " + PORT)
})