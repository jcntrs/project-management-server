const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authentication = require('../middlewares/authentication');
const { check } = require('express-validator');

router.post('/',
    authentication,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    taskController.createTask
);

router.get('/',
    authentication,
    taskController.getTasks
);

router.put('/:id',
    authentication,
    taskController.updateTask
);

router.delete('/:id',
    authentication,
    taskController.deleteTask
);

module.exports = router;