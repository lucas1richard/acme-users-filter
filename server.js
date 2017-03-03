const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const db = require('./db');
const path = require('path');

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifEquals(val1, val2, options) {
      if (val1 === val2) return options.fn(this);
      return options.inverse(this);
    }
  }
});

db.seed()
  .then(() => db.models.Users.getMap())
  .then(_map => { map = _map; })
  .then(() => app.use('/', require('./controllers/')));


const port = process.env.PORT || 3000;
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);

app.use('/public', express.static(path.join(__dirname, '/node_modules')));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
