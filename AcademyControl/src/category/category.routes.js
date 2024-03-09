'use strict';

import { Router } from 'express'
import { crearCategoria, eliminarCategoria, listarCategorias, test, actualizarCategoria } from './category.controller.js'
import { isTeacher, validateJwt } from '../middlewares/validate.jwt.js'

const api = Router()

api.get('/test',[validateJwt, isTeacher], test)
api.post('/create',[validateJwt, isTeacher], crearCategoria)
api.put('/update/:id',[validateJwt, isTeacher], actualizarCategoria)
api.delete('/delete/:id',[validateJwt, isTeacher], eliminarCategoria)
api.get('/list',[validateJwt], listarCategorias)

export default api
