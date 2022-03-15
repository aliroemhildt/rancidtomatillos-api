# Rancid Tomatillos User Ratings API

## About 

A RESTful API created to accompany the [Rancid Tomatillos UI](https://github.com/aliroemhildt/rancidtomatillos). This server is written in JavaScript using Express and Node.js. When a user is logged in to the Rancid Tomatillos app, they are able to add a rating to a movie, and the user id, movie id, rating number, and a unique rating id are stored in this API. A few sample data points have been hard-coded into this server. 

View the Heroku deployment [here](https://dashboard.heroku.com/apps/user-ratings-api)

## Set Up

1. clone down this repo
2. `cd` into your local copy
3. run `npm install`
4. run `npm start`

## Technology Used

- JavaScript
- Express
- Node.js
- Heroku

## Endpoints

| Description     | URL             | Method          | Required Properties for Request | Sample Successful Response |
|:----------------|:----------------|:----------------|:----------------|:----------------|
| get all user ratings | https://user-ratings-api.herokuapp.com/api/v1/ratings | GET | none | array containing all user rating objects 
| post new rating | https://user-ratings-api.herokuapp.com/api/v1/ratings | POST | {"user_id": 77, "movie_id": 694919, "rating": 8} | {"id": 1, "user_id": 77, "movie_id": 694919, "rating": 8}
