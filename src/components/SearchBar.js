import React from 'react';
import { Form, Icon, Input, Grid, Button } from 'semantic-ui-react'
import '../styles/styles.css'

class SearchBar extends React.Component {
    state = {
        term: '',
        number: ''
    };

    onFormSubmit = e => {
        e.preventDefault();
        this.props.onSubmission(this.state.term, this.state.number);
    }

    onKeywordSubmit = (e) => {
        e.preventDefault();
        this.numberInput.focus();
    }

    onKeywordChange = (event) => {
        this.setState({
            term: event.target.value
        })
    }
    
    onNumberChange = (event) => {
        const {value} = event.target;
        if (value > 200) {
            this.setState({ number: 200 })
        } else {
            this.setState({ number: value })
        }
    }

    render() {
        return(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8} textAlign='left'>
                        <Form onSubmit={this.onKeywordSubmit} inverted>
                            <Form.Field>
                                <label>Search Term</label>
                                <Input 
                                    icon={<Icon name='font' />}
                                    value={this.state.term}
                                    onChange={this.onKeywordChange} 
                                    placeholder='Search for business, people, design, architect, abstract...'
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'>
                        <Form onSubmit={this.onFormSubmit} inverted>
                            <Form.Field>
                                <label>Number of Images</label>
                                <Input 
                                    ref={(input) => {this.numberInput = input}}
                                    icon={<Icon name='search' />}
                                    value={this.state.number}
                                    onChange={this.onNumberChange} 
                                    placeholder='Maximum of 200'
                                    type='number'
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

                // <form className="ui segment" onSubmit={ this.onFormSubmit }>
                    // <div className="ui action input">
                    //     <input 
                    //         placeholder='Search...'
                    //         type="text" 
                    //         value={this.state.term} 
                
                    //     />
                    //     <div className="ui green large icon button">
                    //         Download {this.props.number} Images &nbsp; <i className="angle down icon" />
                    //     </div>
                    // </div>
                // </form>
        );
    }
}

export default SearchBar;