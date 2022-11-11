const router = require('express').Router();
const userRoutes = require('./userRoutes');
const familyRoutes = require('./familyRoutes');
const choreRoutes = require('./choreRoutes');

router.use('/user', userRoutes);
router.use('/family', familyRoutes);
router.use('/chore', choreRoutes);

module.exports = router;
