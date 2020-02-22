import React from 'react';
import '../styles/ImageList.css';
import ImageCard from './ImageCard';
import Gallery from 'react-grid-gallery';

const NUMBER_OF_PREVIEW_IMAGES = 4;



const imageFormatter = (image) => {
    return {
        'src': image.urls.raw,
        'thumbnail': image.urls.thumb,
        'thumbnailWidth': image.width,
        'thumbnailHeight': image.height,
        'caption': image.user.portfolio_url ?  'Photo by ' + image.user.name + '. ' + image.user.portfolio_url : ''
    }
}

const ImageList = props => {
    const {images} = props;
    
    const IMAGES = images.length > 0 ? images.map((image) => imageFormatter(image)) : [];
    // console.log(IMAGES)
    const renderImages = images.map((image, index) => {
        if (index > NUMBER_OF_PREVIEW_IMAGES - 1) {
            return null;
        }
        return <ImageCard key={image.id} image={image} />
    });

    const imageCount = images.length > 0 
        ? <h3 className="ui blue centered header">{images.length} images found! Here's the first 4:</h3> 
        : props.term
            ? <h3 className="ui blue centered header">No "{props.term}" images found.</h3>
            : <h2 className="ui blue centered header">. . .</h2>;

    return IMAGES.length > 0 
        ? <Gallery images={IMAGES} enableImageSelection={false}  />
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