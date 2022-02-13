const express = require('express');
const app = express();
const ratings = require('./data/ratings');

app.set('port', process.env.PORT || 7000);

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
  const id = Date.now();
  const { user_id, movie_id, rating } = request.body;
  const requiredProperties = ['user_id', 'movie_id', 'rating'];
  // do a bunch of checks before pushing
  // see if there is an existing match for user id and movie idea
  // if yes: update the existing rating object with the new rating number
  // if no: push a new rating into locals.ratings
  for (let property of requiredProperties) {
    if(!property || typeof property !== 'number') {
      return response.status(422).json({
        message: 'You are missing a required parameter'
      })
    }
  }
  if (!user_id || !movie_id || !rating || user) {
    return response.status(422).json({
      message: 'You are missing a required parameter'
    })
  }
  app.locals.ratings.push({ id, user_id, movie_id, rating });

  // probably need a response for an error???

  response.status(201).json({ id, user_id, movie_id, rating })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
