const getServiciosEnCarrito = async () => {
    try {
        const response = await fetch('http://localhost:3009/services/en-carrito', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (response.ok) {
            const servicios = await response.json();
            return servicios;
        } else {
            const errorMessage = await response.text();
            console.error('Error al obtener servicios en carrito:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};


const eliminarPropuesta = async function(id) {
    try {
        const response = await fetch(`http://localhost:3009/services/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Propuesta eliminada con éxito');
            return true;
        } else {
            const errorMessage = await response.text();
            console.error('Error al eliminar propuesta:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

const pagarCarrito = async (serviceId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/carrito/pagar/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            console.log('Servicio actualizado a EN_PROCESO');
            return true;
        } else {
            const errorMessage = await response.text();
            console.error('Error al pagar servicio:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};




export { getServiciosEnCarrito, eliminarPropuesta, pagarCarrito};
