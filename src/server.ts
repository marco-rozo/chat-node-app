import cors from 'cors';
import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import routes from './core/config/routes';
import { DatabaseConnection } from './core/external/database/databaseConnection';
import { setupSocket } from './core/external/websocket/socket';
import { SocketConnection } from './core/external/websocket/socketConnection';

const app: Application = express();
const PORT: number = 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // Em DEV permitindo qualquer origem
        methods: ['GET', 'POST']
    }
});

const socketConnection = SocketConnection.getInstance();
socketConnection.setServer(io);
setupSocket();

async function startServer() {
    try {
        const db = DatabaseConnection.getInstance();
        console.log('Conectando ao banco de dados...');
        await db.connect();
        server.listen(PORT, () => {
            console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
        process.exit(1);
    }
}

startServer();
