const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ratings = require('./data/ratings');

app.set('port', process.env.PORT || 7000);

app.use(bodyParser.json());

app.locals = {
  title: 'Rancid Tomatillo ratings API',
  ratings
}

app.get('/api/v1/ratings/:id', (request, response) => {
  const { id } = request.params;

  let requestedRating = ratings.find(rating => rating.id === parseInt(id));

  if(!requestedRating) {
    return response.status(404).json({
      message: `No rating found with an id of ${id}`
    });
  }

  response.status(200).json(requestedRating);
});

app.get('/api/v1/ratings', (request, response) => {
  const ratings = app.locals.ratings;
  response.json({ ratings });
});

app.post('/api/v1/ratings', (request, response) => {
  const { user_id, movie_id, rating } = request.body;
  const existingRating = ratings.find(item => {
    return item.user_id === user_id && item.movie_id === movie_id;
  });

  if (!user_id || !movie_id || !rating) {
    return response.status(422).json({
      message: 'You are missing a required parameter.'
    });
  }

  if (typeof user_id !== 'number' || typeof movie_id !== 'number' || typeof rating !== 'number') {
    return response.status(422).json({
      message: 'Invalid data type. All parameters must be numbers.'
    });
  }

  if (existingRating) {
    ratings.forEach(item => {
      if (item.id === existingRating.id) {
        item.rating = rating
      }
    });

    return response.status(201).json({
      message: `rating ${existingRating.id} has been updated.`
    });
  }

  const id = Date.now();
  app.locals.ratings.push({ id, user_id, movie_id, rating });
  response.status(201).json({ id, user_id, movie_id, rating });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
