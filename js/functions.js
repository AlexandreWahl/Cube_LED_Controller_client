var rotateStatus = false;
var statusShowAxes = false;
var number = getNumber();

// Fonction permettant de vider les 3 div principales de la partie d'affichage
function clearInterface() {
    $('#divTitle').empty();
    $('#divControls').empty();
    $('#divButtons').empty();
}

// Fonction permmettant de changer le titre dans la div d'affichage divTitle
function setTitle(title) {
    $("#divTitle").text(title);
}

// Fonction permettant d'éteindre toutes les LEDS
function turnOffAllLeds() {
    for(var x = 0;x < number;x++) {
        for (var y = 0; y < number; y++) {
            for (var z = 0; z < number; z++) {
                leds[x][y][z].turnOff();
            }
        }
    }
}

// Fonction permettant d'obtenir le statut de la rotation du cube
function getRotateStatus() {
    return rotateStatus;
}

// Fonction permettant de lancer la rotation du cube
function startCubeRotation() {
    rotateStatus = true;
}


function getAxesStatus() {
    return statusShowAxes;
}

function hideAxes() {
    statusShowAxes = false;
}

function showAxes() {
    statusShowAxes = true;
}

function checkAxes(value) {
    if(value)
        showAxes();
    else
        hideAxes();
}

// Fonction permettant de stopper la rotation du cube et d'éteindre toutes les leds
function resetCube() {
    turnOffAllLeds();
    rotateStatus = false;
}

// TODO
function deleteFonction(obj) {
    obj.parent().parent().remove();
}

// TODO
function printSequences() {
    reqGetSequences().done(function(data) {
        var data = JSON.parse(data);
        clearInterface();
        setTitle('Mes séquences');

        $("#divControls").append('<div id="divSequences"></div>');
        $("#divButtons").append('<input class="buttonsControls" id="buttonNewSeq" type="button" onclick="clickButtonNewSequence()" value="Créer une séquence" />');
        for(var i = 0;i< data.length;i++) {
            $("#divSequences").append('<div class="divSequence" id="sequenceNo' + data[i].numero +'"><div id="nameSequence" >' + data[i].nom + '</div>' +
                '<div id="buttonSequence"><button class="buttonSequences buttonEditSequence" id="buttonEditSequence' + data[i].numero + '" onclick="getInfosSequence(' + data[i].numero + ')" value=""><a><i class="fa fa-pencil-square-o"></i></a></button>' +
                '<button class="buttonSequences buttonPlaySequence" id="buttonStartSequence' + data[i].numero + '" onclick="getDataSequence(' + data[i].numero + ')" value=""><a><i class="fa fa-play"></i></a></button>' +
                '<button class="buttonSequences buttonDeleteSequence" id="buttonDeleteSequence' + data[i].numero + '" onclick="dialogBox_ConfirmDelete(' + data[i].numero + ')" value=""><a><i class="fa fa-trash"></i></a></button>' +
                '<button class="buttonSequences buttonSendSequence" id="buttonSendSequence' + data[i].numero + '" onclick="reqSetEnCours(' + data[i].numero + ')" value=""><a><i class="fa fa-share-square-o"></i></a></button></div></div>');
        }
    });
}

// TODO
function addFonctionToSequence() {
    var select = $("#selectAddFonctions");
    var id = select.val();
    var name = select.find(":selected").text();
    var nbParam = select.find(":selected").attr('nbParam');
    var typeParam = select.find(":selected").attr('typeParam');
    var explication = select.find(":selected").attr('explication');

    var length = $("#divFonctionsParams").children().length;

    createFonc(id, name, nbParam, typeParam, explication, length);
}

// TODO
function validateSequence() {
    var nom = $("#nomSequence").val();
    var auteur = $("#auteurSequence").val();
    var desc = $("#descSequence").val();

    if(nom == null || nom == "" || auteur == null || auteur == "" || desc == null || desc == "") {
        alert("Veuillez remplir tous les champs");
    } else {
        reqAddSequence(nom, auteur, desc).done(function (numero) {
            getInfosSequence(numero);
        });
    }
}

// TODO
function createFonc(id, name, nbParam, typeParam, explication, length) {
    var params = "";

    if(typeParam != "") {
        var type = typeParam.replace(new RegExp("'", 'g'), '"');
        type = JSON.parse(type);

        for (var i = 0; i < nbParam; i++) {
            params += createSelect(type[i], i);
        }
    }

    $("#divFonctionsParams").append('' +
        '<div id="divFonc">' +
        '<div class="divExpliFonc">' + explication + ' (' + name + ')' + '</div>' +
        '<div class="divParamsFonc" ' +
        'idSpe="' + length + '" ' +
        'nbParam="' + nbParam + '" ' +
        'idFonc="' + id + '">' + params + '</div>' +
        '<div class="divDeleteFonc"><button class="buttonDeleteFonction" onclick="deleteFonction($(this))">' +
        '<a><i class="fa fa-trash"></i></a></button></div></div>');
}

// TODO
function getInfosSequence(id) {
    resetCube();
    clearInterface();

    reqGetSequenceByID(id).done(function(data) {
        var aSequence = JSON.parse(data);
        var divButtons =  $("#divButtons");
        var divControls =  $("#divControls");

        setTitle(aSequence.nom);
        divButtons.append('<input class="buttonsControls" id="buttonCancel" type="button" onclick="printSequences()" value="Annuler" />');
        divButtons.append('<input class="buttonsControls" id="buttonValidate" type="button" onclick="validateFonctions(' + id + ')" value="Valider" />');
        divButtons.append('<input class="buttonsControls" id="buttonCubeEditor" type="button" onclick="cubeEditor(' + id + ')" value="Cube Editor" />');

        divControls.append('' +
            '<div class="divAddSeq" id="divNewSeqFunc">' +
            '<label class="labelNewSeq" for="funcSequence">Ajouter fonctions : </label><div id="divAddFonction">');

        divControls.append('<div id="divFonctionsParams"></div>');

        getFonctionsSelect(aSequence.numero);
    });

}

// TODO
function getFonctionsSelect(id) {
    reqGetFonctions().done(function(data) {
        var aFonctions = JSON.parse(data);
        var options = "";

        for(var i = 0; i < aFonctions.length;i++) {
            var j = i+1;
            options += '<option ' +
                'explication="' + aFonctions[i].explication + '"' +
                'typeParam="' + aFonctions[i].typeParametre + '"' +
                'nbParam="' + aFonctions[i].nbrParametre + '"' +
                'value="' + j + '">' + aFonctions[i].nom +
                '</option>';
        }

        $("#divAddFonction").append('' +
            '<select id="selectAddFonctions">' + options + '</select>' +
            '<button id="buttonAddFonction" onclick="addFonctionToSequence()" value=""><a><i class="fa fa-plus"></i></a></button>' +
            '</div>');
    });

    getFonctionsWithID(id)
}

// TODO
function getFonctionsWithID(id) {
    reqGetFonctionsIDSequence(id).done(function(data) {
        if(data == "empty") {
            console.log("Erreur getFonctionsIDSequence");
        } else {
            var aFonctions = JSON.parse(data);
            var id, name, nbParam, typeParam, explication;
            var length = aFonctions.length;

            for (var j = 0; j < length; j++) {
                id = aFonctions[j].num_Fonc;
                name = aFonctions[j].nom;
                nbParam = aFonctions[j].nbrParametre;
                typeParam = aFonctions[j].typeParametre;
                explication = aFonctions[j].explication;

                createFonc(id, name, nbParam, typeParam, explication, j);
            }
        }
    });

    getParametres(id);
}

// TODO
function getParametres(id) {
    reqGetFonctionsParametres(id).done(function(data) {
        if(data == "empty") {
            console.log('Erreur getFonctionsParametres');
        } else {
            var aFonctions = JSON.parse(data);
            for (var i = 0; i < aFonctions.length; i++) {
                if(aFonctions[i].nbParam > 0 ) {
                    var count = aFonctions[i].params.length;
                    for (var j = 0; j < count; j++) {
                        var option = $("div[idSpe=" + i + "]").find("select[pos=" + j + "]").find('option[value="' + aFonctions[i].params[j] + '"]');

                        option.prop('selected', true);
                        if(option.is(':selected') == false) {
                            getParametres(id);
                        }
                    }
                }
            }
        }
    });
}

// TODO
function validateFonctions(numero) {
    reqDeleteSequenceFonctions(numero).done(function() {
        var divParamsFonc = $("#divFonctionsParams").find('.divParamsFonc');
        var empty = false, cpt = 0, aNbParam = [], aIdFonc = [],aValeur = [];

        divParamsFonc.each(function() {
            aValeur[cpt] = [];
            aIdFonc[cpt] = $(this).attr("idFonc");
            aNbParam[cpt] = $(this).attr("nbParam");

            if(aNbParam[cpt] > 0) {
                var optionParams = $(this).find(":selected");

                for (var i = 0; i < optionParams.length; i++) {
                    aValeur[cpt][i] = $(this).find("select[pos=" + i + "]").val();
                    if(aValeur[cpt][i] == null) {
                        empty = true;
                    }
                }
            } else {
                aValeur[cpt] = "";
            }

            cpt++;
        });

        if(!empty) {
            for(var i = 0;i<cpt;i++) {
                reqAddFonctionsIDSequence(numero, aNbParam[i], aIdFonc[i], aValeur[i]);
            }
            getDataSequence(numero);
            printSequences();
        } else {
            alert("Veuillez remplir tous les champs");
        }
    });
}

// TODO
function getDataSequence(numero) {
    reqGetFonctionsParametres(numero).done(function(data) {
        if(data == "empty") {
            console.log('Erreur play sequence');
        } else {
            resetCube();
            playSequence(JSON.parse(data));
        }
    });
}

// TODO
function cubeEditor(numero) {
    clearInterface();

    var divButtons =  $("#divButtons");
    var divControls =  $("#divControls");
    setTitle("Cube Editor");

    divButtons.append('<input class="buttonsControls" id="buttonCancelEditor" type="button" onclick="getInfosSequence(' + numero + ')" value="Annuler" />');
    divButtons.append('<input class="buttonsControls" id="buttonValidateEditor" type="button" onclick="validateEditor(' + numero + ')" value="Valider" />');

    divControls.append('<div id="divControlsCubeEditor">' +
        '<div id="divCubeEditor"><div id="divCubeEditorText"></div><div id="divCubeEditorArray"></div></div>' +
        '<div id="divCubeEditorButton"></div>' +
        '<div id="divCubeEditorButtonRotation"></div>' +
        '</div>');

    var divCubeEditorText =  $("#divCubeEditorText");
    var divCubeEditorArray =  $("#divCubeEditorArray");
    var divCubeEditorButton =  $("#divCubeEditorButton");
    var divCubeEditorButtonRotation =  $("#divCubeEditorButtonRotation");

    divCubeEditorText.append('<div id="divCubeEditorColor" class="divCubeEditor"><p class="labelCubeEditor">Couleur : </p><div class="inputCubeEditor">' + createSelect("color", 0) + '</div></div>');
    divCubeEditorText.append('<div id="divCubeEditorAxe" class="divCubeEditor"><p class="labelCubeEditor">Axe : </p><div class="inputCubeEditor">' + createSelect("axe", 0) + '</div></div>');
    divCubeEditorText.append('<div id="divCubeEditorLayer" class="divCubeEditor"><p class="labelCubeEditor">Layer : </p><div class="inputCubeEditor">' + createSelect("layer", 0) + '</div></div>');
    divCubeEditorText.append('<div id="divCubeEditorLettre" class="divCubeEditor"><p class="labelCubeEditor">Lettre : </p><div class="inputCubeEditor">' + createSelect("letter", 0) + '</div></div>');

    $(".selectFonctions").css("width", "80px");

    divCubeEditorArray.append('<div id="divTableLed"><table id="tableLed"></table></div>');

    for(var i= 0;i<number;i++) {
        $('#tableLed').append('<tr id="' + i + '">');
        for(var j= 0;j<number;j++) {
            $('#tableLed').append('<td id="' + i + '-' + j + '"></td>');
            $('#' + i + '-' + j).click(function(e, i, j){
                var color = $('.inputCubeEditor').find("select[name='selectTypeColor']").find(":selected").val();
                $(this).css("background-color", color);
                e.stopPropagation();
            });
        }
        $('#tableLed').append('<tr>');
    }

    divCubeEditorButton.append('<input id="buttonValidateArray" type="button" onclick="validateArray()" value="Valider la couche" />');
    divCubeEditorButton.append('<input id="buttonGetArray" type="button" onclick="getArray()" value="Copier la couche" />');
    divCubeEditorButton.append('<input id="buttonClearArray" type="button" onclick="clearArray()" value="Vider le tableau" />');
    divCubeEditorButton.append('<input id="buttonValidateLettre" type="button" onclick="validateLettre()" value="Appliquer la lettre" />');


    divCubeEditorButtonRotation.append('<input id="buttonRotation90Left" type="button" onclick="fnRotateLayer(\'gauche\')" value="Pivoter à gauche" />');
    divCubeEditorButtonRotation.append('<input id="buttonRotation90Right" type="button" onclick="fnRotateLayer(\'droite\')" value="Pivoter à droite" />');
    divCubeEditorButtonRotation.append('<input id="buttonAxialeX" type="button" onclick="fnRotateLayer(\'axialex\')" value="Symétrie Axiale sur X" />');
    divCubeEditorButtonRotation.append('<input id="buttonAxialeY" type="button" onclick="fnRotateLayer(\'axialey\')" value="Symétrie Axiale sur Y" />');
}

// TODO
function validateEditor(numero) {
    console.log("Validate editor");
}

// TODO
function validateArray() {
    for(var i= 0;i<number;i++) {
        for(var j= 0;j<number;j++) {
            var color = $('#' + i + '-' + j).css("background-color");
            var axe = $('.inputCubeEditor').find("select[name='selectTypeAxe']").find(":selected").val();
            var layer = $('.inputCubeEditor').find("select[name='selectTypeLayer']").find(":selected").val();

            if(axe != "" && layer != "") {
                if(axe == "x") {
                    if (color == 'rgba(0, 0, 0, 0)') {
                        leds[layer][i][j].turnOff();
                    } else {
                        leds[layer][i][j].setColor(color);
                    }
                } else if(axe == "y") {
                    if (color == 'rgba(0, 0, 0, 0)') {
                        leds[i][layer][j].turnOff();
                    } else {
                        leds[i][layer][j].setColor(color);
                    }
                } else if(axe == "z") {
                    if (color == 'rgba(0, 0, 0, 0)') {
                        leds[i][j][layer].turnOff();
                    } else {
                        leds[i][j][layer].setColor(color);
                    }
                }
            }
        }
    }
}

// TODO
function getArray() {
    for(var i= 0;i<number;i++) {
        for(var j= 0;j<number;j++) {
            var color = "";
            var axe = $('.inputCubeEditor').find("select[name='selectTypeAxe']").find(":selected").val();
            var layer = $('.inputCubeEditor').find("select[name='selectTypeLayer']").find(":selected").val();
            if(axe == "x") {
                color = leds[layer][i][j].getColor();
            } else if(axe == "y") {
                color = leds[i][layer][j].getColor();
            } else if(axe == "z") {
                color = leds[i][j][layer].getColor();
            }


            if(color.r == 1 && color.g == 1 && color.b == 1) {
                $('#' + i + '-' + j).css("background-color", "");
            } else {
                $('#' + i + '-' + j).css("background-color", "rgba("+color.r*255+","+color.g*255+"," +color.b*255+", 1)");
            }
        }
    }
}

// TODO
function clearArray() {
    for(var i= 0;i<number;i++) {
        for(var j= 0;j<number;j++) {
            $('#' + i + '-' + j).css("background-color", "");
        }
    }
}

// TODO
function validateLettre() {
    var lettre = $('.inputCubeEditor').find("select[name='selectTypeLetter']").find(":selected").val();
    var color = $('.inputCubeEditor').find("select[name='selectTypeColor']").find(":selected").val();
    var axe = $('.inputCubeEditor').find("select[name='selectTypeAxe']").find(":selected").val();
    var layer = $('.inputCubeEditor').find("select[name='selectTypeLayer']").find(":selected").val();

    var res = convertCharCodeToLetter(lettre);
    var dot,cpt = 0;

    for(var i=0;i<number;i++) {
        for(var j=0;j<number;j++) {
            dot = res[cpt];

            if(axe == "x" && dot == "#") {
                $('#' + i + '-' + j).css("background-color", color);
                leds[layer][i][j].setColor(color);
            } else if(axe == "x" && dot == "-") {
                $('#' + i + '-' + j).css("background-color", "");
                leds[layer][i][j].turnOff();
            } else if(axe == "y" && dot == "#") {
                $('#' + i + '-' + j).css("background-color", color);
                leds[i][layer][j].setColor(color);
            } else if(axe == "y" && dot == "-") {
                $('#' + i + '-' + j).css("background-color", "");
                leds[i][layer][j].turnOff();
            } else if(axe == "z" && dot == "#") {
                $('#' + i + '-' + j).css("background-color", color);
                leds[i][j][layer].setColor(color);
            } else if(axe == "z" && dot == "-") {
                $('#' + i + '-' + j).css("background-color", "");
                leds[i][j][layer].turnOff();
            }
            cpt++;
        }
    }
}

// TODO
function fnRotateLayer(sens) {
    var axe = $('.inputCubeEditor').find("select[name='selectTypeAxe']").find(":selected").val();
    var layer = $('.inputCubeEditor').find("select[name='selectTypeLayer']").find(":selected").val();

    var layer0 = [];

    for(var i=0;i<number;i++) {
        layer0[i] = [];
        for(var j=0;j<number;j++) {
            if(axe == "x") {
                layer0[i][j] = leds[layer][i][j].getColor();
            } else if(axe == "y") {
                layer0[i][j] = leds[i][layer][j].getColor();
            } else if(axe == "z") {
                layer0[i][j] = leds[i][j][layer].getColor();
            }
        }
    }

    if(sens == "droite") {
        for(var i=0;i<number;i++) {
            for(var j=0;j<number;j++) {
                var prime = number-1-j;
                if(axe == "x") {
                    if(layer0[j][i].r == 1 && layer0[j][i].g == 1 && layer0[j][i].b == 1) {
                        leds[layer][i][prime].turnOff();
                        $('#' + i + '-' + prime).css("background-color", "");
                    } else {
                        leds[layer][i][prime].setColor("rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                        $('#' + i + '-' + prime).css("background-color", "rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                    }
                } else if(axe == "y") {
                    if(layer0[j][i].r == 1 && layer0[j][i].g == 1 && layer0[j][i].b == 1) {
                        leds[i][layer][prime].turnOff();
                        $('#' + i + '-' + prime).css("background-color", "");
                    } else {
                        leds[i][layer][prime].setColor("rgba("+layer0[j][i].r*255+","+layer0[j][i].g*255+"," +layer0[j][i].b*255+", 1)");
                        $('#' + i + '-' + prime).css("background-color", "rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                    }
                } else if(axe == "z") {
                    if(layer0[j][i].r == 1 && layer0[j][i].g == 1 && layer0[j][i].b == 1) {
                        leds[i][prime][layer].turnOff();
                        $('#' + i + '-' + prime).css("background-color", "");
                    } else {
                        leds[i][prime][layer].setColor("rgba("+layer0[j][i].r*255+","+layer0[j][i].g*255+"," +layer0[j][i].b*255+", 1)");
                        $('#' + i + '-' + prime).css("background-color", "rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                    }
                }
            }
        }
    } else if(sens == "gauche") {
        for(var i=0;i<number;i++) {
            for(var j=0;j<number;j++) {
                var prime = number-1-i;
                if(axe == "x") {
                    if(layer0[j][i].r == 1 && layer0[j][i].g == 1 && layer0[j][i].b == 1) {
                        leds[layer][prime][j].turnOff();
                        $('#' + prime + '-' + j).css("background-color", "");
                    } else {
                        leds[layer][prime][j].setColor("rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                        $('#' + prime + '-' + j).css("background-color", "rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                    }
                } else if(axe == "y") {
                    if(layer0[j][i].r == 1 && layer0[j][i].g == 1 && layer0[j][i].b == 1) {
                        leds[prime][layer][j].turnOff();
                        $('#' + prime + '-' + j).css("background-color", "");
                    } else {
                        leds[prime][layer][j].setColor("rgba("+layer0[j][i].r*255+","+layer0[j][i].g*255+"," +layer0[j][i].b*255+", 1)");
                        $('#' + prime + '-' + j).css("background-color", "rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                    }
                } else if(axe == "z") {
                    if(layer0[j][i].r == 1 && layer0[j][i].g == 1 && layer0[j][i].b == 1) {
                        leds[prime][j][layer].turnOff();
                        $('#' + prime + '-' + j).css("background-color", "");
                    } else {
                        leds[prime][j][layer].setColor("rgba("+layer0[j][i].r*255+","+layer0[j][i].g*255+"," +layer0[j][i].b*255+", 1)");
                        $('#' + prime + '-' + j).css("background-color", "rgba(" + layer0[j][i].r * 255 + "," + layer0[j][i].g * 255 + "," + layer0[j][i].b * 255 + ", 1)");
                    }
                }
            }
        }
    } else if(sens == "axialex") {
        for(var i=0;i<number;i++) {
            for(var j=0;j<number;j++) {
                var prime = number-1-j;
                if(axe == "x") {
                    if(layer0[i][j].r == 1 && layer0[i][j].g == 1 && layer0[i][j].b == 1) {
                        leds[layer][i][prime].turnOff();
                        $('#' + i + '-' + prime).css("background-color", "");
                    } else {
                        leds[layer][i][prime].setColor("rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                        $('#' + i + '-' + prime).css("background-color", "rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                    }
                } else if(axe == "y") {
                    if(layer0[i][j].r == 1 && layer0[i][j].g == 1 && layer0[i][j].b == 1) {
                        leds[i][layer][prime].turnOff();
                        $('#' + i + '-' + prime).css("background-color", "");
                    } else {
                        leds[i][layer][prime].setColor("rgba("+layer0[i][j].r*255+","+layer0[i][j].g*255+"," +layer0[i][j].b*255+", 1)");
                        $('#' + i + '-' + prime).css("background-color", "rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                    }
                } else if(axe == "z") {
                    if(layer0[i][j].r == 1 && layer0[i][j].g == 1 && layer0[i][j].b == 1) {
                        leds[i][prime][layer].turnOff();
                        $('#' + i + '-' + prime).css("background-color", "");
                    } else {
                        leds[i][prime][layer].setColor("rgba("+layer0[i][j].r*255+","+layer0[i][j].g*255+"," +layer0[i][j].b*255+", 1)");
                        $('#' + i + '-' + prime).css("background-color", "rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                    }
                }
            }
        }
    } else if(sens == "axialey") {
        for(var i=0;i<number;i++) {
            for(var j=0;j<number;j++) {
                var prime = number-1-i;
                if(axe == "x") {
                    if(layer0[i][j].r == 1 && layer0[i][j].g == 1 && layer0[i][j].b == 1) {
                        leds[layer][prime][j].turnOff();
                        $('#' + prime + '-' + j).css("background-color", "");
                    } else {
                        leds[layer][prime][j].setColor("rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                        $('#' + prime + '-' + j).css("background-color", "rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                    }
                } else if(axe == "y") {
                    if(layer0[i][j].r == 1 && layer0[i][j].g == 1 && layer0[i][j].b == 1) {
                        leds[prime][layer][j].turnOff();
                        $('#' + prime + '-' + j).css("background-color", "");
                    } else {
                        leds[prime][layer][j].setColor("rgba("+layer0[i][j].r*255+","+layer0[i][j].g*255+"," +layer0[i][j].b*255+", 1)");
                        $('#' + prime + '-' + j).css("background-color", "rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                    }
                } else if(axe == "z") {
                    if(layer0[i][j].r == 1 && layer0[i][j].g == 1 && layer0[i][j].b == 1) {
                        leds[prime][j][layer].turnOff();
                        $('#' + prime + '-' + j).css("background-color", "");
                    } else {
                        leds[prime][j][layer].setColor("rgba("+layer0[i][j].r*255+","+layer0[i][j].g*255+"," +layer0[i][j].b*255+", 1)");
                        $('#' + prime + '-' + j).css("background-color", "rgba(" + layer0[i][j].r * 255 + "," + layer0[i][j].g * 255 + "," + layer0[i][j].b * 255 + ", 1)");
                    }
                }
            }
        }
    }
}

// TODO
function playSequence(data) {
    startCubeRotation();
    var fonctions = [];

    for(var i = 0;i< data.length;i++) {
        fonctions.push({
            name: data[i].nom,
            args: data[i].params
        });
    }

    execFunctions(0);

    function execFunctions(ms) {
        var fonction = fonctions.shift();

        if(fonction !== undefined) {
            var delay = window[fonction.name](fonction.args);
            setTimeout(function() {
                execFunctions(delay);
            }, ms);
        }
    }
}

// TODO
function createSelect(type, pos) {
    var select = "";
    switch(type){
        case "layer" :
            select += '<select pos="' + pos + '" name="selectTypeLayer" class="selectTypeLayer selectFonctions">';
            select += '<option disabled selected></option>';
            select += '<option value="0">0</option>';
            select += '<option value="1">1</option>';
            select += '<option value="2">2</option>';
            select += '<option value="3">3</option>';
            select += '<option value="4">4</option>';
            select += '<option value="5">5</option>';
            select += '<option value="6">6</option>';
            select += '<option value="7">7</option>';
            select += '</select>';
            return select;
        case "axe" :
            select += '<select pos="' + pos + '" name="selectTypeAxe" class="selectTypeAxe selectFonctions">';
            select += '<option disabled selected></option>';
            select += '<option value="x">x</option>';
            select += '<option value="y">y</option>';
            select += '<option value="z">z</option>';
            select += '</select>';
            return select;
        case "color" :
            select += '<select pos="' + pos + '" name="selectTypeColor" class="selectTypeColor selectFonctions">';
            select += '<option disabled selected></option>';
            select += '<option value="red">Rouge</option>';
            select += '<option value="blue">Bleu</option>';
            select += '<option value="orange">Orange</option>';
            select += '<option value="yellow">Jaune</option>';
            select += '<option value="green">Vert</option>';
            select += '<option value="purple">Violet</option>';
            select += '<option value="pink">Rose</option>';
            select += '<option value="brown">Brun</option>';
            select += '</select>';
            return select;
        case "sens" :
            select += '<select pos="' + pos + '" name="selectTypeSens" class="selectTypeSens selectFonctions">';
            select += '<option disabled selected></option>';
            select += '<option value="d">Droite</option>';
            select += '<option value="g">Gauche</option>';
            select += '</select>';
            return select;
        case "delay" :
            select += '<select pos="' + pos + '" name="selectTypeDelay" class="selectTypeDelay selectFonctions">';
            select += '<option disabled selected></option>';
            select += '<option value="100">100 ms</option>';
            select += '<option value="200">200 ms</option>';
            select += '<option value="500">500 ms</option>';
            select += '<option value="1000">1000 ms</option>';
            select += '<option value="2000">2000 ms</option>';
            select += '</select>';
            return select;
        case "letter" :
            select += '<select pos="' + pos + '" name="selectTypeLetter" class="selectTypeLetter selectFonctions">';
            select += '<option disabled selected></option>';
            select += '<option value="A">A</option>';
            select += '<option value="B">B</option>';
            select += '<option value="C">C</option>';
            select += '<option value="D">D</option>';
            select += '<option value="E">E</option>';
            select += '<option value="F">F</option>';
            select += '<option value="G">G</option>';
            select += '<option value="H">H</option>';
            select += '<option value="I">I</option>';
            select += '<option value="J">J</option>';
            select += '<option value="K">K</option>';
            select += '<option value="L">L</option>';
            select += '<option value="M">M</option>';
            select += '<option value="N">N</option>';
            select += '<option value="O">O</option>';
            select += '<option value="P">P</option>';
            select += '<option value="Q">Q</option>';
            select += '<option value="R">R</option>';
            select += '<option value="S">S</option>';
            select += '<option value="T">T</option>';
            select += '<option value="U">U</option>';
            select += '<option value="V">V</option>';
            select += '<option value="W">W</option>';
            select += '<option value="X">X</option>';
            select += '<option value="Y">Y</option>';
            select += '<option value="Z">Z</option>';
            select += '<option value="in">?</option>';
            select += '<option value="ex">!</option>';
            select += '<option value="eu">€</option>';
            select += '<option value="do">$</option>';
            select += '</select>';
            return select;
        default :
            alert("Error");
            break;
    }
}

// TODO
function clickButtonNewSequence() {
    clearInterface();
    setTitle('Nouvelle séquence');

    $("#divControls").append('<div id="divNewSequence"></div>');
    $("#divNewSequence").append('<div class="divNewSeq" id="divNewSeqName"><label class="labelNewSeq" for="nomSequence">Nom : </label><input class="inputNewSeq" id="nomSequence" maxlength="25" xname="nomSequence" type="text" value="" /></div>' +
        '<div class="divNewSeq" id="divNewSeqAuthor"><label class="labelNewSeq" for="auteurSequence">Auteur : </label><input class="inputNewSeq" id="auteurSequence" name="auteurSequence" type="text" value="" /></div>' +
        '<div class="divNewSeq" id="divNewSeqDesc"><label class="labelNewSeq" for="descSequence">Description : </label><input class="inputNewSeq" id="descSequence" name="descSequence" type="text" value="" /></div>');

    $("#divNewSequence").append('<button id="buttonValidateSeq" onclick="validateSequence()" value=""><a><i class="fa fa-check"></i></a></button>');
    $("#divButtons").append('<input class="buttonsControls" id="buttonCancel" type="button" onclick="printSequences()" value="Annuler" />');
}

//Fonction permettant d'afficher une boîte de dialogue de confirmation lors de la supression d'une séquence
function dialogBox_ConfirmDelete(numero) {
    $("#deleteConfirmation").dialog({
        modal: true,
        buttons: {
            OK: function() {
                $(this).dialog("close");
                reqDeleteSequence(numero).done(function() {
                    printSequences();
                });
            },
            Annuler: function() {
                $(this).dialog("close");
            }
        }
    });
}