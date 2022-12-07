const log4js = require('log4js')

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'errores.log' },
    archivoDebug: { type: 'file', filename: 'debug.log' },
    archivoWarn: { type: 'file', filename: 'warn.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
      maxLevel:'error'
    },
    loggerArchivoWarn: {
      type: 'logLevelFilter',
      appender: 'archivoWarn',
      level: 'warn',
      maxLevel: 'warn'
    }
  },
  categories: {
    default: {
      appenders: ['loggerConsola'],
      level: 'all',
    },
    prod: {
      appenders: ['loggerConsola','loggerArchivoErrores','loggerArchivoWarn'],
      level: 'all',
    },
  },
})

let logger = null

// if (process.env.NODE_ENV === 'production') {
//   logger = log4js.getLogger('prod')
// } else {
//   logger = log4js.getLogger()
// }

logger = log4js.getLogger('prod')

module.exports = logger
