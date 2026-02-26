/* ========================================
   TSK'S BIBLIOTECH - SCRIPT PRINCIPAL
   ======================================== */

// ========================================
// VARIABLES GLOBALES
// ========================================

const body = document.body;
const header = document.querySelector('header');
const backToTopBtn = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('nav a');

// ========================================
// MENU MOBILE RESPONSIVE
// ========================================

function createMobileMenu() {
  const nav = document.querySelector('nav');
  
  const navUl = document.querySelector('nav ul');
  
  // Créer le bouton hamburger si pas encore créé
  if (!document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    
    nav.insertBefore(menuToggle, document.querySelector('nav ul'));
    
    // Event listener pour le toggle
    menuToggle.addEventListener('click', () => {
      (document.querySelector('nav ul')).classList.toggle('active');
      menuToggle.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
    
    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        (document.querySelector('nav ul')).classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
    
    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && (document.querySelector('nav ul')).classList.contains('active')) {
        (document.querySelector('nav ul')).classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }
}

// ========================================
// HEADER STICKY AVEC EFFET SCROLL
// ========================================

function handleHeaderScroll() {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// ========================================
// BOUTON RETOUR EN HAUT
// ========================================

function handleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.opacity = '1';
  } else {
    backToTopBtn.style.opacity = '0';
    setTimeout(() => {
      if (window.scrollY <= 300) {
        backToTopBtn.style.display = 'none';
      }
    }, 300);
  }
}

// Smooth scroll pour le bouton
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// ANIMATION AU SCROLL (Intersection Observer)
// ========================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        // Ne plus observer après l'animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Éléments à animer
  const animatedElements = document.querySelectorAll(`
    .book-card,
    .blog-card,
    .category-item,
    .category-full,
    .value-item,
    .stat-item,
    .contact-item,
    .faq-item
  `);
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ========================================
// VALIDATION DE FORMULAIRES
// ========================================

// Validation de la newsletter
function validateNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (validateEmail(email)) {
        showNotification('Merci ! Vous êtes inscrit à notre newsletter 📧', 'success');
        emailInput.value = '';
      } else {
        showNotification('Veuillez entrer une adresse email valide', 'error');
      }
    });
  });
}

// Validation du formulaire de recherche
function validateSearchForm() {
  const searchForm = document.querySelector('.search-form');
  
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const searchInput = searchForm.querySelector('input[type="search"]');
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm.length >= 2) {
        showNotification(`Recherche en cours pour "${searchTerm}"... 🔍`, 'info');
        // Ici, vous pourrez ajouter la vraie logique de recherche
        setTimeout(() => {
          showNotification('Résultats de recherche prêts !', 'success');
        }, 1500);
      } else {
        showNotification('Veuillez entrer au moins 2 caractères', 'error');
      }
    });
  }
}

// Validation du formulaire de commande spécifique
function validateOrderForm() {
  const orderForm = document.querySelector('.order-form');
  
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const bookTitle = document.getElementById('book-title').value.trim();
      const customerName = document.getElementById('customer-name').value.trim();
      const customerEmail = document.getElementById('customer-email').value.trim();
      
      if (bookTitle && customerName && validateEmail(customerEmail)) {
        showNotification('Votre demande a été envoyée avec succès ! Nous vous contacterons sous 48h 📚', 'success');
        orderForm.reset();
      } else {
        showNotification('Veuillez remplir tous les champs obligatoires correctement', 'error');
      }
    });
  }
}

// Validation du formulaire de contact
function validateContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value.trim();
      
      if (name && validateEmail(email) && subject && message.length >= 10) {
        showNotification('Message envoyé avec succès ! Nous vous répondrons bientôt 💬', 'success');
        contactForm.reset();
      } else {
        showNotification('Veuillez remplir tous les champs correctement (message minimum 10 caractères)', 'error');
      }
    });
  }
}

// Fonction de validation d'email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========================================
// SYSTÈME DE NOTIFICATIONS
// ========================================

function showNotification(message, type = 'info') {
  // Supprimer l'ancienne notification si elle existe
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Créer la notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
  
  notification.innerHTML = `
    <span class="notification-icon">${icon}</span>
    <span class="notification-message">${message}</span>
    <button class="notification-close">&times;</button>
  `;
  
  body.appendChild(notification);
  
  // Animation d'entrée
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Bouton de fermeture
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    hideNotification(notification);
  });
  
  // Auto-fermeture après 5 secondes
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);
}

function hideNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    notification.remove();
  }, 300);
}

// ========================================
// CARROUSEL DE LIVRES EN VEDETTE
// ========================================

function initBooksCarousel() {
  const booksGrid = document.querySelector('.featured-books .books-grid');
  
  if (booksGrid && booksGrid.children.length > 3) {
    // Créer les boutons de navigation
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-prev';
    prevBtn.innerHTML = '❮';
    prevBtn.setAttribute('aria-label', 'Précédent');
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-next';
    nextBtn.innerHTML = '❯';
    nextBtn.setAttribute('aria-label', 'Suivant');
    
    const container = booksGrid.parentElement;
    container.style.position = 'relative';
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    
    let currentIndex = 0;
    const cards = Array.from(booksGrid.children);
    const cardsPerView = window.innerWidth <= 768 ? 1 : 3;
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    
    function updateCarousel() {
      const offset = -(currentIndex * (100 / cardsPerView));
      booksGrid.style.transform = `translateX(${offset}%)`;
      
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    // Auto-play (optionnel)
    let autoplayInterval;
    
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }, 5000);
    }
    
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }
    
    // Démarrer l'autoplay
    startAutoplay();
    
    // Arrêter l'autoplay au survol
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
    
    updateCarousel();
  }
}

// ========================================
// COMPTEUR ANIMÉ POUR LES STATISTIQUES
// ========================================

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString() + '+';
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

// ========================================
// FILTRAGE DES CATÉGORIES
// ========================================

function initCategoryFilter() {
  const searchFilters = document.querySelectorAll('.search-filters input[type="checkbox"]');
  
  searchFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      const activeFilters = Array.from(searchFilters)
        .filter(f => f.checked)
        .map(f => f.value);
      
      if (activeFilters.length > 0) {
        showNotification(`Filtres actifs : ${activeFilters.join(', ')}`, 'info');
      }
    });
  });
}

// ========================================
// ACCORDÉON FAQ AMÉLIORÉ
// ========================================

function enhanceFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    summary.addEventListener('click', (e) => {
      // Fermer les autres items ouverts
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.hasAttribute('open')) {
          otherItem.removeAttribute('open');
        }
      });
    });
  });
}

// ========================================
// LAZY LOADING DES IMAGES
// ========================================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ========================================
// RECHERCHE EN TEMPS RÉEL
// ========================================

function initLiveSearch() {
  const searchInput = document.querySelector('.search-form input[type="search"]');
  
  if (searchInput) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      
      const searchTerm = e.target.value.trim();
      
      if (searchTerm.length >= 2) {
        searchTimeout = setTimeout(() => {
          // Simuler une recherche (à remplacer par une vraie recherche)
          console.log(`Recherche en cours : ${searchTerm}`);
          // Afficher les résultats ici
        }, 500);
      }
    });
  }
}

// ========================================
// GESTION DES FAVORIS (LocalStorage)
// ========================================

function initFavorites() {
  const favoriteButtons = document.querySelectorAll('.btn-favorite');
  
  // Charger les favoris depuis le localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  favoriteButtons.forEach(btn => {
    const bookId = btn.dataset.bookId;
    
    // Mettre à jour l'apparence si déjà en favoris
    if (favorites.includes(bookId)) {
      btn.classList.add('active');
      btn.innerHTML = '❤️ Retiré des favoris';
    }
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (favorites.includes(bookId)) {
        // Retirer des favoris
        favorites = favorites.filter(id => id !== bookId);
        btn.classList.remove('active');
        btn.innerHTML = '🤍 Ajouter aux favoris';
        showNotification('Retiré des favoris', 'info');
      } else {
        // Ajouter aux favoris
        favorites.push(bookId);
        btn.classList.add('active');
        btn.innerHTML = '❤️ Retiré des favoris';
        showNotification('Ajouté aux favoris !', 'success');
      }
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });
}

// ========================================
// MODAL POUR DÉTAILS DES LIVRES
// ========================================

function initBookModals() {
  const bookCards = document.querySelectorAll('.book-card');
  
  bookCards.forEach(card => {
    const detailBtn = card.querySelector('.btn-small');
    
    if (detailBtn && detailBtn.textContent.includes('Voir détails')) {
      detailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Récupérer les informations du livre
        const title = card.querySelector('h3').textContent;
        const author = card.querySelector('.author').textContent;
        const description = card.querySelector('.description').textContent;
        const category = card.querySelector('.category').textContent;
        
        // Créer et afficher la modal
        showBookModal({
          title,
          author,
          description,
          category,
          cover: card.querySelector('.book-cover img')?.src || ''
        });
      });
    }
  });
}

function showBookModal(bookData) {
  // Créer la modal
  const modal = document.createElement('div');
  modal.className = 'book-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <div class="modal-body">
        <div class="modal-image">
          <img src="${bookData.cover}" alt="${bookData.title}">
        </div>
        <div class="modal-info">
          <h2>${bookData.title}</h2>
          <p class="modal-author">${bookData.author}</p>
          <p class="modal-category">${bookData.category}</p>
          <p class="modal-description">${bookData.description}</p>
          <div class="modal-actions">
            <button class="btn btn-primary">📥 Emprunter</button>
            <button class="btn btn-secondary">🤍 Favoris</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  body.appendChild(modal);
  body.style.overflow = 'hidden';
  
  // Animation d'ouverture
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  // Fermer la modal
  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
      body.style.overflow = '';
    }, 300);
  };
  
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
  
  // Empêcher la fermeture en cliquant sur le contenu
  modal.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Fermer avec la touche Escape
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

// ========================================
// NAVIGATION ACTIVE
// ========================================

function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ========================================
// LOADER DE PAGE
// ========================================

function initPageLoader() {
  // Créer le loader
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-spinner"></div>
    <p>Chargement de Tsk's BiblioTech...</p>
  `;
  
  body.prepend(loader);
  
  // Masquer le loader quand la page est chargée
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  });
}

// ========================================
// INITIALISATION AU CHARGEMENT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Tsk\'s BiblioTech initialisé !');
  
  // Initialiser le loader
  initPageLoader();
  
  // Créer le menu mobile
  createMobileMenu();
  
  // Initialiser les animations au scroll
  initScrollAnimations();
  
  // Valider les formulaires
  validateNewsletterForm();
  validateSearchForm();
  validateOrderForm();
  validateContactForm();
  
  // Initialiser le carrousel
  initBooksCarousel();
  
  // Animer les compteurs
  animateCounters();
  
  // Initialiser les filtres
  initCategoryFilter();
  
  // Améliorer la FAQ
  enhanceFAQ();
  
  // Lazy loading des images
  initLazyLoading();
  
  // Recherche en temps réel
  initLiveSearch();
  
  // Gestion des favoris
  initFavorites();
  
  // Modals pour les livres
  initBookModals();
  
  // Navigation active
  highlightActiveSection();
});

// Event listeners pour le scroll
window.addEventListener('scroll', () => {
  handleHeaderScroll();
  handleBackToTop();
});

// Gestion du redimensionnement de la fenêtre
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log('Fenêtre redimensionnée');
    // Réinitialiser certaines fonctionnalités si nécessaire
  }, 250);
});


// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log(`
%c
╔════════════════════════════════════════╗
║   TSK'S BIBLIOTECH - 2025            ║
║   Votre portail vers le savoir        ║
║   Développé avec ❤️ pour l'Afrique   ║
╚════════════════════════════════════════╝
`, 'color: #3498db; font-weight: bold; font-size: 12px;');

