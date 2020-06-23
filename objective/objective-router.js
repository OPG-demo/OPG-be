const express = require('express');
const Objective = require('./objective-model');
const router = express.Router();
const Restricted = require('../middleware/restricted');

router.get('/', (req, res) =>{
  Objective.find()
    .then(objective =>{
      res.status(200).json(objective)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.post('/', (req, res) =>{
  Objective.add(req.body)
  .then(objective =>{
    res.status(200).json(objective)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/:id', (req, res) =>{
  Objective.findById(req.params.id)
    .then(objective =>{
      if (objective) {
        res.json(objective)
      } else {
        res.status(404).json({message: "The objective with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get objective"})
    })
})

router.put('/:id', (req, res) =>{
  Objective.update(req.body, req.params.id)
  .then(objective =>{
    if (objective) {
      res.json(objective)
    } else {
      res.status(404).json({message: "Objective with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update objective"})
  })
})

router.delete('/:id', (req, res) =>{
  Objective.remove(req.params.id)
  .then(objective =>{
    if (objective) {
      res.json({message: "Objective removed"})
    } else {
      res.status(404).json({message: "Objective with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Objective could not be removed"})
  })
})

module.exports = router;