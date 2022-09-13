const express = require('express');
const { Router } = express;
const router = new Router();
const compression = require('compression');
const InfoController = require('../controllers/Info');
const GeneralInfo = new InfoController()

router.get('/info', compression(), GeneralInfo.Info);
//con child process
router.get('/api/randomsC', GeneralInfo.RandomsChildProccess);
//sin child process
router.get('/api/randoms', GeneralInfo.Randoms);

module.exports = router;