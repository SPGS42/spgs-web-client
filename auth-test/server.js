import http from "http";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '123857965273-930jlfpdk5ef9ofpa77c7oa4mhhhe726.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  return ticket.getPayload();
};

http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  if (request.method === 'POST') {
    request.on("data", async data => {
      const { token } = JSON.parse(data);
      const userInfo = await verify(token);
      response.end(JSON.stringify(userInfo));
    });
  }
}).listen(8080);
