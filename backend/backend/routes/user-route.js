const router = require('express').Router();
let User = require("../models/user-model")


// http://localhost:8080/user/add
router.route("/add").post((req,res)=>{
    const { username,password,role } = req.body;
    console.log(role);
    const newUser = new User({ username,password,role });

    newUser.save().then(() => {
        res.status(201).json({ message: "User Added Successfully" });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error adding task" });
    });
});



// http://localhost:8080/user/
router.route("/").get((req,res)=>{
    User.find().then((user)=>{
        res.json(user);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: "Error fetching tasks" });
    });
});



//login
router.route("/login").post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }).then((user)=>{
        if(user){
           
            if(user.password == password){
                res.status(200).json({ message: "User login successfully", role: user.role });
                console.log(user.role);
            }
            else{
                res.status(401).json({message:"Password incorrect"})
            }
        }
        else{
            res.status(404).json({message:"User not found"})
        }
    }).catch((error)=>{
        res.status(500).json({error:"User login error"})
    })
})



// // http://localhost:8020/task/update/:id
// router.route("/update/:id").put(async (req,res)=>{
//     const taskId = req.params.id;
//     const { date, designer, page, task } = req.body;

//     const updatedTask = { date, designer, page, task };

//     try {
//         const updated = await Tasks.findByIdAndUpdate(taskId, updatedTask);
//         res.status(204).send();
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Error updating task" });
//     }
// });


// // http://localhost:8020/task/updateOne/:id
// router.route("/updateOne/:id").put(async (req, res) => {
//     const taskId = req.params.id;
//     const task = await Tasks.findById(taskId);

//     if (!task) {
//         return res.status(404).json({ error: "Task not found" });
//     }

//     const updatedTask = {
//         date: req.body.date || task.date,
//         designer: req.body.designer || task.designer,
//         page: req.body.page || task.page,
//         task: req.body.task || task.task,
//     };

//     try {
//         const updated = await Tasks.findByIdAndUpdate(taskId, updatedTask, { new: true });
//         res.json(updated);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Error updating task" });
//     }
// });


// // http://localhost:8020/task/delete/:id
// router.route("/delete/:id").delete(async(req, res)=>{
//     const taskId = req.params.id;

//     try {
//         await Tasks.findByIdAndDelete(taskId);
//         res.status(204).send();
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Error deleting task" });
//     }
// });


module.exports = router;
