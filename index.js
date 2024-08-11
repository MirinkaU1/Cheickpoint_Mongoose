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
mongoose.connect(MONGOURL).then(() => {
  console.log("Base de donnée connectée avec succès.");
  app.listen(PORT, () => {
    console.log(`Le serveur s'exécute sur le port ${PORT}`);
  });
});

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
}};
// createPerson();

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
    }};
// createPeople();

// Trouver toutes les personnes portant un prénom donné (John)
const findPeopleByName = async (personName) => {
    try { const people = await Person.find({ name: personName });
        console.log('Personne trouvée:', people);
    }catch (err) {
        console.error('Personne non trouvée',err);
    }};
// findPeopleByName('John');

// Trouver une personne par aliment favori (Pizza)
const findOneByFood = async (food) => {
    try { const people = await Person.findOne({ favoriteFoods: food });
        console.log('Personne trouvée:', people);
    }catch (err) {
        console.error('Personne non trouvée', err);
    }};
// findOneByFood('Pizza');

// Trouver une personne par _id (Alice)
const findPersonById = async (personId) => {
    try { const people = await Person.findById(personId);
        console.log('Personne trouvée par l\'ID:', people);
    }catch (err) {
        console.error(err);
    }};
// findPersonById('66b8f707dd7d58fc88ca0118');


// Effectuez des mises à jour classiques en exécutant Rechercher, Modifier, puis Enregistrer
const updateFavoriteFood = async (personId) => {
    try { const people = await Person.findById(personId);
        person.favoriteFoods.push('Hamburger');
            try { await people.save();
                console.log('Informations mise à jour:', people);
            }catch(err) {
                console.error('Echec de la mise à jour', err);}
    }catch (err) {
        console.error(err);
    }};
updateFavoriteFood('66b8f707dd7d58fc88ca0118');
  
// // Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
// const updatePersonAge = (personName) => {
//     Person.findOneAndUpdate(
//         { name: personName },
//         { age: 20 },
//         { new: true },
//         (err, updatedPerson) => {
//             if (err) console.error(err);
//             else console.log('Informations mise à jour:', updatedPerson);
//         }
//         );
//     };
  
// updatePersonAge('John');

// // Supprimer un document à l'aide de model.findByIdAndRemove
// const removePersonById = (personId) => {
//     Person.findByIdAndRemove(personId, (err, removedPerson) => {
//         if (err) console.error(err);
//         else console.log('Personne supprimée:', removedPerson);
//     });
// };
  
// removePersonById('id_de_la_personne');

// // Supprimer de nombreux documents avec model.remove() (Marie)
// const removePeopleByName = (personName) => {
//     Person.remove({ name: personName }, (err, result) => {
//       if (err) console.error(err);
//       else console.log('Personne supprimée:', result);
//     });
// };
  
// removePeopleByName('Mary');

// //Rechercher des personnes aimant les burritos et trier les résultats
// const findAndSortPeople = () => {
//     Person.find({ favoriteFoods: 'Burritos' })
//     .sort({ name: 1 })
//     .limit(2)
//     .select('-age')
//     .exec((err, people) => {
//         if (err) console.error(err);
//         else console.log('ersonne trouvée:', people);
//     });
// };
  
// findAndSortPeople();