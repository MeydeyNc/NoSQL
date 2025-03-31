const express = require('express');
const router = express.Router();
const profileRoutes = require('./api/profiles/index');

router.use('/api', profileRoutes);

module.exports = router;
