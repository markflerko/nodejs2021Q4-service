import { ServerResponse } from 'http';

export const responseBuilder = ({
  res,
  code,
  body = '',
  message = '',
}: {
  res: ServerResponse;
  code: number;
  body?: any;
  message?: string;
}) => {
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
