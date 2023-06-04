
//USO del paquete passport para encriptar contraseñas

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); 

//se emplea el email como identificador de usuario, para verficiar que no esté registrado
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Match Email's User
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'El usuario no está en nuestros registros.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'La contraseña es incorrecta.' });
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
