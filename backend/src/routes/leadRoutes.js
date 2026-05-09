const express = require('express');
const { captureLead } = require('../controllers/leadController');

const router = express.Router();

router.post('/', captureLead);

module.exports = router;
