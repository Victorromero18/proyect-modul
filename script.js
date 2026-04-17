document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cargado');
    const loginForm = document.getElementById('loginForm');
    console.log('Formulario encontrado:', !!loginForm);
    const logoutBtn = document.getElementById('logoutBtn');
    const userName = document.getElementById('userName');
    const menuItems = document.querySelectorAll('.menu-item:not(.logout)');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario enviado');
            const cuenta = document.getElementById('cuenta').value;
            const password = document.getElementById('password').value;
            console.log('Cuenta:', cuenta, 'Password:', password);
            
            if (cuenta === '2203024222' && password === 'S3cr3t0s12345.') {
                console.log('Login exitoso');
                sessionStorage.setItem('usuario', cuenta);
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'sistema-escolar';
            } else {
                console.log('Login fallido');
                alert('Cuenta o contraseña incorrectos');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('loggedIn');
            window.location.href = 'index';
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