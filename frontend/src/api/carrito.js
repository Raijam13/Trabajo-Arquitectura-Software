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

export { getPropuestas, agregarPropuesta, eliminarPropuesta };
