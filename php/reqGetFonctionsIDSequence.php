<?php
require_once('connexion.inc.php');

// Fonction pour obtenir la liste des fonctions qui appartiennent à une séquence (nom, explication, nbParam...etc)

function reqGetFonctionsIDSequence() {
    $cnn = getConnexion('messequencescubeled');
    // id est l'id de la séquence
    $id = $_POST['numero_tblBiblioDeSequence'];
    $aFonctions = [];
    $i = 0;

    // Requête pour récupérer la liste des fonctions liée à la séquence ainsi que les paramètres
    $stmt = $cnn->prepare('SELECT tblFonctions.numero AS num_Fonc, nom, explication, nbrParametre, typeParametre, tblSequences.numero AS num_Seq FROM tblFonctions, tblSequences WHERE tblsequences.num_tblFonctions = tblfonctions.numero AND tblsequences.num_tblBiblioDeSequences = :numero_tblBiblioDeSequence ORDER BY tblSequences.numero ASC');
    $stmt->bindValue(":numero_tblBiblioDeSequence", $id, PDO::PARAM_INT);
    $stmt->execute();
    while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        $aFonctions[$i] = $row;
        $i++;
    }

    // Si au moins une ligne est traitée on retourne un tableau encodé en JSON sinon on retourne "empty"
    if ($stmt->rowCount() > 0) {
        return json_encode($aFonctions);
    } else {
        return 'empty';
    }
}

echo reqGetFonctionsIDSequence();

?>