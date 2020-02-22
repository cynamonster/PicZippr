import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import Zip from './Zip';
import {Container, Header, Segment} from 'semantic-ui-react'

const DELL_PROFILE_LINK = 'https://www.wendellfernandes.com/';
const BEN_PROFILE_LINK = 'https://www.linkedin.com/in/bencynamon/';
const MAX_NUMBER_OF_IMAGES = 50;

class App extends React.Component {
    state = {
        images: [],
        searchTerm: '',
        desiredNumberOfImages: null,
        loading: false
    };

    onSearchSubmit = (term, number) => {
        this.setState({
            searchTerm: term,
            desiredNumberOfImages: number,
            loading: true
        }, () => {
            unsplash.get('search/photos', {
                params: {
                    query: term,
                    per_page: this.state.desiredNumberOfImages
                }
            }).then((response) => {
                console.log(response)
                this.setState({ 
                    images: response.data.results,
                    loading: false
                });
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
            this.setState({ desiredNumberOfImages: MAX_NUMBER_OF_IMAGES })
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
        subheaderText: 'Digital Creators Need Placeholders For Their Web Projects – Search Below and Download Up to 50 Images'
    };

    
    render() {
        return(
            <Container>
                <Segment textAlign='center' inverted>

                </Segment>
                <Segment padded='very' textAlign='center' inverted>
                    <Header inverted as='h1'>{this.text.headerText}</Header>
                    <p style={{color: '#fff'}}>{this.text.subheaderText}</p>
                    <p style={{color: '#fff', opacity: .8}}>Created by <a href={DELL_PROFILE_LINK}>Dell</a> and <a href={BEN_PROFILE_LINK}>Ben</a></p>
                </Segment>

                <Segment textAlign='center' inverted>
                    <SearchBar 
                        onSubmission={this.onSearchSubmit} 
                        number={this.state.desiredNumberOfImages}
                        maxNumber={MAX_NUMBER_OF_IMAGES} />
                </Segment>

                <Segment textAlign='center' inverted>
                    <Zip images={this.state.images} 
                        searchTerm={this.state.searchTerm} 
                        loading={this.state.loading} />
                </Segment>

                
                <Segment textAlign='center' inverted>
                    <Header content={this.state.images.length > 0 ? 'Image Preview:' : ''} as='h2' />
                    <ImageList images={this.state.images} term={this.state.searchTerm} />
                </Segment>
            </Container>
        );
    }
}

export default App;