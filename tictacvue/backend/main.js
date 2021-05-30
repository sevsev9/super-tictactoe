var ws = require('ws');

const wss = new WebSocket.Server({
    port: 7800,
    perMessageDeflate: {
        zlibDeflateOptions: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10*1024
        },
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        concurrencyLimit: 10,
        threshold: 1024
    }
});

wss.on('matrix-update', (ws, request, client) => {
    ws.on('message', function (msg) {
        // eslint-disable-next-line no-console
        console.log(msg)
    })
});