const express = require('express');
const router =express.Router();
const uuid = require('uuid');
let database = require('../../database');

// get all user
router.get('/', (req,res) => {
    res.json(database);
}) 

// get user by id.
router.get('/:id', (req,res) => {
   const found = database.some(user => user.id === parseInt(req.params.id))

   if(found) {
    res.json(database.filter(user => user.id === parseInt(req.params.id)))
   }else{
    res.sendStatus(400)
   }
}) 


// get all user
router.post('/', (req,res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if(!newUser.name || !newUser.email){
        return res.sendStatus(400)
    }
    
    database.push(newUser)
    res.json(database)
}) 

// update user
router.put('/:id', (req,res) => {
    const found = database.some(user => user.id === parseInt(req.params.id))

    if(found) {
        const updateUser = req.body;
        database.forEach(user => {
            if(user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ? updateUser.name: user.name
                user.email = updateUser.email ? updateUser.email: user.email
                res.json({msg: 'User update', user})
            }
        })

    }
})



// delete user
router.delete('/:id', (req,res) => {
    const found = database.some(user => user.id === parseInt(req.params.id))

    if(found) {
        database = database.filter((user) => user.id !== parseInt(req.params.id))
        res.json({
            msg: "User deleted",
            database,
        });
    }else{
        res.sendStatus(400);
    }

})

module.exports = router;  