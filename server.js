const http = require ('http');
const url = require('url');
const querystring = require('querystring');


const PORT = 4000;
const HOST_NAME = 'localhost';
const users = [];
const books = [];
const authors = [];

const server = http.createServer((req, res) => { 
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (req.method === 'GET' && path === '/books') {
        // GET /books
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    } else if (req.method === 'PUT' && path === '/books') {
        // PUT /books
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const bookData = querystring.parse(Buffer.concat(body).toString());
            // Handle book update logic here
            const bookId = bookData.id;
            // Update the book with the given ID
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book updated successfully' }));
        });
    } else if (req.method === 'DELETE' && path === '/books') {
        // DELETE /books
        const bookId = query.id;
        // Handle book deletion logic here
        // Delete book with the given ID
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book deleted successfully' }));
    } else if (req.method === 'GET' && path.startsWith('/books/author/')) {
        // GET /books/author/:authorId
        const authorId = path.split('/').pop();
        // Handle fetching books by author logic here
        const authorBooks = books.filter(book => book.authorId === authorId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(authorBooks));
    } else if (req.method === 'POST' && path.startsWith('/books/author/')) {
        // POST /books/author/:authorId
        const authorId = path.split('/').pop();
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const bookData = querystring.parse(Buffer.concat(body).toString());
            // Handle book creation by author logic here
            bookData.authorId = authorId;
            books.push(bookData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book created successfully' }));
        });
    } else if (req.method === 'PUT' && path.startsWith('/books/author/')) {
        // PUT /books/author/:authorId
        const authorId = path.split('/').pop();
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const bookData = querystring.parse(Buffer.concat(body).toString());
            // Handle book update by author logic here
            const bookId = bookData.id;
            // Update the book with the given ID
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book updated successfully' }));
        });
    } else {
        // Handle unknown routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }





});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


