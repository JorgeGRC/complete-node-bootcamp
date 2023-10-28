const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution 1 - load everything into memory and send back
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //
  // solution 2 - use streams for efficiency
  //   const readable = fs.createReadStream('test-file.txt');
  //   readable.on('data', (chunk) => {
  //     // Response is a writtable stream
  //     // we are streaming the data to the client
  //     res.write(chunk);
  //   });
  //   // once all data was written, finish the connection
  //   readable.on('end', () => {
  //     res.end();
  //   });

  // SOLUTION 3 - pipe operator to avoid back pressure
  // pipe output of readable stream into the input of writable stream
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);

  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found');
  });
});

server.listen(8000, 'localhost', () => {
  console.log('Listening...');
});
