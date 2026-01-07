const mysql = require('mysql2');
require('dotenv').config();

// Create a Pool instead of a single connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hkedurite',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Reusable function using pool.query
const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        // pool.query automatically gets a connection and releases it when done
        pool.query(query, params, (err, results) => {
            if (err) {
                console.error('Database query error:', err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'hkedurite'
// });


// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err.message);
//         process.exit(1); // Exit the process on database connection error
//     }
//     console.log('Connected to MySQL database');
// });


// // Reusable function for executing queries
// const executeQuery = (query, params) => {
//     return new Promise((resolve, reject) => {
//         db.query(query, params, (err, results) => {
//             if (err) {
//                 console.error('Database query error:', err.message);
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// };




module.exports = {
    executeQuery
};