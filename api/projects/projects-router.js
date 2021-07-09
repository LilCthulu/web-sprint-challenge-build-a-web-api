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
    Projects.insert(req.project)
        .then((newProject) => {
            res.status(201).json(newProject)
            console.log(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProject, validateProjectId, (req, res, next) => {
    Projects.update
})

module.exports = router