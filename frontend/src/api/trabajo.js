const obtenerTrabajosUsuario = async (usuarioId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/usuario/${usuarioId}`, {
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
            console.error('Error al obtener trabajos del usuario:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

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

const actualizarEstadoTrabajo = async (id, nuevoEstado) => {
    try {
        const response = await fetch(`http://localhost:3009/services/${id}/actualizar-estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: nuevoEstado }), // Cambiamos solo el estado
        });

        if (response.ok) {
            const trabajoActualizado = await response.json();
            console.log('Estado del trabajo actualizado con éxito:', trabajoActualizado);
            return trabajoActualizado; // Retornamos el trabajo actualizado
        } else {
            const errorMessage = await response.text();
            console.error('Error al actualizar estado del trabajo:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
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

const getServiciosEnProceso = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/en-proceso/${userId}`);
        if (response.ok) {
            const servicios = await response.json();
            return servicios;
        } else {
            console.error('Error al obtener servicios en proceso:', await response.text());
            return [];
        }
    } catch (err) {
        console.error('Error:', err);
        return [];
    }
};


export { obtenerTrabajosUsuario, obtenerTrabajosvendedor, actualizarEstadoTrabajo, eliminarTrabajo, getServiciosEnProceso};
