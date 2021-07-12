// Write your "projects" router here!
const express = require('express')
const { validateProjectId, validateProject } = require('./projects-middleware')
const Projects = require('./projects-model')

const router = express.Router()

router.get("/", (req, res, next) => {
    Projects.get()
        .then((projects) => res.json(projects))
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then((newProject) => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProject, validateProjectId, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then((updatedProject) => {
            res.json(updatedProject)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, async(req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch (error) {
        next(error)
    }

})

router.get("/:id/actions", validateProjectId, async(req, res, next) => {
    try {
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)
        console.log(result)
    } catch (error) {
        next(error)
    }
})
module.exports = router