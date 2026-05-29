import {prisma} from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//fonction pour s'inscrire
export const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).json({message: "L'utilisateur existe déjà"});
        }
        // Hash du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Créer un nouvel utilisateur
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
        res.status(201).json({status: "Utilisateur créé avec succès", data:{user:{id: user.id, name: user.name, email: user.email}}});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur du serveur"});
    }
};

//fonction pour se connecter
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            return res.status(400).json({message: "Email ou mot de passe incorrect"});
        }
        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Email ou mot de passe incorrect"});
        }
        //Vérifier le secret de JWT
        const token = generateToken(user.id,res);
        res.status(201).json({status: "Connexion réussie", data:{user:{id: user.id, name: user.name, email: user.email}, token}});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur du serveur"});
    }
};

//fonction pour se déconnecter
export const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        expires: new Date(0)}
    );
    res.status(200).json({message: "Déconnexion réussie"});
};
