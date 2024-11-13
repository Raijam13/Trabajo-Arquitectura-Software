const login = async function(email, password) {
    try {
        const response = await fetch('http://localhost:3009/users/login', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Se necesita para enviar JSON
            },
            body: JSON.stringify({
                gmail: email,
                password: password
            })
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token);
        
        return token;
    } catch (error) {
        console.error('Error en la API de inicio de sesión:', error);
        return null;
    }
};

export default login;
