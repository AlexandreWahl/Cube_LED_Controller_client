// Chemin vers le dossier contenant les fichier PHP
var path = "/Cube_LED/php/";

/**********************************************************************************************************************/

// Requête au serveur PHP pour récuperer la liste des fonctions disponibles
// Retourne un objet JSON contenant les fonctions (nom, explciation, nombre de paramètres)
function reqGetFonctions() {
    return $.ajax({
        url: path + "reqGetFonctions.php",
        type: "POST",
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

// Requête au serveur PHP pour récuperer la liste des séquences disponibles
// Retourne un objet JSON contenant les séquences (nom, auteur, description)
function reqGetSequences() {
    return $.ajax({
        url: path + "reqGetSequences.php",
        type: 'POST',
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

// Requête au serveur PHP pour récuperer les infos sur une séquence
// Retourne un objet JSON contenant nom, auteur et description
// Paramètre d'entrée : id de la séquence demandée
function reqGetSequenceByID(id) {
    return $.ajax({
        url: path + "reqGetSequenceByID.php",
        type: "POST",
        data: {numero_tblBiblioDeSequence : id},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

// Requête au serveur PHP pour récuperer les fonctions liées à une séquence
// Retourne un objet JSON contenant les fonctions et leur infos (numero, nom, explication, nbrParametre)
// Paramètre d'entrée : id de la séquence demandée
function reqGetFonctionsIDSequence(id) {
    return $.ajax({
        url: path + "reqGetFonctionsIDSequence.php",
        type: "POST",
        data: {numero_tblBiblioDeSequence : id},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

// Requête au serveur PHP pour récuperer les fonctions et leurs paramètres
// Retourne un objet JSON contenant les fonctions et les paramètres (numero, nom, explication, nbrParametre)
// Paramètre d'entrée : id de la séquence demandée
function reqGetFonctionsParametres(id) {
    return $.ajax({
        url: path + "reqGetFonctionsParametres.php",
        type: "POST",
        data: {numero_tblBiblioDeSequence : id},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/**********************************************************************************************************************/

// Requête au serveur PHP pour ajouter une séquence
// Paramètres d'entrée : nom, auteur, desc
function reqAddSequence(nom, auteur, desc) {
    return $.ajax({
        url: path + "reqAddSequence.php",
        type: "POST",
        data: {nom : nom, auteur : auteur, desc : desc},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

// Requête au serveur PHP pour ajouter une fonction à une séquence
// Paramètres d'entrée : id de la séquence, id de la fonction, position du paramètre, valeur du paramètre
function reqAddFonctionsIDSequence(seqNum, nbParam, foncNum, valeurParam) {
    $.ajax({
        url: path + "reqAddFonctionsIDSequence.php",
        type: "POST",
        data: {seqNum : seqNum, nbParam : nbParam, foncNum : foncNum, valeurParam : valeurParam},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/**********************************************************************************************************************/

// Requête au serveur PHP pour supprimer une séquence et tous les liens qu'elle à dans la BD
// Paramètre d'entrée : id de la séquence demandée
function reqDeleteSequence(id) {
    return $.ajax({
        url: path + "reqDeleteSequence.php",
        type: "POST",
        data: {numero_tblBiblioDeSequence : id},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

// Requête au serveur PHP pour supprimer toutes les liaisons entre une séquences et des fonctions sans supprimer la séquence
// Paramètre d'entrée : id de la séquence demandée
function reqDeleteSequenceFonctions(id) {
    return $.ajax({
        url: path + "reqDeleteSequenceFonctions.php",
        type: "POST",
        data: {numero_tblBiblioDeSequence : id},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/**********************************************************************************************************************/

// Requête au serveur PHP pour définir la séquence qui doit être jouée sur le cube
// Paramètre d'entrée : id de la séquence demandée
function reqSetEnCours(id) {
    $.ajax({
        url: path + "reqSetEnCours.php",
        type: "POST",
        data: {numero_tblBiblioDeSequence : id},
        error: function() {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/**********************************************************************************************************************/