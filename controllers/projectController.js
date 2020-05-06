const Project = require('../models/Proyect');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.createProject = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newProject = new Project(req.body);
        newProject.creator = req.user.userId;
        newProject.createdAt = Date.now();
        newProject.createdAtMoment = moment(Date.now()).format('YYYY-MM-DD h:mm:ss a');
        newProject.createdAtMilliseconds = moment().valueOf();
        newProject.save();
        res.json(newProject);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}

exports.getProjects = async (req, res) => {
    try {
        const projectsByUser = await Project.find({ creator: req.user.userId }).sort({ createdAt: -1 });
        res.json({ projectsByUser });
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

exports.updateProject = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { name } = req.body;
    const newProject = {};

    if (name)
        newProject.name = name;

    try {
        let project = await Project.findById(req.params.id);

        if (!project)
            return res.status(404).json({ msg: 'El proyecto no existe' });

        if (project.creator.toString() !== req.user.userId)
            return res.status(401).json({ msg: 'No autorizado' });

        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
        res.json({ project });
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor');
    }

}

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project)
            return res.status(404).json({ msg: 'Projecto no encontrado' });

        if (project.creator.toString() !== req.user.userId)
            return res.status(401).json({ msg: 'No autorizado' });

        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Proyecto eliminado' });
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor');
    }
}