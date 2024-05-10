import { logger } from "./logger.js"

export default class Routes {
    io

    async defaultRoute(req, res) {
        res.end('Hello world')
    }

    async options(req, res) {
        res.writeHead(204)
        res.end('Hello world')
    }
    async post(req, res) {
        logger.info('post')
        res.end()
    }
    async get(req, res) {
        logger.info('get')
        res.end()
    }

    setSocketInstance(io) {
        this.io = io
    }

    async handler(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        const chosen = this[req.method.toLowerCase()] || this.defaultRoute
        chosen.apply(this, [req, res])
    }
}