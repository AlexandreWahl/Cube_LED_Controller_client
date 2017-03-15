<?php
require_once('connexion.inc.php');

// Fonction pour obtenir toutes les informations sur une séquence

function reqGetSequenceByID() {
    $cnn = getConnexion('messequencescubeled');
    $oSequence = null;
    // id est l'id de la séquence
    $id = $_POST['numero_tblBiblioDeSequence'];

    // Requête pour récupérer le numero, le nom, l'auteur et la description de la séquence
    $stmt = $cnn->prepare('SELECT numero, nom, auteur, description FROM tblBiblioDeSequences WHERE numero = :numero_tblBiblioDeSequence');
    $stmt->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmt->execute();
    while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $oSequence = $row;
    }

    // Retourne un objet JSON
    return json_encode($oSequence);
}

echo reqGetSequenceByID();

?>