<?php
require_once('connexion.inc.php');

// Fonction pour obtenir toutes les fonctions et les valeurs de leurs paramètres qui appartiennent à une séquence

function reqGetFonctionsParametres() {
    $cnn = getConnexion('messequencescubeled');

    $aFonctions[] = [
        "numero" => 0,
        "nom" => "",
        "num_Fonc" => 0,
        "nbParam" => 0,
        "params" => []
    ];

    // id est l'id de la séquence
    $id = $_POST['numero_tblBiblioDeSequence'];
    $i = 0;

    // Requête pour obtenir le numero de l'entrée faisant le lien entre la fonction et la séquence dans tblSequences
    $stmta = $cnn->prepare('SELECT numero, num_tblFonctions FROM tblSequences WHERE num_tblBiblioDeSequences = :numero_tblBiblioDeSequence ORDER BY numero ASC');
    $stmta->bindValue(':numero_tblBiblioDeSequence', $id, PDO::PARAM_INT);
    $stmta->execute();

    // Ajout des résultats dans le tableau final
    while ($row = $stmta->fetch(PDO::FETCH_OBJ)) {
        $aFonctions[$i]["numero"] = $row->numero;
        $aFonctions[$i]["num_Fonc"] = $row->num_tblFonctions;
        $i++;
    }

    for($j = 0; $j < $i; $j++) {
        // Pour chaque fonction trouvée on récupère ce dont on a besoin (nom, nbrParametre)
        $stmtb = $cnn->prepare('SELECT nom, nbrParametre FROM tblFonctions WHERE numero = :num_tblFonc');
        $stmtb->bindValue(':num_tblFonc', $aFonctions[$j]['num_Fonc'], PDO::PARAM_INT);
        $stmtb->execute();

        while ($row = $stmtb->fetch(PDO::FETCH_OBJ)) {
            $aFonctions[$j]["nom"] = $row->nom;
            $aFonctions[$j]["nbParam"] = $row->nbrParametre;
        }
    }

    // Une fois que l'on connait le nombre de paramètres on peut récupérer les valeurs dans la base de données
    for($k = 0; $k < $i; $k++) {
        $size = $aFonctions[$k]["nbParam"];
        if ($size > 0) {
            for ($l = 0; $l < $size; $l++) {
                $stmtc = $cnn->prepare('SELECT valeur FROM tblParametres WHERE num_tblSequences = :num_tblSeq AND pos = :pos');
                $stmtc->bindValue(':num_tblSeq', $aFonctions[$k]['numero'], PDO::PARAM_INT);
                $stmtc->bindValue(':pos', $l, PDO::PARAM_INT);
                $stmtc->execute();

                while ($row = $stmtc->fetch(PDO::FETCH_OBJ)) {
                    $aFonctions[$k]["params"][$l] = $row->valeur;
                }
            }
        } else {
            $aFonctions[$k]["params"] = [];
        }
    }

    // Si au moins une ligne est traitée on retourne un tableau encodé en JSON sinon on retourne "empty"
    if($aFonctions[0]["num_Fonc"] == 0)
        return "empty";
    else
        return json_encode($aFonctions);
}

echo reqGetFonctionsParametres();

?>