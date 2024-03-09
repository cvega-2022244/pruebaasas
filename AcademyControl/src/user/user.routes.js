'use strict'

import express from 'express'
import { validateJwt, isTeacher} from '../middlewares/validate.jwt.js'
import { assignUserCourse, createUser, deleteUser, listUserCourses, loginUser, test, updateUser, } from './user.controller.js'

const api = express.Router()

api.get('/test', [validateJwt, isTeacher], test)
api.post('/register', createUser)
api.post('/login', loginUser)
api.put('/update/:id', [validateJwt], updateUser)
api.delete('/delete/:id', [validateJwt], deleteUser)
api.post('/assignCourse/:id', [validateJwt], assignUserCourse)
api.post('/listMyCourses', [validateJwt], listUserCourses)

export default api