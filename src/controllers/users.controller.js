const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password,course, claveregistro } = req.body;
  //clave de registro para no permitir registros no deseados
  if (claveregistro != "Lablovers") {
    errors.push({ text: "Clave de registro no coincide" });
  }
  if (password != confirm_password) {
    errors.push({ text: "La clave ingresada es incorrecta." });
  }
  if (password.length < 6) {
    errors.push({ text: "La contraseña debe contener mas de 6 carácteres." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      claveregistro,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo ya está en uso.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password, course });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "El registro se ha realizado con éxito.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Haz finalizado tu sesión.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;