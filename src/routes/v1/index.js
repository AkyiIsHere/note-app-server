const router = require('express').Router();
const noteRoutes = require('./note.route');
const authRoutes = require('./auth.route')

router.use('/notes', noteRoutes);
router.use('/auth', authRoutes);

module.exports = router