const Task = require('../models/Task');
const Project = require('../models/Proyect');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const { project } = req.body;
        const currentProject = await Project.findById(project);

        if (!currentProject)
            return res.status(404).json({ msg: 'Proyecto no encontrado' });

        if (currentProject.creator.toString() !== req.user.userId)
            return res.status(401).json({ msg: 'No autorizado' });

        const newTask = new Task(req.body);
        newTask.createdAt = Date.now();
        newTask.save();
        res.json({ newTask });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');;
    }

}

exports.getTasks = async (req, res) => {
    try {
        const { project } = req.query; // Se envia como params
        const currentProject = await Project.findById(project);

        if (!currentProject)
            return res.status(404).json({ msg: 'Proyecto no encontrado' });

        if (currentProject.creator.toString() !== req.user.userId)
            return res.status(401).json({ msg: 'No autorizado' });

        const currentTasks = await Task.find({ project }).sort({ createdAt: -1 });
        res.json({ currentTasks });
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { project, name, status } = req.body;
        let currentTask = await Task.findById(req.params.id);

        if (!currentTask)
            return res.status(404).json({ msg: 'Tarea no existe' });

        const currentProject = await Project.findById(project);

        if (currentProject.creator.toString() !== req.user.userId)
            return res.status(401).json({ msg: 'No autorizado' });

        const newTask = {};
        newTask.name = name;
        newTask.status = status;

        currentTask = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
        res.json({ currentTask });
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al actualizar la tarea');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.query;
        let currentTask = await Task.findById(req.params.id);

        if (!currentTask)
            return res.status(404).json({ msg: 'Tarea no existe' });

        const currentProject = await Project.findById(project);

        if (currentProject.creator.toString() !== req.user.userId)
            return res.status(401).json({ msg: 'No autorizado' });

        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada' });
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al eliminar la tarea');
    }
}