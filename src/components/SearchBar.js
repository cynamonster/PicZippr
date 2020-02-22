import React from 'react';
import { Form, Icon, Input, Grid } from 'semantic-ui-react'
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
        if (value > this.props.maxNumber) {
            this.setState({ number: this.props.maxNumber })
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
                                    onBlur={this.onFormSubmit}
                                    icon={<Icon name='search' />}
                                    value={this.state.number}
                                    onChange={this.onNumberChange} 
                                    placeholder={`Search for up to ${this.props.maxNumber} images...`}
                                    className="dark-search"
                                    type='number'
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default SearchBar;