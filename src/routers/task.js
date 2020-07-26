'use strict'

const express = require('express');
const Task = require('../models/task.js');
const router = new express.Router();
const authentication = require('../middleware/authentication.js');

router.post('/tasks', authentication, async (req, res) => {

    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// GET /tasks?completed=true
router.get('/tasks', authentication, async (req, res) => {

    const match = {};

    if (req.query.completed === 'true') {
        match.completed = true;
    } else {
        match.completed = false;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', authentication, async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        
        if (task === null) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', authentication, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (isValidOperation === false) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (task === null) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', authentication, async (req, res) => {

    try {

        const task = await Task.findOneAndDelete({ _id:req.params.id, owner: req.user._id });
        if (task === null) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;