import React from 'react';
import ReactDOM from 'react-dom';
import {isMobile} from './mobileHandler.jsx';

class SearchSection extends React.Component {

    componentDidMount() {
        if (isMobile()) {
            ReactDOM.findDOMNode(this).querySelector('input[type="search"]').blur();
        }
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.props.handleSubmit}>
                        <input 
                            type="search"
                            autoFocus="true"
                            className="normal"
                            placeholder="city"
                            value={this.props.input}
                            onChange={this.props.handleInputOnChange}
                            onFocus={this.props.handleInputOnFocus}
                        />
                        <input
                            type="submit"
                            value="get weather"
                            disabled={!this.props.input}
                        />
                </form>
            </div>
        )
    }
}

export default SearchSection;