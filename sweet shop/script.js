// Product Database - Indian Sweets & Snacks
const products = [
    {
        id: 1,
        name: 'Mysore Pak',
        price: 299,
        originalPrice: 399,
        category: 'sweets',
        description: 'Traditional Mysore Pak - gram flour, ghee & jaggery',
        image: '/assets/images/mysore_pak.svg',
        rating: 5
    },
    {
        id: 2,
        name: 'Kaju Katli',
        price: 349,
        originalPrice: 449,
        category: 'sweets',
        description: 'Premium cashew fudge with traditional taste',
        image: '/assets/images/kaju_katli.svg',
        rating: 5
    },
    {
        id: 3,
        name: 'Gulab Jamun',
        price: 199,
        category: 'sweets',
        description: 'Soft milk solids in sugar syrup - 500g',
        image: '/assets/images/gulab_jamun.svg',
        rating: 4.5
    },
    {
        id: 4,
        name: 'Chikhalwali Chikni',
        price: 249,
        originalPrice: 329,
        category: 'sweets',
        description: 'Handmade chikhalwali laddu with finest dry fruits',
        image: '/assets/images/chikhalwali.svg',
        rating: 5
    },
    {
        id: 5,
        name: 'Premium Dry Fruits Mix',
        price: 399,
        category: 'dryfruits',
        description: 'Almonds, cashews, pistachios - 250g premium blend',
        image: '/assets/images/dry_fruit_mix.svg',
        rating: 4.5
    },
    {
        id: 6,
        name: 'Jaggery Sweet Barfi',
        price: 179,
        category: 'sweets',
        description: 'Pure jaggery with ghee - health conscious choice',
        image: '/assets/images/jaggery_sweet.svg',
        rating: 5
    },
    {
        id: 7,
        name: 'Rasmalai',
        price: 279,
        category: 'sweets',
        description: 'Soft cheese dumplings in creamy malai - 500g',
        image: '/assets/images/rasmalai.svg',
        rating: 4.5
    },
    {
        id: 8,
        name: 'Badam Barfi',
        price: 329,
        category: 'sweets',
        description: 'Almond fudge with premium almonds and ghee',
        image: '/assets/images/badam_barfi.svg',
        rating: 5
    },
    {
        id: 9,
        name: 'Kheer Pak',
        price: 259,
        originalPrice: 329,
        category: 'sweets',
        description: 'Rice pudding fudge - traditional royal recipe',
        image: '/assets/images/kheer.svg',
        rating: 5
    },
    {
        id: 10,
        name: 'Traditional Jalebi',
        price: 149,
        category: 'snacks',
        description: 'Crispy spiral sweets in sugar syrup - 250g',
        image: '/assets/images/jalebi.svg',
        rating: 4.5
    },
    {
        id: 11,
        name: 'Gujhiya Mix Pack',
        price: 399,
        category: 'sweets',
        description: 'Assorted gujhiya with dry fruits - festival special',
        image: '/assets/images/gujhiya.svg',
        rating: 5
    },
    {
        id: 12,
        name: 'Peda Assortment',
        price: 279,
        category: 'sweets',
        description: 'Mixed pedhas - Desi ghee, malai, chocolate - 300g',
        image: '/assets/images/peda.svg',
        rating: 5
    }
];

let cart = [];
let currentFilter = 'all';
let currentSlide = 0;

// Carousel slides
const carouselSlides = [
    {
        title: "Banti's Authentic Sweets",
        subtitle: "Traditional Indian sweets made with premium ingredients & pure ghee",
        gradient: "linear-gradient(135deg, #7a2a2a 0%, #d4af37 100%)",
        image: '/assets/images/carousel_slide1.svg'
    },
    {
        title: "Premium Dry Fruits",
        subtitle: "Hand-selected almonds, cashews, and pistachios from the finest orchards",
        gradient: "linear-gradient(135deg, #d4af37 0%, #7a2a2a 100%)",
        image: '/assets/images/carousel_slide2.svg'
    },
    {
        title: "Festival & Gifting",
        subtitle: "Beautifully packaged gift hampers for every celebration & occasion",
        gradient: "linear-gradient(135deg, #5a1a1a 0%, #d4af37 100%)",
        image: '/assets/images/carousel_slide3.svg'
    }
];

// Initialize carousel on page load
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // Create slides
        carouselSlides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'carousel-slide' + (index === 0 ? ' active' : '');
            slideDiv.style.background = slide.gradient;
            
            slideDiv.innerHTML = `
                <div class="slide-content">
                    <h1>${slide.title}</h1>
                    <p>${slide.subtitle}</p>
                    <button class="btn btn-gold" onclick="document.querySelector('.products-section').scrollIntoView({behavior: 'smooth'})">Shop Now</button>
                </div>
                <div class="slide-image">
                    <img src="${slide.image}" alt="${slide.title}">
                </div>
            `;
            
            carousel.appendChild(slideDiv);
        });
        
        // Start auto-rotation
        setInterval(nextSlide, 5000);
    }
}

// Next slide
function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Previous slide
function previousSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Setup carousel control buttons
function setupCarouselControls() {
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (prevBtn) prevBtn.addEventListener('click', previousSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    setupCarouselControls();
    
    fetchProductsFromAPI().then(() => {
        loadProducts('all');
        loadBestsellers();
        loadCart();
        setupScrollAnimation();
    }).catch(() => {
        // fallback to embedded products if API not available
        loadProducts('all');
        loadBestsellers();
        loadCart();
        setupScrollAnimation();
    });
    
    // Set initial active filter button
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns[0].classList.add('active');
    }
});

// Translations
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.about': 'About',
        'nav.reviews': 'Reviews',
        'nav.contact': 'Contact',
        'hero.title': 'Welcome to Sweet Paradise',
        'hero.subtitle': 'Discover the finest selection of premium sweets and candies',
        'hero.cta': 'Shop Now',
        'featured.title': 'Featured Treats',
        'products.title': 'All Products',
        'filter.all': 'All',
        'filter.chocolate': 'Chocolate',
        'filter.gummy': 'Gummy',
        'filter.hard': 'Hard Candy',
        'about.title': 'About Sweet Paradise',
        'about.text': 'Sweet Paradise is your ultimate destination for premium candies and sweets. With over 20 years of experience, we bring you the finest selection of treats from around the world.',
        'about.feature1': 'Premium Quality Products',
        'about.feature2': 'Fast Delivery Service',
        'about.feature3': '100% Satisfaction Guarantee',
        'about.feature4': 'Eco-friendly Packaging',
        'contact.title': 'Get In Touch',
        'contact.name': 'Your Name',
        'contact.email': 'Your Email',
        'contact.message': 'Your Message',
        'contact.send': 'Send Message',
        'footer.title': 'Sweet Paradise',
        'footer.tag': 'Premium sweets & candies by Banti Kumar Yadav. Your trusted source for finest treats.'
    },
    hi: {
        'nav.home': 'होम',
        'nav.products': 'प्रोडक्ट्स',
        'nav.about': 'हमारे बारे में',
        'nav.reviews': 'समीक्षा',
        'nav.contact': 'संपर्क',
        'hero.title': 'स्वीट पैराडाइज़ में आपका स्वागत है',
        'hero.subtitle': 'प्रीमियम मिठाइयों और कैंडीज का सर्वश्रेष्ठ चयन देखें',
        'hero.cta': 'अभी खरीदें',
        'featured.title': 'फ़ीचर्ड ट्रीट्स',
        'products.title': 'सभी प्रोडक्ट्स',
        'filter.all': 'सभी',
        'filter.chocolate': 'चॉकलेट',
        'filter.gummy': 'जैली',
        'filter.hard': 'हार्ड कैंडी',
        'about.title': 'स्वीट पैराडाइज़ के बारे में',
        'about.text': 'स्वीट पैराडाइज़ प्रीमियम कैंडीज और मिठाइयों का आपका स्थान है। 20 वर्षों के अनुभव के साथ हम दुनिया भर की बेहतरीन मिठाइयां लाते हैं।',
        'about.feature1': 'प्रीमियम गुणवत्ता उत्पाद',
        'about.feature2': 'तेज़ डिलीवरी सेवा',
        'about.feature3': '100% संतोष गारंटी',
        'about.feature4': 'इको-फ्रेंडली पैकेजिंग',
        'contact.title': 'संपर्क करें',
        'contact.name': 'आपका नाम',
        'contact.email': 'आपका ईमेल',
        'contact.message': 'आपका संदेश',
        'contact.send': 'संदेश भेजें',
        'footer.title': 'स्वीट पैराडाइज़',
        'footer.tag': 'Banti Kumar Yadav द्वारा प्रीमियम मिठाइयाँ। आपका भरोसेमंद स्रोत।'
    }
};

function applyTranslations(lang) {
    const elems = document.querySelectorAll('[data-i18]');
    elems.forEach(el => {
        const key = el.getAttribute('data-i18');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    const placeholders = document.querySelectorAll('[data-i18-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // update active lang button styles
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('lang-' + lang);
    if (btn) btn.classList.add('active');
}

function setLang(lang) {
    localStorage.setItem('site_lang', lang);
    applyTranslations(lang);
}

// initialize language
const savedLang = localStorage.getItem('site_lang') || 'en';
document.addEventListener('DOMContentLoaded', function initLang() {
    applyTranslations(savedLang);
});

// Fetch products from backend API and replace local products array
function fetchProductsFromAPI() {
    return fetch('/api/products')
        .then(res => {
            if (!res.ok) throw new Error('No API');
            return res.json();
        })
        .then(data => {
            if (data && data.products && Array.isArray(data.products)) {
                // replace products
                products.length = 0;
                data.products.forEach(p => products.push(p));
            }
        });
}

// Load and display products
function loadProducts(filter) {
    currentFilter = filter;
    const productsGrid = document.getElementById('productsGrid');
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    productsGrid.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        setTimeout(() => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        }, index * 50);
    });
}

// Load bestsellers
function loadBestsellers() {
    const bestsellersGrid = document.getElementById('bestsellersGrid');
    if (!bestsellersGrid) return;
    
    const bestsellers = products.filter(p => p.rating >= 4.5).slice(0, 4);
    bestsellersGrid.innerHTML = '';
    
    bestsellers.forEach((product, index) => {
        setTimeout(() => {
            const productCard = createProductCard(product);
            bestsellersGrid.appendChild(productCard);
        }, index * 50);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? '½' : '');
    const priceHTML = product.originalPrice ? 
        `<span class="original">₹${product.originalPrice.toFixed(0)}</span><span class="sale">₹${product.price.toFixed(0)}</span>` :
        `<span class="sale">₹${product.price.toFixed(0)}</span>`;
    
    // resolve image paths: if image path is local (starts with /assets), prefix with frontend origin
    let imgSrc = product.image || '/assets/images/hard_candy_assortment.svg';
    if (imgSrc.startsWith('/assets') || imgSrc.startsWith('assets')) {
        // prefix with current origin so browser requests the asset from the frontend server
        imgSrc = window.location.origin + (imgSrc.startsWith('/') ? imgSrc : '/' + imgSrc);
    }

    card.innerHTML = `
        <div class="product-image">
            <img src="${imgSrc}" alt="${product.name}">
            <span class="badge">Premium</span>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <div class="rating" title="${product.rating} stars">${stars}</div>
            <div class="price">
                ${priceHTML}
            </div>
            <button class="btn btn-add" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Add to cart function
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${productName} added to cart!`);
}

// Remove from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    updateCartDisplay();
}

// Update cart quantity
function updateQuantity(productName, quantity) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity = Math.max(1, quantity);
        if (item.quantity === 0) {
            removeFromCart(productName);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    
    let totalItems = 0;
    let totalPrice = 0;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(0)}</p>
                    <div style="margin-top: 0.5rem;">
                        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})" style="padding: 0.2rem 0.5rem;">-</button>
                        <span style="margin: 0 0.5rem;">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})" style="padding: 0.2rem 0.5rem;">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartCount.textContent = totalItems;
    }
    
    document.querySelector('.total-price').textContent = `₹${totalPrice.toFixed(0)}`;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('sweetShopCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('sweetShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Filter products
function filterProducts(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadProducts(category);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    // send order to backend
    const orderPayload = {
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        total: total,
        items: cart.map(i => ({name: i.name, price: i.price, quantity: i.quantity}))
    };

    fetch('/api/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderPayload)
    }).then(r => r.json()).then(resp => {
        if (resp && resp.order_id) {
            alert(`Thank you for your order!\nOrder ID: ${resp.order_id} \nTotal: ₹${total.toFixed(0)}`);
            cart = [];
            saveCart();
            updateCartDisplay();
            toggleCart();
        } else {
            alert('Order received but no confirmation.');
        }
    }).catch(err => {
        console.error(err);
        alert(`Order failed to send to server. Your order is saved in cart.`);
    });
}

// Contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const message = event.target.elements[2].value;
    
    alert(`Thank you, ${name}!\n\nWe received your message and will respond to ${email} within 24 hours.`);
    
    event.target.reset();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 300;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup scroll animation
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add slideOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Search functionality
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchQuery = prompt('Search for sweets:');
    if (searchQuery) {
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '';
        
        if (filtered.length === 0) {
            productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found for "' + searchQuery + '"</p>';
        } else {
            filtered.forEach(product => {
                productsGrid.appendChild(createProductCard(product));
            });
        }
    }
});

// Add to cart from featured section
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-add')) {
        e.preventDefault();
    }
});

// Newsletter subscription
document.addEventListener('keypress', function(e) {
    if (e.target.closest('.newsletter') && e.target.tagName === 'INPUT' && e.key === 'Enter') {
        const email = e.target.value;
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            e.target.value = '';
        }
    }
});

// Newsletter button click
document.addEventListener('click', function(e) {
    if (e.target.closest('.newsletter') && e.target.classList.contains('btn')) {
        const input = e.target.closest('.newsletter').querySelector('input');
        if (input.value) {
            alert(`Thank you for subscribing with ${input.value}!`);
            input.value = '';
        } else {
            alert('Please enter your email address');
        }
    }
});

// Toggle FAQ
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allQuestions = document.querySelectorAll('.faq-question');
    
    // Close all other FAQs
    allAnswers.forEach(ans => {
        if (ans !== answer) {
            ans.style.display = 'none';
        }
    });
    
    allQuestions.forEach(q => {
        if (q !== button) {
            q.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
        button.classList.add('active');
        answer.style.animation = 'slideDown 0.3s ease-out';
    } else {
        answer.style.display = 'none';
        button.classList.remove('active');
    }
}
