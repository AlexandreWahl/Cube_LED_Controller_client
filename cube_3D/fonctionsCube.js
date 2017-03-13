// Récupère la taille du cube
var number = getNumber();

// Fonctions qui interverti les couleurs des leds de la couche A et de la couche B
// Paramètre d'entrée : array[2] -> axeSource, axeDestination
function AtoB(axe, toAxe) {
    var tempAxe = [];
    var tempToAxe = [];
    var A, B;
    for (var j = 0; j < number - 1; j++) {
        for (var i = 0; i < number; i++) {
            if(axe == "x" && toAxe == "y") {
                A = leds[i][j][0];
                if(j == 7)
                    B = leds[i][0][0];
                else
                    B = leds[i][j + 1][0];
            } else if(axe == "x" && toAxe == "z") {
                A = leds[i][0][j];
                if(j == 7)
                    B = leds[i][0][0];
                else
                    B = leds[i][0][j + 1];
            } else if(axe == "y" && toAxe == "x") {
                A = leds[j][i][0];
                if(j == 7)
                    B = leds[0][i][0];
                else
                    B = leds[j + 1][i][0];
            } else if(axe == "y" && toAxe == "z") {
                A = leds[0][i][j];
                if(j == 7)
                    B = leds[0][i][0];
                else
                    B = leds[0][i][j + 1];
            } else if(axe == "z" && toAxe == "x") {
                A = leds[j][0][i];
                if(j == 7)
                    B = leds[0][0][i];
                else
                    B = leds[j + 1][0][i];
            } else if(axe == "z" && toAxe == "y") {
                A = leds[0][j][i];
                if(j == 7)
                    B = leds[0][0][i];
                else
                    B = leds[0][j + 1][i];
            }

            if(A.isOff) {
                tempAxe[i] = false;
            } else {
                tempAxe[i] = A.getColor();
            }

            if(B.isOff) {
                tempToAxe[i] = false;
            } else {
                tempToAxe[i] = B.getColor();
            }

            if(tempAxe[i] == false)
                B.turnOff();
            else
                B.setColor(tempAxe[i]);

            if(tempToAxe[i] == false)
                A.turnOff();
            else
                A.setColor(tempToAxe[i]);
        }
    }
}

// Fonctions qui copie les couleurs des leds de la couche A vers la couche B
// Paramètre d'entrée : array[3] -> layerSource, layerDestination, axe
function copieADansBSurAxe(args) {
    var A = parseInt(args[0]);
    var B = parseInt(args[1]);
    var axe = args[2];
    if(A >= 0 && A < number && B >= 0 && B < number && (axe == "x" || axe == "y" || axe == "z")) {
        var i, j;
        switch (axe) {
            case "x" :
                for (i = 0; i < number; i++) {
                    for (j = 0; j < number; j++) {
                        leds[B][i][j].setColor(leds[A][i][j].getColor());
                    }
                }
                break;
            case "y" :
                for (i = 0; i < number; i++) {
                    for (j = 0; j < number; j++) {
                        leds[i][B][j].setColor(leds[i][A][j].getColor());
                    }
                }
                break;
            case "z" :
                for (i = 0; i < number; i++) {
                    for (j = 0; j < number; j++) {
                        leds[i][j][B].setColor(leds[i][j][A].getColor());
                    }
                }
                break;
        }
    } else {
        alert('Paramètres non valides');
    }

    return 0;
}

// Fonctions qui copie les couleurs des leds de la couche A vers la couche B avec un décalage de 1 dans un sens
// Paramètre d'entrée : array[4] -> layerSource, layerDestination, axe, sens
function copieADansBSurAxeAvecDecalageEtSens(args) {
    var A = parseInt(args[0]);
    var B = parseInt(args[1]);
    var axe = args[2];
    var sens = args[3];
    if(A >= 0 && A < number && B >= 0 && B < number && (axe == "x" || axe == "y" || axe == "z") && (sens == "d" || sens == "g")) {
        var x, y, z, t, temparr = [];
        switch (axe) {
            case "x" :
                if(sens == "g") {
                    for (z = 0; z < number; z++) {
                        for (y = 0; y < number; y++) {
                            if(z == 0) {
                                if(leds[A][y][z].isOff)
                                    temparr[y] = false;
                                else
                                    temparr[y] = leds[A][y][z].getColor();
                            } else {
                                if(leds[A][y][z].isOff)
                                    leds[B][y][z-1].turnOff();
                                else
                                    leds[B][y][z-1].setColor(leds[A][y][z].getColor());
                            }
                        }
                    }
                    for (t = 0; t < number; t++) {
                        if(!temparr[t])
                            leds[B][t][number-1].turnOff();
                        else
                            leds[B][t][number-1].setColor(temparr[t]);
                    }
                } else if(sens == "d") {
                    for (z = number-1; z >= 0; z--) {
                        for (y = number-1; y >= 0; y--) {
                            if(z == number-1) {
                                if(leds[A][y][z].isOff)
                                    temparr[y] = false;
                                else
                                    temparr[y] = leds[A][y][z].getColor();
                            } else {
                                if(leds[A][y][z].isOff)
                                    leds[B][y][z+1].turnOff();
                                else
                                    leds[B][y][z+1].setColor(leds[A][y][z].getColor());
                            }
                        }
                    }
                    for (t = number-1; t >= 0; t--) {
                        if(!temparr[t])
                            leds[B][t][0].turnOff();
                        else
                            leds[B][t][0].setColor(temparr[t]);
                    }
                }
                break;
            case "y" :
                if(sens == "g") {
                    for (z = 0; z < number; z++) {
                        for (x = 0; x < number; x++) {
                            if(z == 0) {
                                if(leds[x][A][z].isOff)
                                    temparr[x] = false;
                                else
                                    temparr[x] = leds[x][A][z].getColor();
                            } else {
                                if(leds[x][A][z].isOff)
                                    leds[x][B][z-1].turnOff();
                                else
                                    leds[x][B][z-1].setColor(leds[x][A][z].getColor());
                            }
                        }
                    }
                    for (t = 0; t < number; t++) {
                        if(!temparr[t])
                            leds[t][B][number-1].turnOff();
                        else
                            leds[t][B][number-1].setColor(temparr[t]);
                    }
                } else if(sens == "d") {
                    for (z = number-1; z >= 0; z--) {
                        for (x = number-1; x >= 0; x--) {
                            if(z == number-1) {
                                if(leds[x][A][z].isOff)
                                    temparr[x] = false;
                                else
                                    temparr[x] = leds[x][A][z].getColor();
                            } else {
                                if(leds[x][A][z].isOff)
                                    leds[x][B][z+1].turnOff();
                                else
                                    leds[x][B][z+1].setColor(leds[x][A][z].getColor());
                            }
                        }
                    }
                    for (t = number-1; t >= 0; t--) {
                        if(!temparr[t])
                            leds[t][B][0].turnOff();
                        else
                            leds[t][B][0].setColor(temparr[t]);
                    }
                }
                break;
            case "z" :
                if(sens == "g") {
                    for (y = 0; y < number; y++) {
                        for (x = 0; x < number; x++) {
                            if(y == 0) {
                                if(leds[x][y][A].isOff)
                                    temparr[x] = false;
                                else
                                    temparr[x] = leds[x][y][A].getColor();
                            } else {
                                if(leds[x][y][A].isOff)
                                    leds[x][y-1][B].turnOff();
                                else
                                    leds[x][y-1][B].setColor(leds[x][y][A].getColor());
                            }
                        }
                    }
                    for (t = 0; t < number; t++) {
                        if(!temparr[t])
                            leds[t][number-1][B].turnOff();
                        else
                            leds[t][number-1][B].setColor(temparr[t]);
                    }
                } else if(sens == "d") {
                    for (y = number-1; y >= 0; y--) {
                        for (x = number-1; x >= 0; x--) {
                            if(y == number-1) {
                                if(leds[x][y][A].isOff)
                                    temparr[x] = false;
                                else
                                    temparr[x] = leds[x][y][A].getColor();
                            } else {
                                if(leds[x][y][A].isOff)
                                    leds[x][y+1][B].turnOff();
                                else
                                    leds[x][y+1][B].setColor(leds[x][y][A].getColor());
                            }
                        }
                    }
                    for (t = number-1; t >= 0; t--) {
                        if(!temparr[t])
                            leds[t][0][B].turnOff();
                        else
                            leds[t][0][B].setColor(temparr[t]);
                    }
                }
                break;
        }
    } else {
        alert('Paramètres non valides');
    }

    return 0;
}

// Fonctions qui définit la couleur d'une led
// Paramètre d'entrée : array[4] -> x, y, z, couleur
function setLedColor(args) {
    var x = parseInt(args[0]);
    var y = parseInt(args[1]);
    var z = parseInt(args[2]);
    var c = args[3];
    if (x < number && x >= 0 && y < number && y >= 0 && z < number && z >= 0) {
        leds[x][y][z].setColor(c);
    }

    return 0;
}

// Fonctions qui éteint toutes les leds d'une couche sur un axe
// Paramètre d'entrée : array[2] -> axe, layer
function clearLayer(args) {
    var axe = args[0];
    var layer = parseInt(args[1]);
    for(var i = 0;i < number;i++) {
        for(var j = 0;j < number;j++) {
            if(axe == "x")
                leds[layer][i][j].turnOff();
            else if(axe == "y")
                leds[i][layer][j].turnOff();
            else if(axe == "z")
                leds[i][j][layer].turnOff();
        }
    }

    return 0;
}

// Fonctions qui éteint toutes les leds
// Paramètre d'entrée : array[0]
function clearAll() {
    for(var x = 0;x < number;x++) {
        for(var y = 0;y < number;y++) {
            for(var z = 0;z < number;z++) {
                leds[x][y][z].turnOff();
            }
        }
    }

    return 0;
}

// Fonctions qui colorie toutes les leds d'une couche sur un axe
// Paramètre d'entrée : array[2] -> axe, layer, color
function colorLayer(args) {
    var axe = args[0];
    var layer = parseInt(args[1]);
    var color = args[2];
    for(var i = 0;i < number;i++) {
        for(var j = 0;j < number;j++) {
            if(axe == "x")
                leds[layer][i][j].setColor(color);
            else if(axe == "y")
                leds[i][layer][j].setColor(color);
            else if(axe == "z")
                leds[i][j][layer].setColor(color);
        }
    }

    return 0;
}

// Fonctions qui colorie toutes les leds
// Paramètre d'entrée : array[1] -> color
function colorAll(args) {
    var color = args[0];
    for(var x = 0;x < number;x++) {
        for(var y = 0;y < number;y++) {
            for(var z = 0;z < number;z++) {
                leds[x][y][z].setColor(color);
            }
        }
    }

    return 0;
}

// Fonctions qui temporise pendant x millisecondes avant d'appeler la fonction suivante
// Paramètre d'entrée : array[1] -> durée
function temp(args) {
    return parseInt(args[0]);
}