const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth()
});

const express = require('express');
const app = express();
const port = 3000;

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

app.get('/sendToClient', (req, res) => {
  client.sendMessage("6287788014212@c.us", "tes send").then(
    res.sendStatus(200)
  );
});

client.on('ready', () => {
  console.log("client ready")
  app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
  });

});
