<?php
require_once('connexion.inc.php');

// Fonction pour l'ajout d'une séquence à la base de données

function reqAddSequence() {
    $cnn = getConnexion('messequencescubeled');

    // nom est le nom de la séquence
    $nom = $_POST['nom'];
    // auteur est le nom de l'auteur de la séquence
    $auteur = $_POST['auteur'];
    // desc est la description de la séquence
    $desc = $_POST['desc'];

    // Requête pour l'ajout de la séquence dans la base de données
    $stmt = $cnn->prepare('INSERT INTO tblBiblioDeSequences (nom, auteur, description) VALUES (:nom, :auteur, :description)');
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':auteur', $auteur, PDO::PARAM_STR);
    $stmt->bindValue(':description', $desc, PDO::PARAM_STR);
    $stmt->execute();

    // Retourne l'id de la séquence créée
    return $cnn->lastInsertId();
}

echo reqAddSequence();
?>