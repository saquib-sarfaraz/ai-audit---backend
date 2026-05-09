const express = require('express');
const { generateAudit } = require('../controllers/auditController');

const router = express.Router();

router.post('/', generateAudit);

module.exports = router;
