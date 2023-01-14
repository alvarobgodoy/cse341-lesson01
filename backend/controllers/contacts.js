const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => {
  console.log('No parameters, sending the full list...')
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
});
};

const getSingleContact = async (req, res, next) => {
  console.log('Parameter found, checking id and sending contact...')
  let contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((lists) => {
    console.log(lists)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAllContacts, getSingleContact };
