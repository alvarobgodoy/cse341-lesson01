const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => {
  console.log('Getting all contacts...');

  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleContact = async (req, res, next) => {
  console.log('Getting single contact...');

  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res, next) => {
  console.log('Creating new contact...');

  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const insertResult = await mongodb.getDb().db().collection('contacts').insertOne(newContact);

  res.setHeader('Content-Type', 'application/json');
  if (insertResult.acknowledged) {
    res.status(201).json(insertResult);
  } else {
    res.status(500).json(insertResult.error);
  }
};

const updateContact = async (req, res, next) => {
  console.log('Updating contact...');

  const contactId = new ObjectId(req.params.id);
  let newContactInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  // Eliminate any null/underfined attributes
  newContactInfo = Object.fromEntries(Object.entries(newContactInfo).filter(([_, v]) => v != null));

  const updateResult = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .updateOne({ _id: contactId }, { $set: newContactInfo });

  res.setHeader('Content-Type', 'application/json');
  if (updateResult.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(updateResult.error);
  }
};

const deleteContact = async (req, res, next) => {
  console.log('Deleting contact...');

  const contactId = new ObjectId(req.params.id);

  const deleteResult = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: contactId });

  res.setHeader('Content-Type', 'application/json');
  if (deleteResult.acknowledged) {
    res.status(204).json(deleteResult);
  } else {
    res.status(500).json(deleteResult.error);
  }
};

module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact };
