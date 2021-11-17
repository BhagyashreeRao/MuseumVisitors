const express  = require('express');
const visitorRouter = express.Router()

const visitorController = require('../controllers/visitor')

visitorRouter.get('/',visitorController.getMuseumVisitors)


module.exports = visitorRouter;