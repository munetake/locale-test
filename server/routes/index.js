const express = require('express');
const router = express.Router();

router.use('/api/v0/locales', require('./locales'));

module.exports = router;
