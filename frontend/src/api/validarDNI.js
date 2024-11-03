const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRpdmVhcm1vcnhAZ21haWwuY29tIn0.Mw1vO9Xe2HrzYF6Tpp7P4KaRPZbXJ7g5mTOpav7xDOM'; // Reemplaza con tu token constante


const validarDNI = async function(dni) {
    const response = await fetch(`http://localhost:3009/users/vdni`);

    if (response.status === 202) {
        const message = await response.text();
        console.log('Success:', message);
        
        //consultar al endpoint de estado
        const status = await fetch('http://localhost:3009/users/dnistatus');
        const estado = await response.text();

    } else {
        const errorMessage = await response.text();
        console.error('Error:', errorMessage);
        throw new Error(errorMessage);
    }
};


// export default regis;

// export default async function handler(req, res) {
//     const { dni } = req.query; // Extrae el DNI de los parámetros de la consulta

//     if (!dni) {
//         return res.status(400).json({ error: 'El DNI es requerido' });
//     }

//     try {
//         // Aquí se construye la URL con el DNI y el TOKEN
//         const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=${TOKEN}`);

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             return res.status(response.status).json({ error: errorMessage });
//         }

//         const data = await response.json();
//         return res.status(200).json(data);
//     } catch (error) {
//         console.error('Error al consultar la API:', error.message);
//         return res.status(500).json({ error: 'Error al consultar la API' });
//     }
// }