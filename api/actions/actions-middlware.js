// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: 'action not found'
            })
        } else {
            req.action = action
            next()
        }
    } catch {
        res.status(500).json({
            message: 'problem finding action'
        })
    }
}

function validateAction(req, res, next) {
    const { notes, description } = req.body
    if (!notes || !description || description.length > 128) {
        res.status(400).json({
            message: "missing required notes, or description fields. Or description is too long."
        })
    } else {
        req.action = {
            notes: notes,
            description: description
        }
        next()
    }
}

module.exports = { validateAction, validateActionId }