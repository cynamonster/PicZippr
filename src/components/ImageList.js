import React from 'react';
import '../styles/ImageList.css';
import Gallery from 'react-grid-gallery';

const NUMBER_OF_PREVIEW_IMAGES = 4;

const imageFormatter = (image) => {
    return {
        'src': image.urls.raw,
        'thumbnail': image.urls.thumb,
        'thumbnailWidth': image.width,
        'thumbnailHeight': image.height,
        'caption': <p>Photo by <a href={image.user.links.portfolio + '?utm_source=yPicZippr&utm_medium=referral'}>{image.user.name}</a> on <a href="https://unsplash.com/?utm_source=PicZippr&utm_medium=referral">Unsplash</a></p>
    }
}

const ImageList = props => {
    const {images} = props;

    const IMAGES = images.length > 0 ? images.map((image) => imageFormatter(image)) : [];

    return IMAGES.length > 0 
        ? <Gallery images={IMAGES} enableImageSelection={false} backdropClosesModal />
        : null;
}

export default ImageList;

// <div className="ui attached stackable container">
            // <h1 className="ui blue centered header">Image Preview</h1>
            // {imageCount}
            // {/* <div className="ui stackable padded two column grid"> */}
                // {/* {renderImages} */}
            // {/* </div> */}
        // </div>