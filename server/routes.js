import express from 'express'
import dbService from './db.service'
import config from './config'
import Validator from './validator'

const validateRequest = Validator(true)
const router = express.Router()
dbService.init(config.mongo)

// for test purpose
router.get('/', validateRequest, (request, response) => {
  response.status(200).end()
})

router.get('/:id', validateRequest, (request, response) => {
  dbService.read(request.params.id)
    .then(doc => response.json(doc))
    .catch(reason => response.status(500).json({error: reason.message}))
})

router.post('/', validateRequest, (request, response) => {
  dbService.create(request.body)
    .then(doc => response.json(doc))
    .catch(reason => response.status(500).json({error: reason.message}))
})

router.put('/', validateRequest, (request, response) => {
  dbService.update(request.body)
    .then(doc => response.json(doc))
    .catch(reason => response.status(500).json({error: reason.message}))
})

router.delete('/:id', validateRequest, (request, response) => {
  dbService.delete(request.params.id)
    .then(doc => response.status(200).end())
    .catch(reason => response.status(500).json({error: reason.message}))
})

export default router
