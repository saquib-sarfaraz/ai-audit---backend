const express = require('express');
const { createSummary } = require('../controllers/summaryController');

const router = express.Router();

router.post('/', createSummary);

module.exports = router;
