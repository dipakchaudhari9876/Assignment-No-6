const router = require('express').Router();
const Blog = require('./../models/Blog')

// Your routing code goes here
// router.get('/blog',async(req,res)=>{
//     try{
//         const data =await Blog.find()
//         if(data){
//             res.status(200).send(data)
//         }else{
//             res.status(400).json({Error:"Error in fetching data"})
//         }

//     }catch(err){
//         console.log(err)
//     }
// })

router.get('/blog',async(req,res)=>{
    const topic = req.query
    console.log(topic)
    try{
        const data =await Blog.find({topic:topic.search})
        if(data){
            res.status(200).send(data)
        }else{
            res.status(400).json({Error:"Error in fetching data"})
        }

    }catch(err){
        console.log(err)
    }
})


router.post('/blog',async(req,res)=>{
    const {topic,description,posted_by} = req.body
    if(!topic || !description|| !posted_by){
        return res.status(400).json({error:"Fill proper data"})
    }
    
    try{
        const blog = new Blog(req.body)
        const result = await blog.save()
        res.status(201).send(result)

    }catch(err){
        res.send(400).json({message:"Error"})
    }
})

router.patch('/blog/:id',async(req,res)=>{
    try{
        let _id = req.params.id
        const data =await Blog.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        res.status(200).send(data)
    }catch(err){
        console.log(err)
    }

})

router.delete('/blog/:id',async(req,res)=>{
    try{
        let _id = req.params.id
        const data = await Blog.deleteOne({_id})
        if(data){
            res.status(200).send(data)
        }else{
            res.status(400).json({message:"Error in deleting"})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router;