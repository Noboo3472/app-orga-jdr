import bcrypt from "bcrypt";

export const creerCompte = async(email, password) =>{
    try{
        const motDePasseHaché = await bcrypt.hash(password,10);
        const nouvelUtilisateur = {
                email,
                password : motDePasseHaché,
                createdAt : new Date()
            }
        return nouvelUtilisateur
    } catch(error){
        throw error;
    }
};