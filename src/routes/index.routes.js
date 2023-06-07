const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout, renderHome, renderMylabs, renderhisto } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/home", renderHome);
router.get("/Mylabs", renderMylabs);
router.get("/histo", renderhisto);

module.exports = router;
