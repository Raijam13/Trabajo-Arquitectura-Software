const regis = async function(name, apell, email, password, edad, dni, telefono, nombreCompleto) {
    const response = await fetch('http://localhost:3009/users/signup', {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: name,
            gmail: email,
            password: password, // Contraseña
            edad: Number(edad), // Convertir edad a número
            nombre_completo: nombreCompleto, // Nombre completo
            dni: Number(dni), // Convertir DNI a número
            telefono: Number(telefono) // Convertir teléfono a número
        }),
    });

    if (response.status === 201) {
        const message = await response.text();
        console.log('Success:', message);
        return message;
    } else {
        const errorMessage = await response.text();
        console.error('Error:', errorMessage);
        throw new Error(errorMessage);
    }
};

export default regis;
