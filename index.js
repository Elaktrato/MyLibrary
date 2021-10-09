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
    try {
        const result = await getBooks();
        return res.status(200).send(result)
    } catch (err) {
        return res.status(400).send(err.message)
    }
});

app.get("/books/:id", async(req, res) => {
    try {
        const result = await getSingleBook(req.params.id);
        return res.status(200).send(result)
    } catch (err) {
        return res.status(400).send(err.message)
    }
});

app.get("/authors", async(req, res) => {
    try {
        const result = await getAuthors();
        return res.status(200).send(result)
    } catch (err) {
        return res.status(400).send(err.message)
    }
});

app.get("/authors/:id", async(req, res) => {
    try {
        const result = await getSingleAuthor(req.params.id)
        return res.status(200).send(result)
    } catch (err) {
        return res.status(400).send(err.message)
    }
});

app.listen(PORT, () => {
    console.log("Book API running on " + PORT)
})