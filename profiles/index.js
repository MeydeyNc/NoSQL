const express = require('express');
const router = express.Router();
const Profile = require('./model');
const profileController = require('./controller');
const connectDB = require('./config/mongodb');
const routes = require('./routes');

// Routes CRUD
router.get('/profiles', profileController.getAllProfiles);
router.get('/profiles/:id', profileController.getProfileById);
router.post('/profiles', profileController.createProfile);
router.put('/profiles/:id', profileController.updateProfile);
router.delete('/profiles/:id', profileController.deleteProfile);

// Routes pour expériences et compétences
router.post('/profiles/:id/experience', profileController.addExperience);
router.delete('/profiles/:id/experience/:exp', profileController.removeExperience);
router.post('/profiles/:id/skills', profileController.addSkill);
router.delete('/profiles/:id/skills/:skill', profileController.removeSkill);
router.put('/profiles/:id/information', profileController.updateInformation);

module.exports = router;



const app = express();
app.use(express.json());
app.use(routes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
