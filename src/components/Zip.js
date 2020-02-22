import React, { Component } from 'react'
import '../styles/zip.css'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { render } from 'react-dom';
import { saveAs } from 'save-as';
import unsplash from '../api/unsplash';
import {Button} from 'semantic-ui-react'

const zipFilename = "images-cynamonster.zip";

export default class Zip extends React.Component {
    state = {
        loading: false
    };

    urlZip = () => {
        this.setState({
            loading: true
        });

        const {images, searchTerm} = this.props;
        const formattedSearchTerm = searchTerm.replace(' ','-');

        var zip = new JSZip();
        var count = 0;
        var zipFilename = images.length + "_" + formattedSearchTerm + "_images.zip";
        var urls = this.getUrls();
      
        urls.forEach(function(url, index){
            var filename = formattedSearchTerm + "_" + (index + 1) + '.png';
            // loading a file and add it in a zip file
            unsplash.get(url)
                .then(res => {
                    JSZipUtils.getBinaryContent(res.data.url, function (err, data) {
                        if(err) {
                            throw err; // or handle the error
                        }
                        zip.file(filename, data, {binary:true});
                        count++;
                        if (count == urls.length) {
                            zip.generateAsync({type:'blob'}).then(function(content) {
                                saveAs(content, zipFilename);
                            });
                        }
                    });
                })
        })

        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 2000)
    };

    getUrls = () => {
        const {images} = this.props;

        let urls = [];
        images.map((image) => {
            urls.push(image.links.download_location);
        });

        return urls;
    }

    getLargeUrls = () => {
        const {images} = this.props;

        let urls = [];
        images.map((image) => {
            urls.push(image.urls.thumb);
        });

        return urls;
    }

    getFileName = () => {
        const {searchTerm, images} = this.props;
        return images.length + '_' + searchTerm + '_images';
    }

    render() {
        const buttonIcon = !this.props.images.length > 0
            ? ''
            : 'download';
        const buttonContent = !this.props.images.length > 0
            ? 'Search Images...'
            : ' Download Zip'

        return (
            <Button 
                fluid
                loading={this.state.loading}
                positive
                disabled={!this.props.images.length > 0}
                icon={buttonIcon}
                size='big'
                content={buttonContent}
                onClick={this.urlZip}
            />
        )
    }
        // <div className="ui labeled fluid button" tabIndex="0" onClick={urlZip}>
        //     <div className="ui red button" style={{height: 'unset'}}>
        //         <i className="download icon"></i> Large
        //     </div>
        //     <a className="ui basic red left pointing label">
        //         1,048 mb
        //     </a>
        // </div>
};