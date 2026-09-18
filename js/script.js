// Gestion du menu responsive
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Vider le contenu actuel de la liste avant de la reconstruire
    cartItems.innerHTML = '';

    // Récupérer le panier depuis le localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Variable pour calculer le total du panier
    let total = 0;
    if (cart.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Votre panier est vide.';
        cartItems.appendChild(li);

    } else {
        // Générer un <li> pour chaque article du panier
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = `${item.name} - $${item.price}`;
            // Bouton pour retirer cet article précis du panier
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.textContent = '✕';
            removeBtn.setAttribute('aria-label', `Retirer ${item.name} du panier`);
            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
            li.appendChild(span);
            li.appendChild(removeBtn);
            cartItems.appendChild(li);

            // Ajouter le prix de l'article au total
            total += parseFloat(item.price);
        });
    }

    // Afficher le total avec 2 décimales
    cartTotal.textContent = total.toFixed(2);

    // Mettre à jour le badge du nombre d'articles sur l'icône panier
    updateCartBadge(cart.length);
}

// Crée/actualise un badge affichant le nombre d'articles dans le panier
function updateCartBadge(count) {
    const cartButton = document.getElementById('cart');
    let badge = document.getElementById('cart-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'cart-badge';
        cartButton.appendChild(badge);
    }
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
}

// Ajout au panier
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Récupérer le nom et le prix du produit
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        // Récupérer le panier actuel dans le localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ajouter le nouveau produit au panier
        cart.push({ name: productName, price: productPrice });

        // Sauvegarder le panier mis à jour dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Rafraîchir dynamiquement l'affichage du panier
        renderCart();

        // Confirmer l'ajout dans le panier
        alert(`${productName} a été ajouté au panier!`);
    });
});

// Affichage du panier
document.getElementById('cart').addEventListener('click', () => {
    const cartContent = document.getElementById('cart-content');

    // Toujours reconstruire l'affichage au moment de l'ouverture
    renderCart();

    // Rendre visible le panneau du panier
    cartContent.style.display = 'block';
});

// fermeture du panier
const closeCartButton = document.getElementById('close-cart');
closeCartButton.addEventListener('click', () =>{
    document.getElementById('cart-content').style.display = 'none'
})

// Sélectionner le bouton pour vider le panier
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    // Vider le localStorage
    localStorage.removeItem('cart');

    // Rafraîchir dynamiquement l'affichage du panier
    renderCart();
});

// Sélectionner le bouton pour valider la commande
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        // Générer un ID de commande aléatoire (à titre d'exemple uniquement)
        const orderId = Math.floor(Math.random() * 1000000);

        alert(`Commande validée! Numéro de commande: ${orderId}`);

        // Vider le panier après validation de la commande
        localStorage.removeItem('cart');
        renderCart();
    } else {

        // Empêche la validation si le panier est vide
        alert("Votre panier est vide, veuillez ajouter des articles avant de valider la commande.");
    }
});

document.addEventListener('DOMContentLoaded', renderCart);