const pgp = require('pg-promise')();
console.log(process.env.DB_PASS);

let db;
if (process.env.DATABASE_URL) {
    db = pgp({
        connectioString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
} else {
    const username = process.env.DB_USER;
    const password = process.env.DB_PASS;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;

    let uri = `postgres://${username}:${password}@${host}:${port}/library`
    console.log(uri)
    db = pgp(uri)
}

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

async function getAuthors() {

    const result = await db.query('SELECT ${columns:name} FROM ${table:name}', {
        columns: ['name', 'birthdate'],
        table: 'author'
    });
    return result;
}

async function getSingleAuthor(id) {

    const result = await db.query('SELECT ${columns:name} FROM ${table:name} WHERE id = $/authorid/', {
        columns: ['id', 'name'],
        table: 'author',
        authorid: id
    });
    return result;
}

module.exports = {
    addBook,
    getBooks,
    getSingleBook,
    getAuthors,
    getSingleAuthor
}