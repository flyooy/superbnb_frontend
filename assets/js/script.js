document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    });

    registerBtn.addEventListener('click', () => {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
    });

    // Обработка отправки формы логина
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
               
            });

            if (response.ok) {
                
                window.location.href = '/properties.html';
            } else {
                const errorText = await response.text();
                alert('Login failed: ' + errorText);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    });

    // Обработка отправки формы регистрации
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: name, email, password })
            });

            if (response.ok) {
                window.location.href = '/properties.html';
            } else {
                const errorData = await response.json();
                alert('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration.');
        }
    });
});