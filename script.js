// Mood selection from index.html
function selectMood(mood){
    localStorage.setItem("selectedMood", mood);
    window.location.href = "products.html";
}

// Product data based on mood
const products = {
    happy: [
        { name: "Colorful Gift Box", price: "₹299", img: "https://picsum.photos/200?1" },
        { name: "Trendy Watch", price: "₹499", img: "https://picsum.photos/200?2" },
        { name: "Cute Accessories", price: "₹199", img: "https://picsum.photos/200?3" }
    ],
    sad: [
        { name: "Soft Toy", price: "₹399", img: "https://picsum.photos/200?4" },
        { name: "Scented Candle", price: "₹250", img: "https://picsum.photos/200?5" },
        { name: "Comfort Pillow", price: "₹599", img: "https://picsum.photos/200?6" }
    ],
    stressed: [
        { name: "Relaxing Journal", price: "₹199", img: "https://picsum.photos/200?7" },
        { name: "Skincare Kit", price: "₹450", img: "https://picsum.photos/200?8" },
        { name: "Calming Tea Pack", price: "₹150", img: "https://picsum.photos/200?9" }
    ],
    bored: [
        { name: "Puzzle Game", price: "₹299", img: "https://picsum.photos/200?10" },
        { name: "Story Book", price: "₹199", img: "https://picsum.photos/200?11" },
        { name: "DIY Craft Kit", price: "₹350", img: "https://picsum.photos/200?12" }
    ],
    excited: [
        { name: "Fashion Sunglasses", price: "₹399", img: "https://picsum.photos/200?13" },
        { name: "Mini Gadget", price: "₹599", img: "https://picsum.photos/200?14" },
        { name: "Trendy Bag", price: "₹799", img: "https://picsum.photos/200?15" }
    ]
};

// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart function
function addToCart(product){
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Buy Now function (simulated)
function buyNow(product){
    let today = new Date().toLocaleDateString();
    let confirmOrder = confirm(`Do you want to buy "${product.name}"?\nDelivery date: ${today}`);
    if(confirmOrder){
        alert("Order Confirmed! Thank you for shopping 😊");
    } else {
        alert("Order Cancelled");
    }
}
// Show products page
if(window.location.pathname.includes("products.html")){
    let mood = localStorage.getItem("selectedMood");
    document.getElementById("moodTitle").innerText = `Products for: ${mood}`;
    let container = document.getElementById("productContainer");
    products[mood].forEach(item => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <button class="add-btn" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
                <button class="add-btn" onclick='buyNow(${JSON.stringify(item)})'>Buy Now</button>
            </div>
        `;
    });
}

// Show cart page
if(window.location.pathname.includes("cart.html")){
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");
    container.innerHTML = ""; // clear previous
    if(cartItems.length === 0){
        container.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItems.forEach((item, index) => {
            container.innerHTML += `
                <div class="product-card">
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <button class="back-btn" onclick='removeFromCart(${index})'>Remove</button>
                </div>
            `;
        });

        // Empty Cart button
        container.innerHTML += `<button class="back-btn" onclick="emptyCart()">Empty Cart 🗑️</button>`;
    }
}

// Remove a single item from cart
function removeFromCart(index){
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1); // remove the clicked item
    localStorage.setItem("cart", JSON.stringify(cartItems));
    location.reload(); // refresh cart page
}

// Remove all items from cart
function emptyCart(){
    localStorage.removeItem("cart");
    location.reload();
}

// Go back button function
function goBack(){
    if(window.location.pathname.includes("products.html")){
        window.location.href = "index.html";
    } else if(window.location.pathname.includes("cart.html")){
        window.location.href = "products.html";
    }
}

// Show orders page
if(window.location.pathname.includes("orders.html")){
    let orders = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("ordersList");

    if(orders.length === 0){
        container.innerHTML = "<p>You have no orders yet.</p>";
    } else {
        orders.forEach(item => {
            container.innerHTML += `
                <div class="product-card">
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <p>Order Confirmed ✅</p>
                </div>
            `;
        });
    }
}
function getCoupon() {
    const coupons = [
        "🎉 10% OFF on your next purchase!",
        "🎁 Free shipping coupon!",
        "🔥 50₹ off on minimum 300₹ purchase!",
        "💖 Buy 1 Get 1 Free offer!",
        "🎊 Surprise discount! Check at checkout."
    ];
    const randomIndex = Math.floor(Math.random() * coupons.length);
    document.getElementById("couponResult").innerText = coupons[randomIndex];
}