import pino from 'pino'
const transport = pino.transport({
    target: 'pino-pretty',
    options: { colorize: true }
})

const logger = pino({ level: 'trace' }, transport)
export {
    logger
}