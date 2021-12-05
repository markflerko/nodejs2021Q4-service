const emitter = require('../../utils/eventEmitter');
const postUser = require('../../controllers/postUser');
const getUser = require('../../controllers/getUser');
const delUser = require('../../controllers/delUser');
const putUser = require('../../controllers/putUser');

class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = 'GET', path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`method ${method} on route ${path} is already exist`);
    }
    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }

  get(path, handler) {
    this.request('GET', path, handler);
  }

  post(path, handler) {
    this.request('POST', path, handler);
  }

  put(path, handler) {
    this.request('PUT', path, handler);
  }

  delete(path, handler) {
    this.request('DELETE', path, handler);
  }
}

const router = new Router();

router.post('users', async (req, res) => {
  await postUser(req, res);
});

router.get('users', async (req, res) => {
  await getUser(req, res);
});

router.put('users', async (req, res) => {
  await putUser(req, res);
});

router.delete('users', async (req, res) => {
  await delUser(req, res);
});

module.exports = router;
