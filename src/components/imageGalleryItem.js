import React from 'react';

const ImageGalleryItem = (props) => {
    const { image } = props;
    return (
        <div className="c-ad__item">
            <a href="#" className="c-ad__link h-object-fit" style={{ width: 180, height: 140, marginBottom: 20 }}>
                <img src={image} alt="" className="c-ad__img" />
            </a>
        </div>
    );
}

export default ImageGalleryItem;