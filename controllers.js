const pgp = require('pg-promise')();
console.log(process.env.DB_PASS);
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

let uri = `${username}:${password}@${host}:${port}/library`
if (process.env.DATABASE_URL) {
    uri = process.env.DATABASE_URL + "?ssl=true"
}


console.log(uri);
const db = pgp(uri)

async function addBook(book) {
    const newBook = {
        title: book.title,
        description: book.description,
        author_id: book.authorId
    }

    const result = await db.query('INSERT INTO books(${this:name}) VALUE(${this:csv})', newBook)
    return result;
}

async function getBooks() {

    const result = await db.query('SELECT ${columns:name} FROM ${table:name}', {
        columns: ['title', 'description'],
        table: 'books'
    });
    return result;
}

async function getSingleBook(id) {

    const result = await db.query('SELECT ${columns:name} FROM ${table:name} WHERE id = $/bookid/', {
        columns: ['id', 'title'],
        table: 'books',
        bookid: id
    });
    return result;
}

module.exports = {
    addBook,
    getBooks,
    getSingleBook
}