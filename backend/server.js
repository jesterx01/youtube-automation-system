const app = require('./app');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

// Bağlantı noktası belirleme
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// HTTP sunucusu oluşturma
const server = http.createServer(app);

// Sunucuyu dinleme
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Port numarasını normalleştir
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// Sunucu hatası olay işleyicisi
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // Özel hata mesajları
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Sunucu dinleme olay işleyicisi
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
  console.log(`Server running at http://localhost:${port}`);
}
