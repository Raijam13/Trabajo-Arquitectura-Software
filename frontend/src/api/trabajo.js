// Obtener todos los trabajos
const obtenerTrabajos = async () => {
    try {
        const response = await fetch('http://localhost:3009/trabajos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (response.ok) {
            const trabajos = await response.json();
            return trabajos;
        } else {
            const errorMessage = await response.text();
            console.error('Error al obtener trabajos:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

// Agregar un nuevo trabajo
const agregarTrabajo = async (titulo, descripcion, estado, clienteId, freelancerId = null) => {
    try {
        const response = await fetch('http://localhost:3009/trabajos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo,
                descripcion,
                estado,
                clienteId,
                freelancerId,
            }),
            cache: 'no-store',
        });

        if (response.status === 201) {
            const nuevoTrabajo = await response.json();
            console.log('Trabajo agregado con éxito:', nuevoTrabajo);
            return nuevoTrabajo;
        } else {
            const errorMessage = await response.text();
            console.error('Error al agregar trabajo:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Eliminar un trabajo por su ID
const eliminarTrabajo = async (id) => {
    try {
        const response = await fetch(`http://localhost:3009/trabajos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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

// Actualizar el estado de un trabajo por su ID
const actualizarEstadoTrabajo = async (id, nuevoEstado) => {
    try {
        const response = await fetch(`http://localhost:3009/trabajos/${id}/actualizar-estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: nuevoEstado }),
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

// Finalizar un trabajo por su ID
const finalizarTrabajo = async (id) => {
    try {
        const response = await fetch(`http://localhost:3009/trabajos/${id}/finalizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const trabajoFinalizado = await response.json();
            console.log('Trabajo finalizado con éxito:', trabajoFinalizado);
            return trabajoFinalizado;
        } else {
            const errorMessage = await response.text();
            console.error('Error al finalizar trabajo:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};