// ============================================
// STACKLY - Authentication Module
// Supports dual roles: user & admin
// ============================================

const StacklyAuth = {
  // Initialize auth state
  init() {
    this.checkSession();
    this.updateUI();
  },

  // Check if user is logged in
  isLoggedIn() {
    return localStorage.getItem('stackly_user') !== null;
  },

  // Get current user
  getUser() {
    const user = localStorage.getItem('stackly_user');
    return user ? JSON.parse(user) : null;
  },

  // Get user role
  getRole() {
    const user = this.getUser();
    return user ? user.role : null;
  },

  // Check if admin
  isAdmin() {
    return this.getRole() === 'admin';
  },

  // Login user
  login(email, password, role = 'user') {
    // Mock authentication - in production this would be an API call
    const mockUsers = {
      'user@stackly.com': { password: 'user123', name: 'Demo User', role: 'user' },
      'admin@stackly.com': { password: 'admin123', name: 'Admin User', role: 'admin' },
    };

    const user = mockUsers[email];
    if (user && user.password === password) {
      const userData = {
        email,
        name: user.name,
        role: role || user.role,
        avatar: user.name.split(' ').map(n => n[0]).join(''),
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('stackly_user', JSON.stringify(userData));
      this.showToast('Login successful! Welcome back, ' + user.name, 'success');
      return { success: true, user: userData };
    }

    // Allow any login for demo purposes
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0],
        role: role,
        avatar: email[0].toUpperCase(),
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('stackly_user', JSON.stringify(userData));
      this.showToast('Login successful! Welcome to Stackly!', 'success');
      return { success: true, user: userData };
    }

    this.showToast('Invalid credentials. Please try again.', 'error');
    return { success: false, error: 'Invalid credentials' };
  },

  // Register user
  register(name, email, password, role = 'user') {
    if (!name || !email || !password) {
      this.showToast('Please fill in all fields.', 'error');
      return { success: false, error: 'Missing fields' };
    }

    if (password.length < 6) {
      this.showToast('Password must be at least 6 characters.', 'error');
      return { success: false, error: 'Password too short' };
    }

    const userData = {
      email,
      name,
      role,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('stackly_user', JSON.stringify(userData));
    this.showToast('Account created successfully! Welcome to Stackly!', 'success');
    return { success: true, user: userData };
  },

  // Logout
  logout() {
    localStorage.removeItem('stackly_user');
    this.showToast('Logged out successfully.', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  },

  // Check session validity
  checkSession() {
    const user = this.getUser();
    if (user) {
      const loginTime = new Date(user.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      // Session expires after 24 hours
      if (hoursDiff > 24) {
        this.logout();
      }
    }
  },

  // Update UI based on auth state
  updateUI() {
    const authLinks = document.querySelectorAll('.auth-link');
    const userMenu = document.querySelector('.user-menu');
    const loginBtn = document.querySelector('.nav-login-btn');
    const registerBtn = document.querySelector('.nav-register-btn');

    if (this.isLoggedIn()) {
      const user = this.getUser();
      authLinks.forEach(link => link.style.display = 'none');

      if (userMenu) {
        userMenu.style.display = 'flex';
        const avatar = userMenu.querySelector('.user-avatar');
        const name = userMenu.querySelector('.user-name');
        if (avatar) avatar.textContent = user.avatar;
        if (name) name.textContent = user.name;
      }

      if (loginBtn) loginBtn.style.display = 'none';
      if (registerBtn) registerBtn.style.display = 'none';
    } else {
      authLinks.forEach(link => link.style.display = 'inline-flex');
      if (userMenu) userMenu.style.display = 'none';
      if (loginBtn) loginBtn.style.display = 'inline-flex';
      if (registerBtn) registerBtn.style.display = 'inline-flex';
    }
  },

  // Protect route - redirect if not authenticated
  requireAuth() {
    if (!this.isLoggedIn()) {
      this.showToast('Please login to access this page.', 'warning');
      setTimeout(() => {
        window.location.href = 'pages/login.html';
      }, 1000);
      return false;
    }
    return true;
  },

  // Protect admin route
  requireAdmin() {
    if (!this.isLoggedIn() || !this.isAdmin()) {
      this.showToast('Admin access required.', 'error');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
      return false;
    }
    return true;
  },

  // Redirect based on role
  redirectByRole() {
    if (this.isAdmin()) {
      window.location.href = 'pages/admin-dashboard.html';
    } else {
      window.location.href = 'pages/user-dashboard.html';
    }
  },

  // Show toast notification
  showToast(message, type = 'info') {
    // Remove existing toasts
    const existing = document.querySelector('.stackly-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `stackly-toast toast`;
    const colors = {
      success: '#10B981',
      error: '#F43F5E',
      warning: '#F59E0B',
      info: '#3B82F6'
    };
    const icons = {
      success: '&#10003;',
      error: '&#10007;',
      warning: '&#9888;',
      info: '&#8505;'
    };

    toast.innerHTML = `
      <span style="font-size:1.1rem">${icons[type]}</span>
      <span>${message}</span>
    `;
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 10000;
      min-width: 280px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  window.StacklyAuth = StacklyAuth;
  document.addEventListener('DOMContentLoaded', () => {
    StacklyAuth.init();
  });
}
