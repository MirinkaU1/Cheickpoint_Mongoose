// Importation des package requis
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Créer une application Express
const app = express();

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Set the port from environment variables or default to 7000
const PORT = process.env.PORT || 7000;

// Get the MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL;

// Connexion à MongoDB et lancement du serveur
const connectDB = async () => {
    try {
      await mongoose.connect(MONGOURL, {});
      console.log('Base de donnée connectée! Le serveur est lancée au port localhost:${PORT}');
    } catch (err) {
      console.error('Erreur de la connexion:', err);
    }
};

// Schema d'une personne
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// Modèle
const Person = mongoose.model('Personne', personSchema);


// Créer et sauvegarder un enregistrement d'un modèle
const createPerson = async () => {
    try {const person = new Person({
        name: 'Alice',
        age: 25,
        favoriteFoods: ['Pizza', 'Salade']
    });
    await person.save();
    console.log('Personne enregistrée:', person);
    }catch(err) {
    console.error('Echec de l\'enregistrement', err)
    }
};

// Créer de nombreux enregistrements avec model.create()
const createPeople = async () => {
    try { const arrayOfPeople = [
        { name: 'John', age: 30, favoriteFoods: ['Burger', 'Frites'] },
        { name: 'Mary', age: 22, favoriteFoods: ['Salade', 'Pattes'] },
        { name: 'Marc', age: 28, favoriteFoods: ['Pizza', 'Garba'] }
    ];
    await Person.create();
        console.log('Personnes enregistrées:', arrayOfPeople);
    }catch (err) {
        console.error('Echec de l\'enregistrement', err);
    }
};

// Trouver toutes les personnes portant un prénom donné (John)
const findPeopleByName = async (personName) => {
    try { const people = await Person.find({ name: personName });
        console.log('Personne trouvée:', people);
    }catch (err) {
        console.error('Personne non trouvée',err);
    }
};

// Trouver une personne par aliment favori (Pizza)
const findOneByFood = async (food) => {
    try { const people = await Person.findOne({ favoriteFoods: food });
        console.log('Personne trouvée:', people);
    }catch (err) {
        console.error('Personne non trouvée', err);
    }
};

// Trouver une personne par _id (Alice)
const findPersonById = async (personId) => {
    try { const people = await Person.findById(personId);
        console.log('Personne trouvée par l\'ID:', people);
    }catch (err) {
        console.error(err);
    }
};

// Effectuez des mises à jour classiques en exécutant Rechercher, Modifier, puis Enregistrer
const updateFavoriteFood = async (personId) => {
    try { const people = await Person.findById(personId);
        if (!people) throw new Error('Personne introuvable');
        people.favoriteFoods.push('Hamburger');
        const updatedPerson = await people.save();
        console.log('Informations mise à jour:', updatedPerson);
        } catch (err) {
        console.error('Echec de la mise à jour', err);
    }
};
  
// Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
const updatePersonAge = async (personName) => {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
      console.log('Informations mises à jour:', updatedPerson);
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
    }
};

// Supprimer un document à l'aide de model.findByIdAndRemove
const removePersonById = async (personId) => {
    try {
      const removedPerson = await Person.findByIdAndDelete(personId);
      if (!removedPerson) throw new Error('Personne introuvable');
      console.log('Personne supprimée:', removedPerson);
    } catch (err) {
      console.error('Echec de la suppression:', err);
    }
};

// Supprimer de nombreux documents avec model.remove() (Marie)
const removePeopleByName = async (personName) => {
    try {
        const result = await Person.deleteMany({ name: personName });
        console.log('Personne(s) supprimée(s):', result.deletedCount); // Affiche le nombre de documents supprimés
    } catch (err) {
        console.error('Erreur lors de la suppression:', err);
    }
};

//Rechercher des personnes aimant les burritos et trier les résultats
const findAndSortPeople = async () => {
    try {
        const people = await Person.find({ favoriteFoods: 'Pizza' })
            .sort({ name: 1 })
            .limit(2)
            .select('-age');
        console.log('Personne trouvé', people);
        } catch (err) {
        console.error('Erreur dans la recherche:', err);
    }
};

// Test de la base de donnée
const main = async () => {
    await connectDB();
    await createPerson();
    await createPeople();
    await findPeopleByName('John');
    await findOneByFood('Pizza');
    await findPersonById('66b8f707dd7d58fc88ca0118');
    await updateFavoriteFood('66b8fa30f4882a8751f12e74');
    await updatePersonAge('John');
    await removePersonById('66b8fa30f4882a8751f12e76');
    await removePeopleByName('Mary');
    await findAndSortPeople();
};
main();