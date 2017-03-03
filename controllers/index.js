const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res, next) => {
  let map;
  db.models.Users.getMap()
    .then(_map => {
      map = _map;
      return db.models.Users.getByLetter();
    })
    .then(users => res.render('index', { map, users, letter: 'All' }))
    .catch(err => next(err));
});

router.get('/users/filter/:letter', ((req, res, next) => {
  let map;
  db.models.Users.getMap()
    .then(_map => {
      map = _map;
      return db.models.Users.getByLetter(req.params.letter);
    })
    .then(users => res.render('index', { map, users, letter: req.params.letter }))
    .catch(err => next(err));
}));

router.post('/regenerate', (req, res, next) => {
  db.seed().then(() => res.redirect('/'));
});

module.exports = router;

