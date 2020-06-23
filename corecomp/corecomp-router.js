const express = require('express');
const Corecomp = require('./corecomp-model');
const router = express.Router();
const Restricted = require('../middleware/restricted');

router.get('/', (req, res) =>{
  Corecomp.find()
    .then(corecomp =>{
      res.status(200).json(corecomp)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.post('/', (req, res) =>{
  Corecomp.add(req.body)
  .then(corecomp =>{
    res.status(200).json(corecomp)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/:id', (req, res) =>{
  Corecomp.findById(req.params.id)
    .then(corecomp =>{
      if (corecomp) {
        res.json(corecomp)
      } else {
        res.status(404).json({message: "The corecomp with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get corecomp"})
    })
})

router.put('/:id', (req, res) =>{
  Corecomp.update(req.body, req.params.id)
  .then(corecomp =>{
    if (corecomp) {
      res.json(corecomp)
    } else {
      res.status(404).json({message: "Corecomp with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update corecomp"})
  })
})

router.delete('/:id', (req, res) =>{
  Corecomp.remove(req.params.id)
  .then(corecomp =>{
    if (corecomp) {
      res.json({message: "Corecomp removed"})
    } else {
      res.status(404).json({message: "Corecomp with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Corecomp could not be removed"})
  })
})

module.exports = router;