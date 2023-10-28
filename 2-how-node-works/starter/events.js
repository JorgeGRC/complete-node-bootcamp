const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super(); // Always done when extending
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Customer sale: Jonas');
});

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit('newSale', 9);

///////////////////////////////

const server = http.createServer();

// Listen to events
server.on('request', (req, res) => {
  console.log('Request received!');
  console.log(req.url);
  res.end('Request received!');
});

server.on('request', (req, res) => {
  console.log('Another request 😄');
});

server.on('close', () => {
  console.log('Server closed ⛔️');
});

server.listen(8000, 'localhost', () => {
  console.log('✅ Waiting for requests...');
});
