const db = require('../data/db-config')

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByOrg,
  remove,
  update
};

function find() {
  return db('iksf')
}

function findBy(filter){
  return db('iksf').where(filter);
}

function add(iksf) {
  return db('iksf')
    .insert(iksf)
}

function findById(id) {
  return db('iksf')
    .where({id})
    .first();
}

function findByOrg(org_id) {
  return db('iksf')
    .where({org_id})
}

function remove(id){
  return db('iksf')
    .where({id})
    .del();
}

function update(iksf, id){
  return db('iksf')
    .where({id})
    .update(iksf);
}