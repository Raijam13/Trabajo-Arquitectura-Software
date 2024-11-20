const obtenerTrabajosCliente = async (clienteId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/cliente/${clienteId}`, {
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
            console.error('Error al obtener trabajos del cliente:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const obtenerTrabajosTrabajador = async (trabajadorId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/trabajador/${trabajadorId}`, {
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
            console.error('Error al obtener trabajos del trabajador:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const actualizarEstadoTrabajo = async (trabajoId, nuevoEstado) => {
    try {
        const response = await fetch(`http://localhost:3009/services/${trabajoId}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ nuevoEstado }),
        });

        if (response.ok) {
            const trabajoActualizado = await response.json();
            console.log('Estado del trabajo actualizado con éxito:', trabajoActualizado);
            return trabajoActualizado;
        } else {
            const errorMessage = await response.text();
            console.error('Error al actualizar estado del trabajo:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
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


export { obtenerTrabajosCliente, obtenerTrabajosTrabajador, actualizarEstadoTrabajo, eliminarTrabajo };
