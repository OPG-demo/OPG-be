const express = require('express');
const Swot = require('./swot-model');
const router = express.Router();
const Restricted = require('../middleware/restricted');

router.get('/', (req, res) =>{
  Swot.find()
    .then(swot =>{
      res.status(200).json(swot)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.post('/', (req, res) =>{
  Swot.add(req.body)
  .then(swot =>{
    res.status(200).json(swot)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/:id', (req, res) =>{
  Swot.findById(req.params.id)
    .then(swot =>{
      if (swot) {
        res.json(swot)
      } else {
        res.status(404).json({message: "The swot with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get swot"})
    })
})

router.get('/org/:org_id', (req, res) =>{
  Swot.findByOrg(req.params.org_id)
    .then(swot =>{
      if (swot) {
        res.json(swot)
      } else {
        res.status(404).json({message: "The swot associated with that org does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get swot"})
    })
})

router.put('/:id', (req, res) =>{
  Swot.update(req.body, req.params.id)
  .then(swot =>{
    if (swot) {
      res.json(swot)
    } else {
      res.status(404).json({message: "Swot with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update swot"})
  })
})

router.delete('/:id', (req, res) =>{
  Swot.remove(req.params.id)
  .then(swot =>{
    if (swot) {
      res.json({message: "Swot removed"})
    } else {
      res.status(404).json({message: "Swot with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Swot could not be removed"})
  })
})

module.exports = router;