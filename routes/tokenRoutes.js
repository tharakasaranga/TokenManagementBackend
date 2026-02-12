const express = require('express');
const router = express.Router();
const {createToken,  getTokens,  updateTokenStatus,} = require('../controllers/tokenController');

router.route('/').post(createToken).get(getTokens);    
router.route('/:id').put(updateTokenStatus); 

module.exports = router;