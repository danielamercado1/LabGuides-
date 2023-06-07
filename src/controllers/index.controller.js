

const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderHome = (req, res) => {
  res.render('home');
};

indexCtrl.renderMylabs= (req, res) => {
    res.render('Mylabs');
};

indexCtrl.renderhisto= (req, res) => {
  res.render('histo');
};
module.exports = indexCtrl;