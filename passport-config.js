const LocalStrategy = require('passport-local').Strategy;
const pool = require('./dbConfig');

// const bcrypt = require('bcrypt'); ---> //Not necessary

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        console.log(email, password);
        pool.query(
          `SELECT * FROM users WHERE email = $1`,
          [email],
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log(results.rows);
    
            //Si ese email ya esta registrado...
            if (results.rows.length > 0) {
                const user = results.rows[0];
    

                //NO ENCRYPT PASSWORDS FOR NOW...
              /* bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                  console.log(err);
                }
                if (isMatch) {
                    console.log("Match");
                  return done(null, user);
                } else {
                    console.log("Not match");
                    console.log(password);                   
                    console.log(user.password);
                    console.log(password === user.password);
                  //password is incorrect
                  return done(null, false, { message: "Password is incorrect" });
                }
              }); */

                //...comparamos las contraseñas
                if (password === user.password) {
                    console.log("Match");
                    return done(null, user);
                } else {
                    console.log("Not match");
                    return done(null, false, { message: "Password is incorrect" });
                }


            } else {
              // No user
              return done(null, false, { message: "No user with that email address" });
            }
          }
        );
      };


        passport.use(
            new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            authenticateUser
            )
        );
        /*  Almacena los detalles del usuario dentro de la sesión. serializeUser determina qué datos del 
            objeto  de usuario deben almacenarse en la sesión. El resultado del método serializeUser se adjunta a la sesión como req.session.passport.user = {}. Aquí, por ejemplo, sería (como proporcionamos la identificación de usuario como clave) req.session.passport.user = {id: 'xyz'} */
        passport.serializeUser((user, done) => done(null, user.id));
    
        /*  En deserializeUser esa clave se compara con el array/database en memoria o cualquier recurso.
            El objeto obtenido se adjunta al objeto de solicitud como req.user */
        passport.deserializeUser((id, done) => {
            pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {
                return done(err);
            }
            console.log(`ID is ${results.rows[0].id}`);
            return done(null, results.rows[0]);
            });
        });
}

module.exports = initialize;