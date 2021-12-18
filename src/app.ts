import http from 'http';
import requestListener from './requestListener';

const app = http.createServer(requestListener);

export default app;
