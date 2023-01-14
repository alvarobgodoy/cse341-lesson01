const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
  let urlParameters = req.query;
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');

    if(Object.keys(urlParameters).length === 0) {
      console.log('No parameters, sending the full list...')
      res.status(200).json(lists);
    } else {
      console.log('There are parameters present, checking id and sending corresponding contact')
      let contactId = urlParameters.id;
      let matchedContact = lists.filter(contact => {
        return contact._id.toString() === contactId; 
      })
      res.status(200).json(matchedContact);
    }

});
};

module.exports = { getData };
