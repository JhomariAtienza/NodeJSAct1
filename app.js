const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <h1>Hello!</h1>
            <form action="/create-user" method="POST">
                <input type="text" name="username" placeholder="Enter username" required>
                <button type="submit">Submit</button>
            </form>
        `);
        res.end();
    } else if (req.method === 'GET' && req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <ul>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>
        `);
        res.end();
    } else if (req.method === 'POST' && req.url === '/create-user') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedBody = parse(body);
            const username = parsedBody.username;
            console.log(`Username submitted: ${username}`);
            
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>My first Node JS</h1>');
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
