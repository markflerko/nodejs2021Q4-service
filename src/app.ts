const http = require('http');
const requestListener = require('./requestListener');

const app = http.createServer(requestListener);

export default app;
