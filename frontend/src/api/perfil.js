const getresumen = async function(id) {
    try {
        
        const response = await fetch(`http://localhost:3009/resumen/${id}`, {
            method: 'GET'
        });

        if (response.ok) {
            const resumen = await response.json();
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

const getvideoHD = async function(id) {
    try {
        
        const response = await fetch(`http://localhost:3009/videos/${id}`, {
            method: 'GET'
        });

        if (response.ok) {
            const video = await response.json();
            return video.map((item) => item.video)[0] || "";
        } else {
            const errorMessage = await response.text();
            console.error('Error al obtener video:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const getvideoSinHD = async function(id) {
    try {
        
        const response = await fetch(`http://localhost:3009/videos/${id}`, {
            method: 'GET'
        });

        if (response.ok) {
            const video = await response.json();
            return video.map((item) => item.video2)[0] || "";
        } else {
            const errorMessage = await response.text();
            console.error('Error al obtener video:', errorMessage);
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export {getresumen, getvideoHD, getvideoSinHD};