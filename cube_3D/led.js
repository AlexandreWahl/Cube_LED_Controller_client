function Led(x, y, z) {
    // Déclaration des variables de base
    // x, y, z pour la position du cube
    this.x = x;
    this.y = y;
    this.z = z;
    // color est la couleur de base des leds
    this.colorBase = "white";
    // color est la couleur de la led
    this.color = "";
    // radius est le rayon des spheres (leds)
    this.radius = 0.6;
    // size est la taille des leds
    this.size = 15;
    // opacity est l'opactié des leds
    this.opacity = 0.20;
    // isOff permet "d'éteindre" les leds en baissant leur opacité
    this.isOff = true;
    this.sphere = "";

    this.createLed = function () {
        // Création de l'objet avec les paramètres définit au dessus
        this.material = new THREE.MeshBasicMaterial({
            color: this.colorBase,
            transparent : true,
            opacity : this.opacity
        });

        // Création de la led en tant qu'objet "Mesh"
        // https://en.wikipedia.org/wiki/Polygon_mesh
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(this.radius, this.size, this.size), this.material);
    };

    // Définit la position de la led avec 3 paramètres d'entrée -> x, y et z
    this.setPosLed = function (x, y, z) {
        this.sphere.position.set(x, y, z);
    };

    // Retourne la led, est utilisé pour ajouter la led à la scène
    this.showLed = function () {
        return this.sphere;
    };

    // Retourne la couleur de la led
    this.getColor = function () {
        return this.color;
    };

    // Attribue une couleur à la led avec 1 paramètre d'entrée -> color
    this.setColor = function (c) {
        this.isOff = false;
        this.material.opacity = 1;
        this.material.color = new THREE.Color(c);
        this.color = c;
    };

    // "Eteint" la led en baissant son opacité et en changeant sa couleur
    this.turnOff = function() {
        this.isOff = true;
        this.material.opacity = this.opacity;
        this.material.color = new THREE.Color(this.colorBase);
        this.color = "";
    }
}
