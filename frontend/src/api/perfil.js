const getresumen = async function(id) {
    try {
        
        const response = await fetch(`http://localhost:3009/resumen/${id}`, {
            method: 'GET'
        });

        if (response.ok) {
            const resumen = await response.json();
            console.log('Resumen: ', resumen.map(item => item.resumen))
            return resumen.map(item => item.resumen);
        } else {
            const errorMessage = await response.text();
            console.error('Error al obtener resumen:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
export {getresumen};