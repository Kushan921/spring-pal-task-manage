const router = require('express').Router();
let Contents = require('../models/content-model')


// http://localhost:8020/content/add
router.route("/add").post((req,res)=>{
    const { date, content,username } = req.body;
    const newContent = new Contents({ date, content,username });
    console.log(username);

    newContent.save().then(() => {
        res.status(201).json({ message: "Content Added Successfully" });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error adding task" });
    });
});


// // http://localhost:8020/content/
// router.route("/").get((req,res)=>{
//     Contents.find().then((content)=>{
//         res.json(content);
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).json({ error: "Error fetching tasks" });
//     });
// });

const moment = require('moment');

router.route("/:username").get((req, res) => {
    const username = req.params.username; 
    
    if (!username) {
        return res.status(400).json({ error: "Username not provided" });
    }

    const todayDate = moment().format('YYYY-MM-DD');

    // Find all contents for today related to the given username
    Contents.find({ date: todayDate, username: username }).then((contents) => {
        res.json(contents);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error fetching contents" });
    });
});


// http://localhost:8020/content/update/:id
//
router.route("/update/:id").put(async (req,res)=>{
    const contentId = req.params.id;
    const { date, content } = req.body;

    const updateContent= { date, content };

    try {
        const updated = await Contents.findByIdAndUpdate(contentId, updateContent);
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating contents" });
    }
});

router.route("/delete/:id").delete(async(req,res)=>{
    const contentId = req.params.id;
    
    try{
        await Contents.findByIdAndDelete(contentId);
        res.status(204).send()
    }catch(err){
        console.log(err);
    }

})

module.exports = router;
