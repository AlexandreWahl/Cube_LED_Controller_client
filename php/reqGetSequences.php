<?php

header('Access-Control-Allow-Origin: *');

require_once('connexion.inc.php');

// Fonction pour obtenir la liste des séquences

function reqGetSequences() {
    $cnn = getConnexion('messequencescubeled');
    $aSequences = [];
    $i = 0;

    // Requête pour récupérer la liste des séquences
    $stmt = $cnn->prepare('SELECT numero, nom, auteur, description FROM tblBiblioDeSequences');
    $stmt->execute();
    while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $aSequences[$i] = $row;
        $i++;
    }

    // Retourne un tableau au format JSON
    return json_encode($aSequences);
}

echo reqGetSequences();

?>