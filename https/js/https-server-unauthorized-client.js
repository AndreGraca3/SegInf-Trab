const https = require("https");
const express = require("express");
const fs = require("fs");

const PORT = 4433;
const app = express();

app.get("/", function (req, res) {
    console.log(
        req.socket.remoteAddress
        //+ ' ' + req.socket.getPeerCertificate().subject.CN
        + ' ' + req.method
        + ' ' + req.url);
    res.send("<html><body>🔓Hello World for unauthorized client with node.js🔓</body></html>");
});

// configure TLS handshake
const options = {
    key: fs.readFileSync('../certificates/secure-server-key-17nov.pem'),
    cert: fs.readFileSync('../certificates/secure-server-17nov.pem'),
    requestCert: false,
    rejectUnauthorized: false,
};

// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
        console.log("Server started at port " + PORT);
    }
);