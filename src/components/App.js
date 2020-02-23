import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import Zip from './Zip';
import {Container, Header, Segment, Grid} from 'semantic-ui-react'

const DELL_PROFILE_LINK = 'https://www.wendellfernandes.com/';
const BEN_PROFILE_LINK = 'https://www.linkedin.com/in/bencynamon/';
const MAX_NUMBER_OF_IMAGES = 50;
const TEXT = {
    headerText: 'Bulk Image Download',
    subheaderText: 'Download Up to 50 Images in 1 Compressed File.'
};


class App extends React.Component {
    state = {
        images: [],
        searchTerm: '',
        desiredNumberOfImages: null,
        loading: false,
        progress: 0,
        error: false,
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
                // console.log(response)
                this.setState({ 
                    images: response.data.results,
                    loading: false
                });
            });
        });
    };

    handleError = (err) => {
        console.log(err)
    }

    handleProgress = (progress) => {
        this.setState({
            progress: progress
        })
    }

    onNumberValueChange = e => { 
        const {value} = e.target;
        if (value > 200) {
            this.setState({ desiredNumberOfImages: MAX_NUMBER_OF_IMAGES })
        } else {
            this.setState({ desiredNumberOfImages: value })
        }
    }
    
    render() {
        return(
            <Container>
                <Segment textAlign='center' inverted circular>
                </Segment>
            
                <Segment textAlign='center' inverted style={{borderRadius: 100, width: '50%', margin: '0 auto', padding: '40 0'}}>
                    <Header inverted as='h1'>{TEXT.headerText}</Header>
                    <p style={{color: '#fff'}}>{TEXT.subheaderText}</p>
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
                        loading={this.state.loading} 
                        handleProgress={this.handleProgress}
                        handleError={this.props.handleError} />
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