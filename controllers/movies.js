const sql = require('../services/db')

async function getMovies() {
    try {
        const result = await sql`SELECT film_id, title, description, rental_rate FROM film`;
        return result;
    } catch (error) {
        throw new Error('Error fetching movies: ' + error.message);
    }
}

async function getMovieById(id) {
    try {
        const result = await sql`SELECT film_id, title, description, rental_rate FROM film WHERE film_id = ${id}`;
        return result[0];
    } catch (error) {
        throw new Error('Error fetching movie: ' + error.message);
    }
}

async function createMovie(title, description, rental_rate) {
    try {
        const result = await sql`INSERT INTO film (title, description, rental_rate, language_id) VALUES (${title}, ${description}, ${rental_rate}, 1) RETURNING *`;
        return result[0];
    } catch (error) {
        throw new Error('Error creating movie: ' + error.message);
    }
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie
}