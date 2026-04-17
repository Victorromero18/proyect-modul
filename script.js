document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userName = document.getElementById('userName');
    const menuItems = document.querySelectorAll('.menu-item:not(.logout)');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const cuenta = document.getElementById('cuenta').value;
            const password = document.getElementById('password').value;
            
            if (cuenta === '2203024222' && password === 'S3cr3t0s12345') {
                sessionStorage.setItem('usuario', cuenta);
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'sistema-escolar.html';
            } else {
                alert('Cuenta o contraseña incorrectos');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }

    if (userName) {
        const storedUser = sessionStorage.getItem('usuario');
        if (storedUser) {
            userName.textContent = storedUser;
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
        });
    });
});