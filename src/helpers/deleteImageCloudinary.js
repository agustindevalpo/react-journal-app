// helpers/cloudinary.js
export const extractPublicId = (url) => {
    // Extrae el public_id de la URL de Cloudinary
    const matches = url.match(/upload\/(?:v\d+\/)?([^\.]+)/);
    return matches ? matches[1] : null;
  };
  
  export const deleteImageFromCloudinary = async (publicId) => {
    if (!publicId) return;
    
    try {
      const formData = new FormData();
      formData.append('upload_preset', 'react-journal');
      formData.append('public_id', publicId);
  
      await fetch(`https://api.cloudinary.com/v1_1/devalpo-react/image/destroy`, {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.error('Error borrando imagen de Cloudinary:', error);
    }
  };