'use strict';

import Categoria from './category.model.js';
import Curso from '../course/course.model.js'

export const test = (req, res) => {
    return res.send('Hello world');
};

export const crearCategoria = async (req, res) => {
    try {
        let datos = req.body;
        let categoria = new Categoria(datos);
        await categoria.save();
        return res.send({ message: 'Categoria creada exitosamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al crear la categoria', err });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        let { id } = req.params;
        let datos = req.body;
        let categoriaActualizada = await Categoria.findByIdAndUpdate(id, datos, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).send({ message: 'Categoria no encontrada o no actualizada' });
        }
        return res.send({ message: 'Categoria actualizada exitosamente', categoriaActualizada });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al actualizar la categoria' });
    }
};

export const eliminarCategoria = async(req, res)=>{
    try {
        let { id } = req.params;
        let categoriaEliminada = await Categoria.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).send({ message: 'Categoria no encontrada o no eliminada' });
        }
        const categoriaDefault = await Categoria.findOne({name: 'Default'})
        if(!categoriaDefault){
            const datos = {
                name: 'Default',
                description: 'Categoría por defecto.'
            };
            let categoria = new Categoria(datos);
            await categoria.save();
        }
        const cursos = await Curso.find({ category: id });
        if(cursos.length === 0){
            return res.send({ message: 'La categoría seleccionada no tiene cursos. Eliminada exitosamente' });
        }
        await Curso.updateMany({ category: id }, { $set: { category: categoriaDefault._id } });
        return res.send({ message: 'Categoría eliminada exitosamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al eliminar la categoría' });
    }
};

export const listarCategorias = async(req, res)=>{
    try {
        const categorias = await Categoria.find();
        if(categorias.length === 0) 
            return res.status(404).send({ message: 'No se encontraron categorías' });
        return res.send({ message: 'Categorías encontradas.', categorias });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al listar las categorías' });
    }
};
