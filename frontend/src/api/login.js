

const login = async function( mail, passw){
    try {
        const response = await fetch('http://localhost:3009/login', 
        {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Se necesita para enviar JSON
            },
            body: JSON.stringify({  
                email: mail,
                password: passw
            })
        });

        // Verificar si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error al iniciar sesión: ' + response.statusText);
        }

        // Obtener el token del backend
        const data = await response.json();
        const token = data.token;

        // Guardar el token en el localStorage
        localStorage.setItem('token', token);
        
      
        
        return token; // Devuelve el token
    } catch (error) {
        console.error(error);
        return null; // Manejar errores
    }
};



