import { useState, useEffect } from 'react';

const RedimensionarImagen = ({ imagenUrl, ancho, alto }) => {
  const [imagenReducida, setImagenReducida] = useState(null);
  useEffect(() => {
    const cargarYRedimensionarImagen = async () => {
      const img = new Image();
      img.src = imagenUrl;
      img.crossOrigin = 'Anonymous'; // Permite que el canvas acceda a la imagen
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Redimensionamos la imagen
        canvas.width = ancho;
        canvas.height = alto;
  
        // Dibujamos la imagen redimensionada en el canvas
        ctx.drawImage(img, 0, 0, ancho, alto);
  
        // Convertimos el canvas en una imagen en formato base64
        const imagenBase64 = canvas.toDataURL('image/jpeg', 0.5); // Calidad al 80%
        
        setImagenReducida(imagenBase64);
      };
    };
  
    cargarYRedimensionarImagen();
  }, [imagenUrl, ancho, alto]);
  

  return (
    <div>
      {imagenReducida ? (
        <img src={imagenReducida} alt="Imagen Redimensionada" />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default RedimensionarImagen;
