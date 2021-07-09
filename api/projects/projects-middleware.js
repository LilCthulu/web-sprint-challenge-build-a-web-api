// add middlewares here related to projects
const Projects = require('./projects-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString
    const method = req.method
    const url = req.originalUrl
    console.log(`${timestamp} ${method} ${url}`)
    next()
}
async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: 'Project not found'
            })
        } else {
            req.project = project
            next()
        }
    } catch {
        res.status(500).json({
            message: 'problem finding project'
        })
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!name.trim() || !description) {
        res.status(400).json({
            message: "missing required name, or description fields"
        })
    } else {
        req.project = {
            name: name.trim(),
            description: description
        }
        next()
    }
}

module.exports = { logger, validateProjectId, validateProject }