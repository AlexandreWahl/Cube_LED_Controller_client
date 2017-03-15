<?php
require_once('connexion.inc.php');

// Fonction pour la suppression des fonctions et des paramètres

function reqDeleteSequenceFonctions() {
    $cnn = getConnexion('messequencescubeled');
    // id est l'id de la séquence à "clear"
    $id = $_POST['numero_tblBiblioDeSequence'];

    // Requête pour récuperer les entrées dans tblSequences en lien avec l'id passé en paramètre
    $stmta = $cnn->prepare('SELECT numero FROM tblSequences WHERE num_tblBiblioDeSequences = :numero_tblBiblioDeSequence');
    $stmta->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmta->execute();

    while ($row = $stmta->fetch(PDO::FETCH_OBJ)) {
        // Requête pour supprimer toutes les entrées dans la table tblParametres
        $stmtb = $cnn->prepare('DELETE FROM tblParametres WHERE num_tblSequences = :numero_tblSequences');
        $stmtb->bindValue(':numero_tblSequences', $row->numero, PDO::PARAM_INT);
        $stmtb->execute();
    }

    // Requête pour supprimer toutes les entrées dans la table tblSequences
    $stmtc = $cnn->prepare('DELETE FROM tblSequences WHERE num_tblBiblioDeSequences = :numero_tblBiblioDeSequence');
    $stmtc->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmtc->execute();
}

echo reqDeleteSequenceFonctions();

?>