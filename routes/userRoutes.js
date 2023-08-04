const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');

const pool = require('../dbConfig');

router.use(session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
}));

router.use(flash());

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: 'Steven' });
});

router.post('/register', async (req, res) => {
    const {name, email, password, password2 } = req.body;

    //validations
    const errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ message: "Por favor ingresa todos los campos" });
    }
    if (password.length < 6) {
        errors.push({ message: "La contraseña debe tener al menos 6 caracteres" });
    }
    if (password != password2) {
        errors.push({ message: "Contraseñas no coinciden" });
    }
    if (errors.length > 0) {
        res.render("register", { errors });
    } else {

        //after validations
        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query(`SELECT * FROM users WHERE email  = $1`, [email], (err, results) => {
                if (err){
                    throw err
                }

                if (results.rows.length > 0){
                    errors.push({ message: "Email ya registrado"});
                    res.render("register", { errors });
                } else {
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`, [name, email, hashedPassword], (err, results) => {
                            if (err){
                                throw err
                            }

                            req.flash("success_msg", "Registro con exito. Please log in");
                            res.redirect("/users/login");
                        }
                    )
                }
            }
        )


    }



});

module.exports = router;