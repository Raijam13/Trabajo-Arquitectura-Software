
const Registro = async function(name,mail,contra){
    const response = await fetch ('http://localhost:3009/signup', 
    {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email : mail,
            password : contra
        }),
    })
   
    if (response.status === 201) {
        // Obtener el mensaje enviado por el servidor
        const message = await response.text(); // El backend está enviando texto plano, no JSON
        console.log('Success:', message); // Mostrar en consola
    } else {
        // En caso de que no sea 201, mostrar un mensaje de error
        const errorMessage = await response.text();
        console.log('Error:', errorMessage); // Mostrar el error en consola
    }

}

