const uploadImage = async (file, cloud_name = 'js-media', upload_preset = 'user_jgiwq6e') => {
    const data = new FormData();
    data.append('file', file);
    data.append('cloud_name', cloud_name);
    data.append('upload_preset', upload_preset);

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/js-media/image/upload', {
            method: 'post',
            body: data,
        });
        const result = await response.json();

        return {
            error: false,
            name: result.original_filename,
            url: result.secure_url,
            extension: result.format,
            resourceType: result.resource_type,
            assetId: result.asset_id,
            publicId: result.public_id,
        };
    } catch (error) {
        return {
            error: true,
        };
    }
};

export { uploadImage };
