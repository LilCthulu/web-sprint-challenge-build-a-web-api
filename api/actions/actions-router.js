// Write your "actions" router here!
const express = require('express')
const { validateActionId, validateAction } = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get("/", (req, res, next) => {
    Actions.get()
        .then((actions) => res.json(actions))
        .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then((newAction) => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateAction, validateActionId, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then((updatedAction) => {
            res.json(updatedAction)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, async(req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.action)
    } catch (error) {
        next(error)
    }

})

module.exports = router