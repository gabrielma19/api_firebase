var firebase = require('../config/firebase')
var router = require('express').Router()
var database = firebase.database()

database.goOnline()

function getUsers () {
  return database.ref('/user').once('value')
}

router
  .get('/', function (req, res) {
    getUsers().then(function (snapshot) {
      res.json(snapshot.val())
    })
  })
  .post('/', function (req, res) {
    database.ref('/user').push(req.body)
      .then(function () {
        return res.status(201).send('OK')
      })
  })

router.route('/:id')
      .put(function (req, res) {
        //TODO
      })
      .delete(function (req, res) {
        database.ref('/user').remove(req.params.id)
        .then(function () {
          return res.status()
        })
      })

module.exports = router
