/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The Movies managing API
 * /movies:
 *   get:
 *     summary: Lists all the Movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       film_id:
 *                         type: integer
 *                         example: 133
 *                       title:
 *                         type: string
 *                         example: Chamber Italian
 *                       description:
 *                         type: string
 *                         example: A Fateful Reflection of a Moose And a Husband who must Overcome a Monkey in Nigeria
 *                       rental_rate:
 *                         type: string
 *                         example: 4.99
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Chamber Italian
 *               description:
 *                 type: string
 *                 example: A Fateful Reflection of a Moose And a Husband who must Overcome a Monkey in Nigeria
 *               rental_rate:
 *                 type: string
 *                 example: 4.99
 *     responses:
 *       200:
 *         description: The created movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 film_id:
 *                   type: integer
 *                   example: 133
 *                 title:
 *                   type: string
 *                   example: Chamber Italian
 *                 description:
 *                   type: string
 *                   example: A Fateful Reflection of a Moose And a Husband who must Overcome a Monkey in Nigeria
 *                 rental_rate:
 *                   type: string
 *                   example: 4.99
 *       500:
 *         description: Some server error
 * /movies/{id}:
 *   get:
 *     summary: Get a Movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the movie to retrieve
 *     responses:
 *       200:
 *         description: The movie details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 movie:
 *                   type: object
 *                   properties:
 *                     film_id:
 *                       type: integer
 *                       example: 133
 *                     title:
 *                       type: string
 *                       example: Chamber Italian
 *                     description:
 *                       type: string
 *                       example: A Fateful Reflection of a Moose And a Husband who must Overcome a Monkey in Nigeria
 *                     rental_rate:
 *                       type: string
 *                       example: 4.99
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Some server error
 */


var express = require('express');
var router = express.Router();
const { getMovies, getMovieById, createMovie } = require('../controllers/movies')

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.status(200).json({
    status: "ok",
    message: "This is the index route"
  });
});

router.get('/movies', async function (req, res, next) {
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

router.get('/movies/:id', async function (req, res, next) {
  const movieId = req.params.id;
  try {
      const movie = await getMovieById(movieId);
      if (movie) {
          res.status(200).json({
              status: "ok",
              movie: movie
          });
      } else {
          res.status(404).json({
              status: "error",
              message: "Movie not found"
          });
      }
  } catch (error) {
      res.status(500).json({
          status: "error",
          message: error.message
      });
  }
});

router.post('/movies', async (req, res) => {
  try {
    const { title, description, rental_rate } = req.body;
    if (!title || !description || !rental_rate) {
      return res.status(400).json({ status: 'error', message: 'Missing parameters' });
    }
    const movie = await createMovie(title, description, rental_rate);
    res.status(201).json({ status: 'ok', message: 'Movie created successfully', movie });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
