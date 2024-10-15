// Obtener todas las propuestas seleccionadas por el cliente
export const getPropuestas = async function() {
    const response = await fetch('http://localhost:3009/services', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (response.ok) {
        const propuestas = await response.json();
        return propuestas;
    } else {
        const errorMessage = await response.text();
        console.error('Error al obtener propuestas:', errorMessage);
        return [];
    }
};

// Agregar una nueva propuesta al carrito
export const agregarPropuesta = async function(titulo, descripcion, costo) {
    const response = await fetch('http://localhost:3009/services', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: titulo,
            servicio_description: descripcion,
            costo_promedio: costo,
        }),
        cache: 'no-store',
    });

    if (response.status === 201) {
        const nuevaPropuesta = await response.json();
        console.log('Propuesta agregada con éxito:', nuevaPropuesta);
        return nuevaPropuesta;
    } else {
        const errorMessage = await response.text();
        console.error('Error al agregar propuesta:', errorMessage);
    }
};

// Eliminar una propuesta del carrito
export const eliminarPropuesta = async function(id) {
    const token = localStorage.getItem('token'); // Asegúrate de tener el token disponible para autenticar la solicitud
    const response = await fetch(`http://localhost:3009/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Envía el token para autenticación
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      console.log('Propuesta eliminada con éxito');
      return true; // Retornamos un valor para confirmar que la eliminación fue exitosa
    } else {
      const errorMessage = await response.text();
      console.error('Error al eliminar propuesta:', errorMessage);
      return false; // Retornamos un valor para indicar el fallo
    }
  };
