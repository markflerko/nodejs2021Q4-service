const responseBuilder = ({ res, code, body = '', message = '' }) => {
  if (body) {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(body));
  } else {
    res.statusCode = code;
  }

  if (message) {
    res.write(message);
  }

  res.end();
};

module.exports = responseBuilder;
