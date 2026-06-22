// ============================================
// STACKLY - Main Application Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  if (window.StacklyAuth) StacklyAuth.init();
  if (window.StacklyAnimations) StacklyAnimations.init();

  // Initialize page-specific features
  initNavigation();
  initMobileMenu();
  initCurrentPage();
  initHeroParticles();
  initReelsScroll();
  initPostInteractions();
  initFriendCards();
  initMessagePreview();
  initSmoothScroll();
  initBackToTop();
  initSearchOverlay();
});

// Navigation active state
function initNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('../', '').replace('./', ''))) {
      link.classList.add('active');
    }
    // Handle root index
    if ((currentPath.endsWith('/') || currentPath.endsWith('index.html')) && href === 'index.html') {
      link.classList.add('active');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Reset when switching to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('mobile-open');
        navLinks.removeAttribute('style');
      }
    });
  }
}

// Initialize current page features
function initCurrentPage() {
  const path = window.location.pathname;

  if (path.includes('index.html') || path.endsWith('/')) {
    initHomePage();
  } else if (path.includes('login.html')) {
    initLoginPage();
  } else if (path.includes('register.html')) {
    initRegisterPage();
  } else if (path.includes('admin-dashboard.html')) {
    initAdminDashboard();
  } else if (path.includes('user-dashboard.html')) {
    initUserDashboard();
  } else if (path.includes('contact.html')) {
    initContactPage();
  }
}

// Home page initialization
function initHomePage() {
  renderPosts();
  renderReels();
  renderFriends();
  renderMessages();
}

// Render posts
function renderPosts() {
  const container = document.getElementById('posts-container');
  if (!container || !window.StacklyData) return;

  const posts = StacklyData.posts;
  container.innerHTML = posts.map((post, i) => `
    <article class="post-card reveal" data-delay="${i * 0.1}">
      <div class="post-header">
        <div class="post-avatar">${post.avatar}</div>
        <div class="post-user-info">
          <div class="post-username">${post.username}</div>
          <div class="post-time">${post.time}</div>
        </div>
        <div class="post-menu">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="3" r="1.5"/>
            <circle cx="8" cy="8" r="1.5"/>
            <circle cx="8" cy="13" r="1.5"/>
          </svg>
        </div>
      </div>
      <div class="post-image">
        <img src="${post.image}" alt="Post by ${post.username}" loading="lazy" onerror="this.parentElement.innerHTML='<span style=font-size:3rem>${post.imageIcon}</span>'">
      </div>
      <div class="post-content">
        <p class="post-text">${post.text}</p>
        <div class="post-actions">
          <span class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike(this, ${post.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${post.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span class="count">${post.likes.toLocaleString()}</span>
          </span>
          <span class="post-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span class="count">${post.comments}</span>
          </span>
          <span class="post-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span class="count">${post.shares}</span>
          </span>
          <span class="post-action ${post.saved ? 'saved' : ''}" onclick="toggleSave(this)" style="margin-left:auto">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${post.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  `).join('');
}

// Render reels
function renderReels() {
  const container = document.getElementById('reels-container');
  if (!container || !window.StacklyData) return;

  const reels = StacklyData.reels;
  container.innerHTML = reels.map(reel => `
    <div class="reel-card reveal-scale" onclick="playReel(${reel.id})">
      <video class="reel-video"
       muted
       loop
       autoplay
       playsinline>
    <source src="${reel.video}" type="video/mp4">
</video>
      <div class="reel-card-overlay">
        <div class="reel-play">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
        <div class="reel-avatar">${reel.avatar}</div>
        <div class="reel-username">${reel.username}</div>
        <div class="reel-views">${reel.views} views</div>
      </div>
    </div>
  `).join('');
}

// Render friends
function renderFriends() {
  const container = document.getElementById('friends-container');
  if (!container || !window.StacklyData) return;

  const friends = StacklyData.users;
  container.innerHTML = friends.map((friend, i) => `
    <div class="friend-card reveal" data-delay="${i * 0.08}">
      <div class="friend-avatar">
        ${friend.avatar}
        <span class="friend-status ${friend.online ? 'online' : 'offline'}"></span>
      </div>
      <div class="friend-name">${friend.name}</div>
      <div class="friend-handle">${friend.handle}</div>
      <div class="friend-stats">
        <span class="friend-stat"><strong>${friend.followers}</strong> followers</span>
        <span class="friend-stat"><strong>${friend.following}</strong> following</span>
      </div>
      <button class="btn btn-outline btn-sm" onclick="toggleFollow(this)">Follow</button>
    </div>
  `).join('');
}

// Render messages preview
function renderMessages() {
  const container = document.getElementById('messages-container');
  if (!container || !window.StacklyData) return;

  const messages = StacklyData.messages;
  container.innerHTML = messages.map(msg => `
    <div class="message-item ${msg.unread > 0 ? 'unread' : ''}">
      <div class="message-avatar">${msg.avatar}</div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-name">${msg.name}</span>
          <span class="message-time">${msg.time}</span>
        </div>
        <div class="message-preview">${msg.preview}</div>
      </div>
      ${msg.unread > 0 ? `<div class="message-badge">${msg.unread}</div>` : ''}
    </div>
  `).join('');
}

// Post interactions
function initPostInteractions() {
  // Delegated to inline onclick handlers
}

function toggleLike(element, postId) {
  element.classList.toggle('liked');
  const countEl = element.querySelector('.count');
  const svg = element.querySelector('svg');
  let count = parseInt(countEl.textContent.replace(/,/g, ''));

  if (element.classList.contains('liked')) {
    count++;
    svg.setAttribute('fill', 'currentColor');
    element.style.animation = 'heartbeat 0.6s ease';
    setTimeout(() => element.style.animation = '', 600);
  } else {
    count--;
    svg.setAttribute('fill', 'none');
  }

  countEl.textContent = count.toLocaleString();
}

function toggleSave(element) {
  element.classList.toggle('saved');
  const svg = element.querySelector('svg');
  if (element.classList.contains('saved')) {
    svg.setAttribute('fill', 'currentColor');
  } else {
    svg.setAttribute('fill', 'none');
  }
}

function toggleFollow(button) {
  if (button.textContent === 'Follow') {
    button.textContent = 'Following';
    button.classList.remove('btn-outline');
    button.classList.add('btn-primary');
    button.style.background = 'var(--gradient-primary)';
    button.style.color = 'white';
    button.style.border = 'none';
  } else {
    button.textContent = 'Follow';
    button.classList.remove('btn-primary');
    button.classList.add('btn-outline');
    button.style.background = '';
    button.style.color = '';
    button.style.border = '';
  }
}

function playReel(id) {
  window.location.href = "pages/404.html";
}

// Friend cards interaction
function initFriendCards() {
  // Handled by renderFriends
}

// Message preview
function initMessagePreview() {
  // Handled by renderMessages
}

// Reels scroll buttons
function initReelsScroll() {
  const container = document.getElementById('reels-container');
  const prevBtn = document.getElementById('reels-prev');
  const nextBtn = document.getElementById('reels-next');

  if (container && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -240, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: 240, behavior: 'smooth' });
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        StacklyAnimations.smoothScroll(target);
      }
    });
  });
}

// Hero particles
function initHeroParticles() {
  // Handled by StacklyAnimations.initParticles()
}

// Back to top button
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Search overlay
function initSearchOverlay() {
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput?.focus(), 100);
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  function closeSearch() {
    searchOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Login page
function initLoginPage() {
  const form = document.getElementById('login-form');
  const roleBtns = document.querySelectorAll('.role-btn');
  let selectedRole = 'user';

  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.dataset.role;
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (window.StacklyAuth) {
        const result = StacklyAuth.login(email, password, selectedRole);
        if (result.success) {
          setTimeout(() => {
            if (selectedRole === 'admin') {
              window.location.href = 'admin-dashboard.html';
            } else {
              window.location.href = 'user-dashboard.html';
            }
          }, 1000);
        }
      }
    });
  }
}

// Register page
function initRegisterPage() {
  const form = document.getElementById('register-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirm-password').value;

      if (password !== confirm) {
        if (window.StacklyAuth) {
          StacklyAuth.showToast('Passwords do not match!', 'error');
        }
        return;
      }

      if (window.StacklyAuth) {
        const result = StacklyAuth.register(name, email, password);
        if (result.success) {
          setTimeout(() => {
            window.location.href = 'user-dashboard.html';
          }, 1000);
        }
      }
    });
  }
}

// Admin dashboard
function initAdminDashboard() {
  if (window.StacklyAuth && !StacklyAuth.isAdmin()) {
    StacklyAuth.showToast('Access denied. Admin only.', 'error');
    setTimeout(() => {
      window.location.href = 'user-dashboard.html';
    }, 1500);
    return;
  }

  // Animate stat counters
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('animate-scale-in');
    }, i * 100);
  });

  // Render activity feed
  renderActivityFeed();

  // Render users table
  renderUsersTable();
}

function renderActivityFeed() {
  const container = document.getElementById('activity-feed');
  if (!container || !window.StacklyData) return;

  const activities = StacklyData.recentActivity;
  container.innerHTML = activities.map(activity => {
    const icons = {
      user: '&#128100;',
      report: '&#9888;',
      content: '&#127909;',
      upgrade: '&#11014;',
      message: '&#9993;'
    };
    const colors = {
      user: '#10B981',
      report: '#F43F5E',
      content: '#3B82F6',
      upgrade: '#F59E0B',
      message: '#8B5CF6'
    };

    return `
      <div class="activity-item" style="display:flex;align-items:center;gap:1rem;padding:1rem;border-bottom:1px solid var(--border-color)">
        <div style="width:36px;height:36px;border-radius:50%;background:${colors[activity.type]}22;color:${colors[activity.type]};display:flex;align-items:center;justify-content:center;font-size:1rem">
          ${icons[activity.type]}
        </div>
        <div style="flex:1">
          <div style="font-size:0.9rem;font-weight:500">${activity.action}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">by ${activity.user} - ${activity.time}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderUsersTable() {
  const tbody = document.getElementById('users-table-body');
  if (!tbody || !window.StacklyData) return;

  const users = StacklyData.users;
  tbody.innerHTML = users.map(user => `
    <tr style="border-bottom:1px solid var(--border-color)">
      <td style="padding:1rem">
        <div style="display:flex;align-items:center;gap:0.75rem">
          <div style="width:36px;height:36px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:0.8rem">
            ${user.avatar}
          </div>
          <span style="font-weight:500">${user.name}</span>
        </div>
      </td>
      <td style="padding:1rem;color:var(--text-secondary);font-size:0.9rem">${user.handle}</td>
      <td style="padding:1rem;color:var(--text-secondary);font-size:0.9rem">${user.followers}</td>
      <td style="padding:1rem">
        <span style="padding:0.25rem 0.75rem;border-radius:50px;font-size:0.75rem;font-weight:600;background:${user.online ? '#10B98122' : '#64748B22'};color:${user.online ? '#10B981' : '#64748B'}">
          ${user.online ? 'Online' : 'Offline'}
        </span>
      </td>
      <td style="padding:1rem">
        <button class="btn btn-ghost btn-sm" style="padding:0.4rem" onclick="this.closest('tr').remove()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </td>
    </tr>
  `).join('');
}

// User dashboard
function initUserDashboard() {
  if (window.StacklyAuth && !StacklyAuth.isLoggedIn()) {
    StacklyAuth.showToast('Please login first.', 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return;
  }

  const user = window.StacklyAuth ? StacklyAuth.getUser() : null;
  if (user) {
    const avatarEl = document.getElementById('dashboard-avatar');
    const nameEl = document.getElementById('dashboard-name');
    const emailEl = document.getElementById('dashboard-email');
    if (avatarEl) avatarEl.textContent = user.avatar;
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
  }

  // Animate dashboard cards
  const cards = document.querySelectorAll('.dashboard-card');
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('animate-fade-in-up');
    }, i * 150);
  });
}

// Contact page

// Logout handler
function handleLogout() {
  if (window.StacklyAuth) {
    StacklyAuth.logout();
  }
}

// Make functions globally available
window.toggleLike = toggleLike;
window.toggleSave = toggleSave;
window.toggleFollow = toggleFollow;
window.playReel = playReel;
window.handleLogout = handleLogout;
