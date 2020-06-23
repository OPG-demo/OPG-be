const express = require('express');
const Org = require('./org-model');
const router = express.Router();
const Restricted = require('../middleware/restricted');

router.get('/', (req, res) =>{
  Org.find()
    .then(org =>{
      res.status(200).json(org)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.post('/', (req, res) =>{
  Org.add(req.body)
  .then(org =>{
    res.status(200).json(org)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/:id', (req, res) =>{
  Org.findById(req.params.id)
    .then(org =>{
      if (org) {
        res.json(org)
      } else {
        res.status(404).json({message: "The org with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get org"})
    })
})

router.put('/:id', (req, res) =>{
  Org.update(req.body, req.params.id)
  .then(org =>{
    if (org) {
      res.json(org)
    } else {
      res.status(404).json({message: "Org with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update org"})
  })
})

router.delete('/:id', (req, res) =>{
  Org.remove(req.params.id)
  .then(org =>{
    if (org) {
      res.json({message: "Org removed"})
    } else {
      res.status(404).json({message: "Org with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Org could not be removed"})
  })
})

module.exports = router;