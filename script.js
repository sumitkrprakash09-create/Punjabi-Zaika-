const menuItems = [
{
name: "Paneer Butter Masala",
description: "Soft paneer in a rich, creamy tomato gravy.",
price: 249,
image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
},
{
name: "Dal Makhani",
description: "Slow-cooked black lentils with buttery flavours.",
price: 199,
image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
},
{
name: "Butter Naan",
description: "Soft Indian bread brushed with melted butter.",
price: 49,
image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
},
{
name: "Shahi Paneer",
description: "Paneer cooked in a rich, mildly spiced gravy.",
price: 229,
image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
},
{
name: "Chole Bhature",
description: "Spicy chickpea curry served with fluffy bhature.",
price: 149,
image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80"
},
{
name: "Veg Biryani",
description: "Fragrant rice cooked with vegetables and spices.",
price: 179,
image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
},
{
name: "Masala Dosa",
description: "Crispy dosa filled with seasoned potato masala.",
price: 129,
image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
},
{
name: "Gulab Jamun",
description: "Soft, sweet dumplings soaked in sugar syrup.",
price: 79,
image: "https://images.unsplash.com/photo-1666190092159-3a3c2d0b6c8b?auto=format&fit=crop&w=600&q=80"
},
{
name: "Mango Lassi",
description: "A refreshing yoghurt drink blended with mango.",
price: 89,
image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80"
}
];


const menuGrid = document.getElementById("menu-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

const cart = [];

menuItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "food-card";

    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="food-image">

        <div class="food-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>

            <div class="food-bottom">
                <span class="food-price">₹${item.price}</span>
                <button class="add-button" type="button" data-index="${index}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    menuGrid.appendChild(card);
});

function addToCart(index) {
    const item = menuItems[index];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    renderCart();
}

function renderCart() {
    cartItemsContainer.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your cart is empty.";
        cartItemsContainer.appendChild(emptyMessage);
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const description = document.createElement("span");
        description.textContent =
            `${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-button";
        removeButton.type = "button";

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        row.append(description, removeButton);
        cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = total;
}

menuGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-index]");

    if (button) {
        addToCart(Number(button.dataset.index));
    }
});

clearCartButton.addEventListener("click", () => {
    cart.length = 0;
    renderCart();
});

renderCart();