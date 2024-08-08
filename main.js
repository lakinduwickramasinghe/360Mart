let listProductHTML = document.querySelector('.listProduct');
let listProducts = [];
let carts = JSON.parse(localStorage.getItem('cartInfo')) || [];


// Function to add data to HTML
const addDataToHTML = (category = null) => {
    listProductHTML.innerHTML = '';
    const filteredProducts = category ? listProducts.filter(product => product.category === category) : listProducts;

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.dataset.category = product.category;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="Picture of a/an ${product.name}" class="item-image">
                <span class="in-stock-label">In Stock</span>
                <h2>${product.name}</h2>
                <h3 class="price">Rs.${product.price} <span class="count">/kg</span>
                    <i class="fa fa-share"></i>
                    <i class="fa-regular fa-heart"></i>
                </h3>
                <label>QTY: </label>
                <input type="number" name="qty" class="qty" value="1">
                <button class="addCart">Add To Cart</button>
                <span class="discount">BEST SELLER</span>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
};

// Event listener for adding items to the cart
listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let productElement = positionClick.parentElement;
        let productId = productElement.dataset.id;
        let category = productElement.dataset.category;
        let quantity = productElement.querySelector('.qty').value || 1;
        if (['Fruits', 'Vegetables', 'Meat', 'Seafood'].includes(category)) {
            quantity = parseFloat(quantity);
        } else {
            quantity = parseInt(quantity);
        }
        addToCart(productId, quantity);
    }
});

// Function to add items to the cart
const addToCart = (productId, qty) => {
    let positionThisProductInCart = carts.findIndex((value) => value.productId == productId);
    qty = parseFloat(qty);
    if (carts.length <= 0) {
        carts = [{ productId: productId, quantity: qty }];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            productId: productId,
            quantity: qty
        });
    } else {
        carts[positionThisProductInCart].quantity += qty;
    }
    addToLocalStorage();
};

// Initialize the application
const initApp = () => {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();
            displayCart();
        })
        .catch(error => console.log(`Error - ${error}`));
};

// Display the cart
const displayCart = () => {
    let cartData = JSON.parse(localStorage.getItem('cartInfo')) || [];
    let tableBody = document.querySelector("#current-items tbody");
    tableBody.innerHTML = '';

    cartData.forEach(cartItem => {
        let product = listProducts.find(product => product.id == cartItem.productId);
        if (product) {
            let row = document.createElement('tr');
            let subTotal = (cartItem.quantity * product.price).toFixed(2);
            row.innerHTML = `
                <td><img src="${product.image}" alt="Picture of a/an ${product.name}" width="50"><br>${product.name}</td>
                <td>${cartItem.quantity}</td>
                <td>Rs.${subTotal}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    updateTotalPrice(cartData);
};

// Update the total price
const updateTotalPrice = (cartData) => {
    let totalPrice = cartData.reduce((total, cartItem) => {
        let product = listProducts.find(product => product.id == cartItem.productId);
        return total + (cartItem.quantity * product.price);
    }, 0).toFixed(2);

    document.getElementById("total-price").innerText = `Total : ₨ ${totalPrice}`;
};

// Add cart data to local storage
const addToLocalStorage = () => {
    localStorage.setItem('cartInfo', JSON.stringify(carts));
    displayCart();
};

// Event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    displayCart();
});

// Clear cart button event listener
let btnClear = document.getElementById('clear-cart-button');
btnClear.addEventListener('click', (event) => {
    localStorage.removeItem('cartInfo');
    carts = [];
    displayCart();
    location.reload();
});

// Add to favourites button event listener
let btnAddToFavourites = document.getElementById('fav');
btnAddToFavourites.addEventListener('click', () => {
    let cartData = JSON.parse(localStorage.getItem('cartInfo')) || [];
    localStorage.setItem('favourites', JSON.stringify(cartData));
});

// Apply favourites button event listener
let btnApplyFavourites = document.getElementById('apply-favourites-button');
btnApplyFavourites.addEventListener('click', () => {
    let favouritesData = JSON.parse(localStorage.getItem('favourites')) || [];
    favouritesData.forEach(favItem => {
        let positionThisProductInCart = carts.findIndex(cartItem => cartItem.productId == favItem.productId);
        if (positionThisProductInCart < 0) {
            carts.push(favItem);
        } else {
            carts[positionThisProductInCart].quantity += favItem.quantity;
        }
    });
    addToLocalStorage();
});

// Category buttons event listener
document.querySelector('.category-buttons').addEventListener('click', (event) => {
    if (event.target.classList.contains('category-btn')) {
        const category = event.target.dataset.category;
        addDataToHTML(category);
    }
});

