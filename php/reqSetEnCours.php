<?php
require_once('connexion.inc.php');

// Fonction pour définir la séquences en tant que séquences active

function reqSetEnCours() {
    $cnn = getConnexion('messequencescubeled');
    // id est l'id de la séquence
    $id = $_POST['numero_tblBiblioDeSequence'];

    // Requête pour supprimer la séquence en cours actuelle
    $stmta = $cnn->prepare('DELETE FROM tblEnCours');
    $stmta->execute();

    // Requête pour ajoutée une entrée dans la base de données avec l'id de la séquence
    $stmtb = $cnn->prepare('INSERT INTO tblEnCours (num_tblBiblioDeSequences) VALUES (:numero_tblBiblioDeSequence)');
    $stmtb->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmtb->execute();
}

echo reqSetEnCours();

?>