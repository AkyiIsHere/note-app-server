const router = require('express').Router();
const versionOne = require('./v1/index');

router.use('/v1', versionOne);

module.exports = router