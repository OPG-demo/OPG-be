const express = require('express');
const Division = require('./division-model');
const router = express.Router();
const Restricted = require('../middleware/restricted');

router.get('/', (req, res) =>{
  Division.find()
    .then(division =>{
      res.status(200).json(division)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.post('/', (req, res) =>{
  Division.add(req.body)
  .then(division =>{
    res.status(200).json(division)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/:id', (req, res) =>{
  Division.findById(req.params.id)
    .then(division =>{
      if (division) {
        res.json(division)
      } else {
        res.status(404).json({message: "The division with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get division"})
    })
})

router.get('/org/:org_id', (req, res) =>{
  Division.findByOrg(req.params.org_id)
    .then(division =>{
      if (division) {
        res.json(division)
      } else {
        res.status(404).json({message: "The division associated with this org does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get division"})
    })
})

router.put('/:id', (req, res) =>{
  Division.update(req.body, req.params.id)
  .then(division =>{
    if (division) {
      res.json(division)
    } else {
      res.status(404).json({message: "Division with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update division"})
  })
})

router.delete('/:id', (req, res) =>{
  Division.remove(req.params.id)
  .then(division =>{
    if (division) {
      res.json({message: "Division removed"})
    } else {
      res.status(404).json({message: "Division with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Division could not be removed"})
  })
})

module.exports = router;