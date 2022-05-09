// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model')

const server = express()

server.get('/api/users', (req, res) => {
    //res.json('users')
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
