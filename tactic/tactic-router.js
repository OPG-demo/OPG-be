const express = require('express');
const Tactic = require('./tactic-model');
const router = express.Router();
const Restricted = require('../middleware/restricted');

router.get('/', (req, res) =>{
  Tactic.find()
    .then(tactic =>{
      res.status(200).json(tactic)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.post('/', (req, res) =>{
  Tactic.add(req.body)
  .then(tactic =>{
    res.status(200).json(tactic)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/:id', (req, res) =>{
  Tactic.findById(req.params.id)
    .then(tactic =>{
      if (tactic) {
        res.json(tactic)
      } else {
        res.status(404).json({message: "The tactic with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get tactic"})
    })
})

router.get('/org/:org_id', (req, res) =>{
  Tactic.findByOrg(req.params.org_id)
    .then(tactic =>{
      if (tactic) {
        res.json(tactic)
      } else {
        res.status(404).json({message: "The tactic associated with that org does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get tactic"})
    })
})

router.put('/:id', (req, res) =>{
  Tactic.update(req.body, req.params.id)
  .then(tactic =>{
    if (tactic) {
      res.json(tactic)
    } else {
      res.status(404).json({message: "Tactic with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update tactic"})
  })
})

router.delete('/:id', (req, res) =>{
  Tactic.remove(req.params.id)
  .then(tactic =>{
    if (tactic) {
      res.json({message: "Tactic removed"})
    } else {
      res.status(404).json({message: "Tactic with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Tactic could not be removed"})
  })
})

module.exports = router;