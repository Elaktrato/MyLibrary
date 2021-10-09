const pgp = require('pg-promise')();
console.log(process.env.DATABASE_URL)


let db;
if (process.env.DATABASE_URL) {
    db = pgp({
        connectionString: process.env.DATABASE_URL,
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

    const result = await db.query('INSERT INTO books(${this:name}) VALUES(${this:csv})', newBook)
    return result;
}

async function getBooks() {

    const result = await db.query(`
    select name author, title, description, books.id 
    from books 
    left join author 
    on author.id = books.author_id`);
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

async function updateBook(id, update) {
    await db.query('UPDATE books SET description $2 WHERE id = ${id}', {
        id: id,
        description: update.description
    })
    return getSingleBook(id)
}

async function deleteBook(id) {
    await db.query('DELETE FROM books WHERE id = ${id}', {
        id: id
    })
    return true
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
    getSingleAuthor,
    updateBook,
    deleteBook
}