const express = require('express');
const Iksf = require('./iksf-model');
const router = express.Router();
const Restricted = require('../middleware/restricted');

router.get('/', (req, res) =>{
  Iksf.find()
    .then(iksf =>{
      res.status(200).json(iksf)
    })
    .catch(err =>{
      res.json(err)
    })
});

router.post('/', (req, res) =>{
  Iksf.add(req.body)
  .then(iksf =>{
    res.status(200).json(iksf)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/:id', (req, res) =>{
  Iksf.findById(req.params.id)
    .then(iksf =>{
      if (iksf) {
        res.json(iksf)
      } else {
        res.status(404).json({message: "The iksf with the specified ID does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Could not get iksf"})
    })
})

router.put('/:id', (req, res) =>{
  Iksf.update(req.body, req.params.id)
  .then(iksf =>{
    if (iksf) {
      res.json(iksf)
    } else {
      res.status(404).json({message: "Iksf with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Could not update iksf"})
  })
})

router.delete('/:id', (req, res) =>{
  Iksf.remove(req.params.id)
  .then(iksf =>{
    if (iksf) {
      res.json({message: "Iksf removed"})
    } else {
      res.status(404).json({message: "Iksf with specified ID does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Iksf could not be removed"})
  })
})

module.exports = router;