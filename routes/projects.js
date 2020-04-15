const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authentication = require('../middlewares/authentication');
const { check } = require('express-validator');

router.post('/',
    authentication,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.createProject
);

router.get('/',
    authentication,
    projectController.getProjects
);

router.put('/:id',
    authentication,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.updateProject
);

router.delete('/:id',
    authentication,
    projectController.deleteProject
);

module.exports = router;