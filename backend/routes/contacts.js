const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

router.get('/', contactsController.getData);
// localhost:8080/contacts/
module.exports = router;
