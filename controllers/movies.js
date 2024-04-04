const sql = require('../services/db')

async function getMovies() {
    try {
        const result = await sql`SELECT film_id, title, description, rental_rate FROM film`;
        return result;
    } catch (error) {
        throw new Error('Error fetching movies: ' + error.message);
    }
}

module.exports = {
    getMovies
}