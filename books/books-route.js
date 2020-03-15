const express = require('express');
const router = express.Router();

router.get('/books', function (req, res) {
  res.send('Your books!')
});

module.exports = router;