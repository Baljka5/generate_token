const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(bodyParser.json());

function generateToken(apiCode, apiSecret) {
    const timestamp = Math.floor(Date.now() / 1000);
    const userAgent = 'BiznetworkAuth [https://www.biznetwork.mn]';
    const hashStr = apiCode + ':' + apiSecret;
    const hashKey = userAgent + '|' + timestamp;
    const rawBinaryData = true;

    const hmac = crypto.createHmac('sha1', hashKey);
    hmac.update(hashStr);
    const result = hmac.digest(rawBinaryData ? 'binary' : 'hex');
    const token = Buffer.from(result, rawBinaryData ? 'binary' : 'hex').toString('base64');

    return token;
}

app.post('/generate-token', (req, res) => {
    const {apiCode, apiSecret} = req.body;

    if (!apiCode || !apiSecret) {
        return res.status(400).json({
            error: "API code and API secret are required."
        });
    }

    const token = generateToken(apiCode, apiSecret);
    res.json({token});
});

app.listen(port, () => {
    console.log(`Token API running on http://localhost:${port}`);
});
