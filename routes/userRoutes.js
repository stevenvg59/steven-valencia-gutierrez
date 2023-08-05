const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //Not necessary for now
const session = require('express-session');
const flash = require('express-flash');
const passport = require("passport");

const initializePassport = require('../passport-config');

initializePassport(passport);

const pool = require('../dbConfig');

router.use(flash());
router.use(session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

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
    res.render('dashboard', { user: req.user.name });
});

router.get("/users/logout", (req, res) => {
    req.logout();
    console.log("Bye");
    res.render("index", { message: "You have logged out successfully" });
    res.redirect("login");
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

        //NO HASHED PASSWORDS FOR NOW...
        //const hashedPassword = await bcrypt.hash(password, 10);

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
                        RETURNING id, password`, [name, email, password], (err, results) => {
                            if (err){
                                throw err
                            }

                            req.flash("success_msg", "Registro con exito. Please log in");
                            res.redirect("/users/login");
                            console.log(results.rows);
                        }
                    )
                }
            }
        )


    }

});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
}));

module.exports = router;