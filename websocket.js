// WEBSOCKET - not done yet


const expressWs = require('express-ws');

function configureWebSocket(app) {

    const activeConnections = []; // Array para almacenar las conexiones activas
    const wsInstance = expressWs(app);

    // Configuramos rutas para manejar conexiones de websockets
    app.ws('/chat', (ws, req) => {
    // Manejamos la conexión del websocket aquí
    activeConnections.push(ws);
    ws.on('message', (message) => {
        
    });

    ws.on('close', () => {
        
    });
    });

    app.post('/chat/send-message', (req, res) => {
        const { message } = req.body;

        activeConnections.forEach((ws) => {
            // Enviar mensajes a todos los clientes conectados
            ws.send(message);
        });

        res.status(200).json({ success: true });
    });
}

module.exports = { configureWebSocket };