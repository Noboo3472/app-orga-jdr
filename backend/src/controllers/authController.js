import prisma from "../db.js"
import creerCompte from "../services/authServices.js"
import jwt from "jsonwebtoken"

export const creerCompteController = async(req,res) =>{
    try{
        const {email, password} = req.body;
        const compteExistant = await prisma.user.findUnique({
            where :{email}
        });
        if (compteExistant){
            return res.status(400).json({message : `Utilisateur déjà existant`});
        };
        const dataUtilisateur = await creerCompte(email,password)
        const nouvelUtlisateur = await prisma.user.create({data : dataUtilisateur});

        const token = jwt.sign({id:nouvelUtlisateur.id}, process.env.JWT_secret,{expiresIn:'1h'});
        res.status(201).json({
            token,
            id : nouvelUtlisateur.id,
            email : nouvelUtlisateur.email
        });
    }catch(error){
        throw res.status(500).json({error:error.message})
    }
};