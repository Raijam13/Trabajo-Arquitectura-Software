const getPropuestas = async function() {
    try {
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
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const agregarPropuesta = async function(tipo, titulo, descripcion, costoPromedio, costoDescripcion, idFotos = []) {
    try {
        const response = await fetch('http://localhost:3009/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo: tipo,
                titulo: titulo,
                servicio_description: descripcion,
                costo_promedio: Number(costoPromedio),
                costo_descripción: costoDescripcion,
                id_foto: idFotos 
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
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
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

const enviarPropuestas = async (propuestas) => {
    try {
        const trabajosParaEnviar = propuestas.map((propuesta) => ({
            tipo: propuesta.tipo || 'Otro', // Valor por defecto si falta
            titulo: propuesta.titulo,
            servicio_description: propuesta.servicio_description,
            estado: 'EN_PROCESO', // Cambiar el estado al enviar
            usuario: localStorage.getItem('userId'),
            vendedor: propuesta.vendedorId,
            costo_promedio: propuesta.costo_promedio,
            costo_descripción: propuesta.costo_descripción,
        }));

        const response = await fetch('http://localhost:3009/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(trabajosParaEnviar),
        });

        if (response.ok) {
            console.log('Trabajos enviados con éxito');
            return true;
        } else {
            const errorMessage = await response.text();
            console.error('Error al enviar trabajos:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error('Error en la API de envío de propuestas:', error);
        return false;
    }
};


const getServiciosCarrito = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/carrito/${userId}`);
        if (response.ok) {
            const servicios = await response.json();
            return servicios;
        } else {
            console.error('Error al obtener servicios en el carrito:', await response.text());
            return [];
        }
    } catch (err) {
        console.error('Error:', err);
        return [];
    }
};

const pagarServiciosCarrito = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3009/services/carrito/pagar/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            console.log('Servicios actualizados a PAGADO');
            return true;
        } else {
            console.error('Error al pagar servicios:', await response.text());
            return false;
        }
    } catch (err) {
        console.error('Error:', err);
        return false;
    }
};




export { getPropuestas, agregarPropuesta, eliminarPropuesta, enviarPropuestas, getServiciosCarrito, pagarServiciosCarrito};
