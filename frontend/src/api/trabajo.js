const obtenerTrabajosvendedor = async (vendedorId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/vendedor/${vendedorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            cache: 'no-store',
        });

        if (response.ok) {
            const trabajos = await response.json();
            return trabajos;
        } else {
            const errorMessage = await response.text();
            console.error('Error al obtener trabajos del vendedor:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const eliminarTrabajo = async (trabajoId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/${trabajoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            console.log('Trabajo eliminado con éxito');
            return true;
        } else {
            const errorMessage = await response.text();
            console.error('Error al eliminar trabajo:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

const getServiciosPorEstado = async (estado) => {
    try {
        const response = await fetch(`http://localhost:3009/services/estado/${estado}`, {
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
            console.error(`Error al obtener servicios en estado ${estado}:`, errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const finalizarTrabajo = async (serviceId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/trabajo/finalizar/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ estado: 'FINALIZADO' })
        });

        if (response.ok) {
            const trabajoActualizado = await response.json();
            console.log('Estado del trabajo actualizado a FINALIZADO:', trabajoActualizado);
            return true;
        } else {
            const errorMessage = await response.text();
            console.error('Error al finalizar el trabajo:', errorMessage);
            throw false;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const calificarTrabajo = async (serviceId, calificacion, comentario) => {
    try {
        const response = await fetch(`http://localhost:3009/services/trabajo/calificar/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ estado: 'CALIFICADO', calificacion, comentario })
        });

        if (response.ok) {
            const trabajoActualizado = await response.json();
            console.log('Estado del trabajo actualizado a CALIFICADO:', trabajoActualizado);
            return trabajoActualizado;
        } else {
            const errorMessage = await response.text();
            console.error('Error al calificar el trabajo:', errorMessage);
            throw false;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export { obtenerTrabajosvendedor, finalizarTrabajo, eliminarTrabajo, getServiciosPorEstado, calificarTrabajo};
