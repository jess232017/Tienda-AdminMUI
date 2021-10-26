import React, {useState} from 'react';

const AvatarRender = (image="https://st3.depositphotos.com/5532432/17941/v/450/depositphotos_179410138-stock-illustration-ceo-flat-vector-icon.jpg", setImage) => {
    //const [image, setImage] = useState("https://st3.depositphotos.com/5532432/17941/v/450/depositphotos_179410138-stock-illustration-ceo-flat-vector-icon.jpg");
    const [selected, setSelected] = useState(false);
    const [name, setName] = useState("");
    const [size, setSize] = useState("");

    // Esta funcion se ejecutara when la imagen cambie
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
            setName(file.name);
            setSize(formatBytes(file.size))
            setSelected(true);
        }
    };

    return (
        <div className="image-uploader">
            <img src={image} alt="..." className="img-thumbnail"/>

            <label>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange = {imageChange}/>
            </label>

            {selected ?
                <div className="dx-fileuploader-file">
                    <div className="dx-fileuploader-file-info">
                        <div className="dx-fileuploader-file-name">
                            {name}
                        </div>
                        <div className="dx-fileuploader-file-size">
                            {size}
                        </div>
                    </div>
                    <div className="dx-fileuploader-file-status-message">
                        Listo para subir
                    </div>
                </div>
            :
                <p>Subir Imagen</p>
            }
        </div>
    );
}

const renderAvatar = (image, setImage) => (e) => AvatarRender(image, setImage);
 
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export {renderAvatar};

export default AvatarRender;