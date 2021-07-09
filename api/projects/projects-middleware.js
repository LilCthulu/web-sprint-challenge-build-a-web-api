// add middlewares here related to projects
const Projects = require('./projects-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} ${url}`)
    next()
}

module.exports = [logger]