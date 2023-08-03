// WEBSOCKET
const activeConnections = []; // Array para almacenar las conexiones activas
const wsInstance = expressWs(app);
// Configuramos rutas para manejar conexiones de websockets
app.ws('/chat', (ws, req) => {
  // Manejamos la conexión del websocket aquí
  activeConnections.push(ws);
  ws.on('message', (message) => {
    // Maneja los mensajes del cliente
    // Puedes realizar acciones como enviar mensajes a todos los clientes conectados, guardar mensajes en la base de datos, etc.
  });

  ws.on('close', () => {
    // Maneja el cierre de la conexión del websocket
    // Asegúrate de eliminar la conexión cerrada del array de conexiones activas
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