<?php
require_once('connexion.inc.php');

// Fonction pour la suppression d'une séquence dans la base de données

function reqDeleteSequence() {
    $cnn = getConnexion('messequencescubeled');
    $aFonctions = [];
    // id est l'id de la séquence à supprimer
    $id = $_POST['numero_tblBiblioDeSequence'];
    $i = 0;

    // Requête pour récupérer toutes les entrées dans la table tblSequences qui sont en lien avec la séquence à supprimer
    $stmta = $cnn->prepare('SELECT numero FROM tblSequences WHERE num_tblBiblioDeSequences = :numero_tblBiblioDeSequence');
    $stmta->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmta->execute();

    while ($row = $stmta->fetch(PDO::FETCH_OBJ)) {
        // aFonctions va contenir tous les id à supprimer dans la table tblSequences
        $aFonctions[$i] = $row->numero;
        $i++;
    }

    for($j = 0; $j <= $i; $j++) {
        // Requête pour supprimer toutes les entrées dans tblParametres grâce aux id récupèrés à la première requête
        $stmtb = $cnn->prepare('DELETE FROM tblParametres WHERE num_tblSequences = :numero_tblSequences');
        $stmtb->bindValue(':numero_tblSequences', $aFonctions[$j], PDO::PARAM_INT);
        $stmtb->execute();
    }

    // Requête pour supprimer toutes les entrées dans tblSequence grâce aux id récupèrés à la première requête
    $stmtc = $cnn->prepare('DELETE FROM tblSequences WHERE num_tblBiblioDeSequences = :numero_tblBiblioDeSequence');
    $stmtc->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmtc->execute();

    // Requête pour supprimer la séquence dans tblEnCours
    $stmtd = $cnn->prepare('DELETE FROM tblEnCours WHERE num_tblBiblioDeSequences = :numero_tblBiblioDeSequence');
    $stmtd->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmtd->execute();

    // Requête pour supprimer la séquence dans tblBiblioDeSequences
    $stmte = $cnn->prepare('DELETE FROM tblBiblioDeSequences WHERE numero = :numero_tblBiblioDeSequence');
    $stmte->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmte->execute();

    // Une fois que totues les requêtes ont abouti on retourne "ok"
    return "ok";
}

echo reqDeleteSequence();

?>