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

        // Verificar si la respuesta es correcta (si la respuesta no es 200 OK)
        if (!response.ok) {
            return null; // Retornar null si la respuesta no es exitosa
        }

        // Obtener el token del backend
        const data = await response.json();
        const token = data.token;

        // Guardar el token en el localStorage
        localStorage.setItem('token', token);
        
        return token; // Devuelve el token
    } catch (error) {
        console.error('Error en la API de inicio de sesión:', error);
        return null; // Manejar errores
    }
};

export default login;
