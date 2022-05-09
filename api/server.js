// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model') //look at all the functions created

const server = express()

server.use(express.json()) // we need to teach express how to parse
//put
server.put('/api/users/:id', async (req, res) => {
    try{
        const tempUser = await User.findById(req.params.id)
        if(!tempUser){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
            })
            } else {
                const updatedUser = await User.update(req.params.id, req.body)
                res.status(200).json(updatedUser)
            }
        } 
    } catch (err) {
        res.status(500).json({
            message: "error deleting user",
            err: err.message,
        })
    }
})

//delete
server.delete('/api/users/:id', async (req, res) => {
   try {
    const tempUser = await User.findById(req.params.id)
    //console.log('possible', tempUser)
    if(!tempUser){
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        const deletedUser = await User.remove(tempUser.id)
        //console.log(deletedUser)
        res.status(200).json(deletedUser)
    }
   } catch (err) {
    res.status(500).json({
        message: "error deleting user",
        err: err.message,
    })
   }
})
//post
server.post('/api/users', (req, res) => {
     //http post :9000/api/users name=foo bio=bar --verbose
    const user = req.body;
    if(!user.name || !user.bio){
        res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    } else {
        User.insert(user)
        .then(newUser => {
            //console.log(data)
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({
                message: "error creating user",
                err: err.message,
            })
        })
    }  
})

//get
server.get('/api/users', (req, res) => {
    //res.json('users') http get :9000/api/users 
    User.find()
    .then(users =>{
        //throw new Error('whhops!')
        //console.log(users) shows on run server
        if(!users){
            res.status(500).json({
                message: "The users information could not be retrieved"
            }) 
         }
        res.json(users) //shows httpie
    })
    .catch(err => {
        res.status(500).json({
            message: "error getting users",
            err: err.message,
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user =>{
        if(!user){
           res.status(404).json({
               message: "The user with the specified ID does not exist"
           }) 
        }
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            message: "error getting user",
            err: err.message,
        })
    })
})

server.use('*', (req, res) => {
    res.status(404).json({
        message:'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
