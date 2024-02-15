const pool = require('../../db');
const queries = require('./queries');

const login = (req, res) => {
    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
        return res.status(400).json({ error: 'Phone number and password are required' });
    }

    pool.query(queries.login, [phone_number, password], (error, result) => {
        if (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid phone number or password' });
        }
        const user = result.rows[0];
        res.status(200).json(user);
    });
};

const signup = (req, res) => {
    const { username, phone_number, password } = req.body;
    if (!username || !phone_number || !password) {
        return res.status(400).json({ error: 'Username, phone number, and password are required' });
    }

    // Check if the user already exists
    pool.query(queries.getUserByPhoneNumber, [phone_number], (error, result) => {
        if (error) {
            console.error('Error checking existing user during signup:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // If the user doesn't exist, proceed with signup
        pool.query(queries.signup, [username, phone_number, password], (error, result) => {
            if (error) {
                console.error('Error signing up user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            const newUser = result.rows[0];
            res.status(201).json(newUser);
        });
    });
};
const getUser = (req, res) => {
    pool.query(queries.getUsers, (error, result) => {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(result.rows);
    });
};

const getMovies = (req, res) => {
    pool.query(queries.getMovies, (error, result) => {
        if (error) {
            console.error('Error fetching movies:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(result.rows);
    });
};

const getReviews = (req, res) => {
    pool.query(queries.getReviews, (error, result) => {
        if (error) {
            console.error('Error fetching reviews:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(result.rows);
    });
};

const getUserByID = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
  }

  pool.query(queries.getUserByID, [id], (error, result) => {
      if (error) {
          console.error('Error fetching user by ID:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(result.rows);
  });
};
  

const getMovieByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getMovieByID, [id], (error, result) => {
        if (error) {
            console.error('Error fetching movie by ID:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(result.rows);
    });
};

const getReviewByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getReviewByID, [id], (error, result) => {
        if (error) {
            console.error('Error fetching review by ID:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(result.rows);
    });
};

const addUser = (req, res) => {
    const { username, phone_number, password } = req.body;

    pool.query(queries.addUser, [username, phone_number, password], (error, results) => {
        if (error) {
            console.error('Error adding user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).send("User added successfully");
    });
};

const addMovie = (req, res) => {
    const {
        name, rate, like, genre, PG, summary, duration, date, director, producer, actors, views, Poster
    } = req.body;

    pool.query(queries.addMovie, [name, rate, like, genre, PG, summary, duration, date, director, producer, actors, views, Poster], (error, results) => {
        if (error) {
            console.error('Error adding movie:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).send("Movie added successfully");
    });
};

const addReview = (req, res) => {
    const { username, phone_number, password } = req.body;

    pool.query(queries.addReview, [username, phone_number, password], (error, results) => {
        if (error) {
            console.error('Error adding review:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).send("Review added successfully");
    });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.deleteUser, [id], (error, result) => {
        if (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).send("User deleted successfully");
    });
};

const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.deleteMovie, [id], (error, result) => {
        if (error) {
            console.error('Error deleting movie:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).send("Movie deleted successfully");
    });
};

const deleteReview = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.deleteReview, [id], (error, result) => {
        if (error) {
            console.error('Error deleting review:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).send("Review deleted successfully");
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { username } = req.body;

    pool.query(queries.updateUser, [username, id], (error, result) => {
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).send("User updated successfully");
    });
};

const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.updateMovie, [name, id], (error, result) => {
        if (error) {
            console.error('Error updating movie:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).send("Movie updated successfully");
    });
};

const updateReview = (req, res) => {
    const id = parseInt(req.params.id);
    const { username } = req.body;

    pool.query(queries.updateReview, [username, id], (error, result) => {
        if (error) {
            console.error('Error updating review:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).send("Review updated successfully");
    });
};

module.exports = {
    getUser,
    getMovies,
    getReviews,
    getUserByID,
    getMovieByID,
    getReviewByID,
    addUser,
    addMovie,
    addReview,
    deleteUser,
    deleteMovie,
    deleteReview,
    updateUser,
    updateMovie,
    updateReview,
    login, signup,
};
