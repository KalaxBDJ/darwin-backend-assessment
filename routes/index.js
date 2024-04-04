var express = require('express');
var router = express.Router();
const { getMovies } = require('../controllers/movies')

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const movies = await getMovies();
    // Send the movies as a JSON response
    res.status(200).json({
      status: "ok",
      movies: movies
    });
  } catch (error) {
    // Send an error response if an error occurs
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

module.exports = router;
