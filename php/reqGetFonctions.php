<?php
require_once('connexion.inc.php');

// Fonction pour obtenir la liste des fonctions

function reqGetFonctions() {
    $cnn = getConnexion('messequencescubeled');
    $aFonctions = [];
    $i = 0;

    // Requête pour obtenir la liste des fonctions
    $stmt = $cnn->prepare('SELECT nom, explication, nbrParametre, typeParametre FROM tblFonctions');
    $stmt->execute();
    while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $aFonctions[$i] = $row;
        $i++;
    }

    return json_encode($aFonctions);
}

echo reqGetFonctions();

?>