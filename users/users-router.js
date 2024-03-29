const express = require('express');
const Users = require('../users/users-model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const Restricted = require('../middleware/restricted');

router.post('/register', (req, res) =>{
  const user = req.body;
  const hash = bcrypt.hashSync(user.pwdhash, 8)
  user.pwdhash = hash;
  Users.add(user)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: "Could not add user"})
      console.log(err)
    })
})

router.post('/login', (req, res) =>{
  let {username, pwdhash} = req.body;
    Users.findBy({username})
      .first()
      .then(user =>{
        if (user && bcrypt.compareSync(pwdhash, user.pwdhash)){
          const token = generateToken(user);
          res.status(200).json({message: `${user.username} is logged in!`, token, id:` ${user.id}`, org: `${user.org_id}`})
        } else {
          res.status(400).json({message: "Invalid username or password"})
        }
      })
      .catch(err =>{
        res.status(500).json(err)
      })
});

router.get('/user', (req, res) =>{
  Users.find()
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.get('/user/:id', (req, res) =>{
  Users.findById(req.params.id)
    .then(user =>{
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({message: "The user with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get user"})
    })
})

router.put('/user/:id', (req, res) =>{
  Users.update(req.body, req.params.id)
  .then(user =>{
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({message: "User with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update user"})
  })
})

router.delete('/user/:id', (req, res) =>{
  Users.remove(req.params.id)
  .then(user =>{
    if (user) {
      res.json({message: "User removed"})
    } else {
      res.status(404).json({message: "User with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "User could not be removed"})
  })
})



function generateToken(user){
  const payload ={
    username: user.username,
    id: user.id
  };
  const options ={
    expiresIn: "12h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;