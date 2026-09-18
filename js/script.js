// // Liste des liens à ajouter
// const links = [
//     { href: '/', text: 'Home' },
//     { href: '/menu', text: 'Menu' },
//     { href: '/#about', text: 'About' },
//     { href: '/#contact', text: 'Contact' }
// ];

// // Fonction pour ajouter des destinations aux liens existants
// function updateAnchors(links, targetElementId) {
//     // Sélectionner l'élément cible
//     const ul = document.getElementById(targetElementId);
//     // Sélectionner tous les éléments <a> enfants de l'élément <ul>
//     const anchors = ul.querySelectorAll('a');

//     // Parcourir chaque lien dans la liste
//     links.forEach((link, index) => {
//         // Mettre à jour l'attribut href et le texte de chaque ancre
//         anchors[index].href = link.href;
//         anchors[index].textContent = link.text;
//     });
// }

// // Appel de la fonction pour mettre à jour les ancres
// updateAnchors(links, 'nav-links');


// Gestion du menu responsive
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});

// Ajout au panier
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Récupérer le nom et le prix du produit
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        // Récupérer le panier actuel dans le localStorage
        // (tableau vide si aucun panier n'existe encore)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ajouter le nouveau produit au panier
        cart.push({ name: productName, price: productPrice });

        // Sauvegarder le panier mis à jour dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Confirmer l'ajout dans le panier
        alert(`${productName} a été ajouté au panier!`);
    });
});


// Affichage du panier
document.getElementById('cart').addEventListener('click', () => {
    const cartContent = document.getElementById('cart-content');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Vider le contenu actuel de la liste avant de la reconstruire
    cartItems.innerHTML = '';

    // Récupérer le panier depuis le localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Variable pour calculer le total du panier
    let total = 0;

    // Générer un <li> pour chaque article du panier
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);

        // Ajouter le prix de l'article au total
        total += parseFloat(item.price);
    });

    // Afficher le total avec 2 décimales
    cartTotal.textContent = total.toFixed(2);

    // Rendre visible le panneau du panier
    cartContent.style.display = 'block';
});


// fermeture du panier
const closeCartButton = document.getElementById('close-cart');
closeCartButton.addEventListener('click', () =>{
    document.getElementById('cart-content').style.display = 'none'
})

// Ajouter un événement de clic pour fermer le panier
closeCartButton.addEventListener('click', () => {
    document.getElementById('cart-content').style.display = 'none';
});


// Sélectionner le bouton pour vider le panier
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    // Vider le localStorage
    localStorage.removeItem('cart');
    // Mettre à jour l'affichage du panier
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('cart-total').textContent = '0.00';
});

// Sélectionner le bouton pour valider la commande
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', () => {
    if (localStorage.getItem('cart')) {
        // Générer un ID de commande aléatoire (à titre d'exemple uniquement,
        const orderId = Math.floor(Math.random() * 1000000);

        alert(`Commande validée! Numéro de commande: ${orderId}`);

        // Vider le panier après validation de la commande
        localStorage.removeItem('cart');
        document.getElementById('cart-items').innerHTML = '';
        document.getElementById('cart-total').textContent = '0.00';
    } else {
        // Empêche la validation si le panier est vide
        alert("Votre panier est vide, veuillez ajouter des articles avant de valider la commande.");
    }
});