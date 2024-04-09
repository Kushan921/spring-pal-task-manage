const router = require('express').Router();
let Tasks = require("../models/task-model")


// http://localhost:8020/task/add
router.route("/add").post((req,res)=>{
    const { date, designer, page, task } = req.body;
    const newTask = new Tasks({ date, designer, page, task });

    newTask.save().then(() => {
        res.status(201).json({ message: "Task Added Successfully" });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error adding task" });
    });
});


// http://localhost:8020/task/
router.route("/").get((req,res)=>{
    Tasks.find().then((tasks)=>{
        res.json(tasks);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: "Error fetching tasks" });
    });
});

//tasks get by designer name
// http://localhost:8020/task/
router.route("/:designer").get(async (req, res) => {
    const designerName = req.params.designer;

    try {
        
        const tasks = await Tasks.find({ designer: designerName });
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error fetching tasks" });
    }
});


// http://localhost:8020/task/update/:id
router.route("/update/:id").put(async (req,res)=>{
    const taskId = req.params.id;
    const { date, designer, page, task } = req.body;

    const updatedTask = { date, designer, page, task };

    try {
        const updated = await Tasks.findByIdAndUpdate(taskId, updatedTask);
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating task" });
    }
});


// http://localhost:8020/task/updateOne/:id
router.route("/updateOne/:id").put(async (req, res) => {
    const taskId = req.params.id;
    const task = await Tasks.findById(taskId);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = {
        date: req.body.date || task.date,
        designer: req.body.designer || task.designer,
        page: req.body.page || task.page,
        task: req.body.task || task.task,
    };

    try {
        const updated = await Tasks.findByIdAndUpdate(taskId, updatedTask, { new: true });
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating task" });
    }
});


// http://localhost:8020/task/delete/:id
router.route("/delete/:id").delete(async(req, res)=>{
    const taskId = req.params.id;

    try {
        await Tasks.findByIdAndDelete(taskId);
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error deleting task" });
    }
});


module.exports = router;
