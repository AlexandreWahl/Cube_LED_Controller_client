var camera, scene, renderer, controls;

// Déclaration des variables de base
// La variable size définit la taille de la zone dans laquelle les leds vont être réparties
// Plus cette valeur est grande, plus l'espace entre les leds sera élevé
// la variable number définit le nombre de couches
// Par exemple 8 pour un cube de 8x8x8, 12 pour un cube de 12x12x12
// La variable leds est le tableau d'objets "led"
var size = 30;
var number = 8;
var leds = "";

// Récupère la taille de la div dans laquelle se trouve le cube
var w = $("#divCubeLED").width();
var h = $("#divCubeLED").height();

// Fonction qui retourne la taille du tableau
function getNumber() {
    return number;
}

// Fonction appelée lorsque l'on arrive sur la page
// Elle va créer le cube, ajouter la scère, la caméra, créer les objects led et activer/désactiver les contrôles
function init() {
    // Création d'une scène à laquelle on va ajouter les leds
    scene = new THREE.Scene();
    // Création d'une caméra qui va permettre de tourner autour du cube
    camera = new THREE.PerspectiveCamera(50, w / h, 1, 10000);
    // Définition de la position de base de la caméra
    camera.position.set(39, 45, 80).setLength(100);
    // Le renderer permet d'afficher la scère
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    scene.background = new THREE.Color("#5d6168");
    // Ajout du renderer à la div dédiée à cet effet
    $("#divCubeLED").append(renderer.domElement);

    // Création des contrôles pour gérer la camera
    // Pas de contrôle via les touches du clavier (déplacement)
    // Pas de contrôle via le clic droit (déplacement)
    // Pas de contrôle via la molette (zoom)
    // Contrôle via le clic gauche de la souris (rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.5;

    // Création du tableau de leds
    leds = [];
    // Premier axe, x
    for(var x = 0;x < number;x++) {
        leds[x] = [];
        // Deuxième axe, y
        for(var y = 0;y < number;y++) {
            leds[x][y] = [];
            // Troisième axe, z
            for(var z = 0;z < number;z++) {
                // Création de l'objet
                leds[x][y][z] = new Led(x, y, z);
                leds[x][y][z].createLed();
                // Calcul la position de la led sur le cube
                leds[x][y][z].setPosLed(size/2 - size/(number-1)*x, size/2 - size/(number-1)*y, size/2 - size/(number-1)*z);
                // Ajout de la led à la scène
                scene.add(leds[x][y][z].showLed());
            }
        }
    }

    axes = new THREE.AxisHelper(size);
}

// Fonction appelée lorsque l'on arrive sur la page
// Elle va gérer l'animation du cube
function animate() {
    // "requestAnimationFrame" rapelle animate ~60 fois par seconde (dépend de la fréquence de rafraichissement de l'écran)
    requestAnimationFrame(animate);

    if(getRotateStatus()) {
        scene.rotation.x += 0;
        scene.rotation.y += 0.005;
        scene.rotation.z += 0;
    }

    if(getAxesStatus()) {
        scene.add(axes);
    } else {
        scene.remove(axes);
    }

    render();
}

function render() {
    // A chaque appel de cette fonction on met à jour le rendu et donc une animation se créé
    renderer.render(scene, camera);
}