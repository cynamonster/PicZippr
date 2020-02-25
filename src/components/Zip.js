import React from 'react'
import '../styles/zip.css'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'save-as';
import unsplash from '../api/unsplash';
import fileSize from 'filesize';
import {Button} from 'semantic-ui-react'

window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

export default class Zip extends React.Component {
    state = {
        loading: false,
        progress: 0
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
      
        const getImages = new Promise((resolve, reject) => {
            urls.forEach((url, index) => {
            var filename = formattedSearchTerm + "_" + (index + 1) + '.png';
            unsplash.get(url)
                .then(res => {
                    JSZipUtils.getBinaryContent(res.data.url, (err, data) => {
                        if(err) {
                            this.props.handleError(err)
                        }
                        zip.file(filename, data, {binary:true});
                        count++;
                        if (count === urls.length) {
                            resolve();
                            zip.generateAsync({type:'blob'},(metaData) => {
                                this.setState({
                                    progress: metaData.percent.toFixed(2)
                                });
                            }).then((content) => {
                                this.setState({
                                    loading: false
                                })
                                let mobileConfirmation = false;

                                if (window.mobileAndTabletcheck()) {
                                    mobileConfirmation = window.confirm(`If you aren't connected to wifi, this ${fileSize(content.size)} download will use mobile data.`)
                                } else {
                                    saveAs(content, zipFilename);
                                }

                                if (mobileConfirmation) {
                                    saveAs(content, zipFilename);
                                }
                            });
                        }
                    });
                })
            })
        })

        getImages.then(() => {
            this.setState({
                loading: false
            })
        });
    };

    getLocalUrls = () => {
        let urls = [
            '../30_cat_images/cat_1.png',
            '../30_cat_images/cat_2.png',
            '../30_cat_images/cat_3.png',
            '../30_cat_images/cat_4.png',
            '../30_cat_images/cat_5.png',
            '../30_cat_images/cat_6.png',
            '../30_cat_images/cat_7.png',
            '../30_cat_images/cat_8.png',
            '../30_cat_images/cat_9.png',
            '../30_cat_images/cat_10.png',
            '../30_cat_images/cat_11.png',
            '../30_cat_images/cat_12.png',
            '../30_cat_images/cat_13.png',
            '../30_cat_images/cat_14.png',
            '../30_cat_images/cat_15.png',
            '../30_cat_images/cat_16.png',
            '../30_cat_images/cat_17.png',
            '../30_cat_images/cat_18.png',
            '../30_cat_images/cat_10.png',
            '../30_cat_images/cat_20.png',
            '../30_cat_images/cat_21.png',
            '../30_cat_images/cat_22.png',
            '../30_cat_images/cat_23.png',
            '../30_cat_images/cat_24.png',
            '../30_cat_images/cat_25.png',
            '../30_cat_images/cat_26.png',
            '../30_cat_images/cat_27.png',
            '../30_cat_images/cat_28.png',
            '../30_cat_images/cat_29.png',
            '../30_cat_images/cat_30.png',
        ];

        return urls;
    }

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
        const buttonIcon = this.state.progress > 0 && this.state.progress < 100
            ? ''
            : 'download';
        let buttonContent = this.state.progress > 0 && this.state.progress < 100
            ? this.state.progress + '% Complete'
            : 'Download Zip'

        return (
            <Button 
                fluid
                loading={this.state.loading || this.props.loading}
                positive
                disabled={!this.props.images.length > 0}
                icon={buttonIcon}
                size='big'
                content={buttonContent}
                onClick={this.urlZip}
            />
        )
    }
};