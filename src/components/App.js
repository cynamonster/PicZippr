import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';


class App extends React.Component {
    state = {
        images: []
    };

    onSearchSubmit = term => {
        unsplash.get('search/photos', {
            params: {
                query: term
            }
        }).then((response) => {
            this.setState({ images: response.data.results });
        });
    }

    render() {
        return(
            <div className="ui container" style={{ marginTop: 10 }}>
                <SearchBar onSubmission={ this.onSearchSubmit } />
                { this.state.images.length ? `${this.state.images.length} images found!` : null }
                <ImageList images={this.state.images} />
            </div>
        );
    }
}

export default App;