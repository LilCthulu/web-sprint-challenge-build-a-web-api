// add middlewares here related to actions
const Actions = require('./actions-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`${timestamp} ${method} ${url}`)
    next()
}
async function validateActionId(req, res, next) {
    try {
        const actions = await Actions.get(req.params.id)
        if (!actions) {
            res.status(404).json({
                message: 'actions not found'
            })
        } else {
            req.actions = actions
            next()
        }
    } catch {
        res.status(500).json({
            message: 'problem finding actions'
        })
    }
}

function validateAction(req, res, next) {
    const { notes, description } = req.body
    if (notes === undefined || notes === null || description === undefined || description === null) {
        res.status(400).json({
            message: "missing required notes, or description fields"
        })
    } else {
        // req.actions = {
        //     notes: notes.trim(),
        //     description: description
        // }
        next()
    }
}

module.exports = { logger, validateActionId, validateAction }