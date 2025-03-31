const Profile = require('./model');

// Récupérer tous les profils
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Récupérer un profil par ID
exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Créer un nouveau profil
exports.createProfile = async (req, res) => {
    try {
        const newProfile = new Profile({ name: req.body.name, email: req.body.email });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Mettre à jour un profil
exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id, { name: req.body.name, email: req.body.email }, { new: true }
        );
        if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Supprimer un profil (soft-delete)
exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findByIdAndDelete(req.params.id);
        res.json({ message: 'Profil supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ajouter une expérience
exports.addExperience = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
        
        profile.experience.push(req.body);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer une expérience
exports.removeExperience = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });

        profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.exp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
