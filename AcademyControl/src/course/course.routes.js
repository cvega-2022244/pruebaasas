 'use strict'

import express from 'express'
import { validateJwt, isTeacher} from '../middlewares/validate.jwt.js'
import {  create, deleteCourse, test, update,  } from './course.controller.js'

const api = express.Router()

api.get('/test', [validateJwt, isTeacher], test)
api.post('/create', [validateJwt, isTeacher], create)
api.put('/update/:id', [validateJwt, isTeacher], update)
api.delete('/delete/:id',[validateJwt, isTeacher], deleteCourse)

export default api