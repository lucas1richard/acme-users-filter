const router = require('express').Router();
const db = require('../db');
const Users = db.models.Users;

router.get('/', (req, res, next) => {
  let map;
  Users.getMap()
    .then(_map => {
      map = _map;
      return Users.getByLetter();
    })
    .then(users => res.render('index', { map, users, letter: 'All' }))
    .catch(err => next(err));
});

router.get('/users/filter/:letter', ((req, res, next) => {
  let map;
  Users.getMap()
    .then(_map => {
      map = _map;
      return Users.getByLetter(req.params.letter);
    })
    .then(users => res.render('index', { map, users, letter: req.params.letter }))
    .catch(err => next(err));
}));

router.post('/regenerate', (req, res, next) => {
  Users.regenerateUsers().then(() => res.redirect('/'));
});

module.exports = router;

