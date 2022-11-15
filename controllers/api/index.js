const router = require('express').Router();
const userRoutes = require('./userRoutes');
const familyRoutes = require('./familyRoutes');

router.use('/user', userRoutes);
router.use('/family', familyRoutes);


module.exports = router;