<?php
require_once('connexion.inc.php');

// Fonction pour l'ajout d'une fonction et de ses paramètres à la base de données

function reqAddFonctionsIDSequence() {
    $cnn = getConnexion('messequencescubeled');

    // seqNum est le numéro de la séquence à laquelle on ajoute la fonction
    $seqNum = $_POST['seqNum'];
    // npParam est le nombre de paramètre que demande la fonction à ajouter
    $nbParam = $_POST['nbParam'];
    // foncNum est le numéro de la fonction à ajouter
    $foncNum = $_POST['foncNum'];
    // valeurParam est un tableau qui contient les valeurs des paramètres à rentrer dans la base de données
    $valeurParam = $_POST['valeurParam'];

    // Requête pour l'ajout du lien entre la séquence et la fonction dans la table tblSequences
    $stmta = $cnn->prepare('INSERT INTO tblSequences (num_tblFonctions, num_tblBiblioDeSequences) VALUES (:foncNum, :seqNum)');
    $stmta->bindValue(':foncNum', $foncNum, PDO::PARAM_INT);
    $stmta->bindValue(':seqNum', $seqNum, PDO::PARAM_INT);
    $stmta->execute();

    // Récupère l'id du lien séquence/fonction créer ci-dessus
    $id = $cnn->lastInsertId();

    if($nbParam > 0) {
        for ($i = 0; $i < $nbParam; $i++) {
            // Requête qui ajoute un entrée dans la base de données pour chaque paramètre
            $stmtb = $cnn->prepare('INSERT INTO tblParametres (pos, valeur, num_tblSequences) VALUES (:posParam, :valeurParam, :seqID)');
            $stmtb->bindValue(':posParam', $i, PDO::PARAM_INT);
            $stmtb->bindValue(':valeurParam', $valeurParam[$i], PDO::PARAM_STR);
            $stmtb->bindValue(':seqID', $id, PDO::PARAM_INT);
            $stmtb->execute();
        }
    }
}

echo reqAddFonctionsIDSequence();
?>