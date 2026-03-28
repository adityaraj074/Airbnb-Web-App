const db = require("../config/db");
const bcrypt = require("bcrypt");

// Create user
const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *",
    [username, email, hashedPassword],
  );
  return result.rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  return result.rows[0];
};

// Find user by username
const findUserByUsername = async (username) => {
  const result = await db.query(
    "SELECT * FROM users WHERE LOWER(username) = LOWER(TRIM($1))",
    [username],
  );
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserByUsername };
