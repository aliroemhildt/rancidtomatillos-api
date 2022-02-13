const express = require('express');
const app = express();
const ratings = require('./data/ratings');

app.set('port', process.env.PORT || 7000);

app.locals = {
  title: 'Rancid Tomatillo ratings API',
  ratings
}

app.get('/api/v1/ratings', (request,response) => {
  response.send(app.locals.ratings)
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
})
