<?php

// Script de connexion à la base de données
function getConnexion($database) {
    try {
        $dbh = new PDO('mysql:host=localhost;dbname=' . $database, 'root', '');
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbh->exec("SET CHARACTER SET utf8");
        return $dbh;
    } catch (PDOException $e) {
        echo 'Connection failed: ', $e->getMessage();
    }
}

?>