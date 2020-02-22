import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import Zip from './Zip';
import {Button, Icon} from 'semantic-ui-react'

import {Container, Grid, Header, Segment} from 'semantic-ui-react'
// import '../styles/styles.css';


class App extends React.Component {
    state = {
        images: [],
        searchTerm: '',
        desiredNumberOfImages: null
    };

    onSearchSubmit = (term, number) => {
        this.setState({
            searchTerm: term,
            desiredNumberOfImages: number
        }, () => {
            unsplash.get('search/photos', {
                params: {
                    query: term,
                    per_page: this.state.desiredNumberOfImages
                }
            }).then((response) => {
                console.log(response)
                this.setState({ images: response.data.results });
            });
        });
    };

    handleNumberChange = (event, data) => {
        console.log(event)
        console.log(data)
    }

    onNumberValueChange = e => { 
        const {value} = e.target;
        if (value > 200) {
            this.setState({ desiredNumberOfImages: 200 })
        } else {
            this.setState({ desiredNumberOfImages: value })
        }
    }
    // user chooses how many images they want to download
    // user chooses what size photos they want : thumbnails, small, medium, large, raw
    // that many images are queried, using user search query, and bundled into a zip.
    // user downloads zip file

    text = {
        headerText: 'Bulk Image Gallery For Designers & Developers',
        subheaderText: 'Digital Creators Need Placeholders For Their Web Projects – Search Below and Download Up to 200 Images'
    };

    
    render() {
        return(
            <Container>
                <Segment textAlign='center' inverted>

                </Segment>
                <Segment padded='very' textAlign='center' inverted>
                    <Header inverted as='h1'>{this.text.headerText}</Header>
                    <p style={{color: '#fff'}}>{this.text.subheaderText}</p>
                </Segment>

                <Segment textAlign='center' inverted>
                    <SearchBar onSubmission={this.onSearchSubmit} number={this.state.desiredNumberOfImages} />
                </Segment>

                <Segment textAlign='center' inverted>
                    <Zip images={this.state.images} searchTerm={this.state.searchTerm} />
                </Segment>

                
                <Segment textAlign='center' inverted>
                    {/* <p style={{color: '#fafafa'}}>{ this.state.images.length ? ` Here's the first 2 images found:` : null }</p> */}
                    <Header content={this.state.images.length > 0 ? 'Image Preview:' : ''} as='h2' />
                    <ImageList images={this.state.images} term={this.state.searchTerm} />
                </Segment>

                
            </Container>
            // <div className="ui very padded container segment inverted">
            //     <h1 className="ui header blue">PicZippr</h1>
            //     <div className="ui stackable container">
            //         <div className="row">
            //             {/* <div className="ui container"> */}
            //             {/* </div> */}

            //                 <div className="ui two column container inverted">
            //                     <div className="column">
            //                         <div className="ui input">
            //                             <input type="number" 
            //                                 placeholder="How many photos?"
            //                                 value={this.state.desiredNumberOfImages} 
            //                                 onChange={(e) => this.onNumberValueChange(e)} 
            //                                 max="200"
            //                             />
            //                         </div>
            //                     </div>

            //                     <div className="column">
            
            //                     </div>
            //                 </div>

            //             <div className="column">
                            // <p style={{color: '#fafafa'}}>{ this.state.images.length ? ` Here's the first 2 images found:` : null }</p>
                            // <ImageList images={this.state.images} term={this.state.searchTerm} />
            //             </div>
            //         </div>
            //     {/* </div> */}
            // </div>
        );
    }
}

export default App;