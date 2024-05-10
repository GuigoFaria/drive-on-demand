import fs from 'fs';
import https from 'https'
import { logger } from './logger.js';
import { Server } from 'socket.io';
import Routes from './routes.js';

const port = process.env.PORT || 3000;
const routes = new Routes()

const localhostSSL = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem')
}

const server = https.createServer(localhostSSL,
    routes.handler.bind(routes)
)

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: 'false'
    }
})

routes.setSocketInstance(io)

io.on('connection', (socket) => {
    logger.info('someone has connected: ' + socket.id)
})

const startServer = () => {
    const { address, port } = server.address()
    logger.info(`App running at: https://${address}:${port}`)
}

server.listen(port, startServer)