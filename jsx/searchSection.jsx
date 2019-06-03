import React from 'react';

class SearchSection extends React.Component {

    render() {
        return (
            <div className="search">
                <form onSubmit={this.props.handleSubmit}>
                        <input 
                            type="search"
                            onChange={this.props.handleInput}
                            onFocus={this.props.inputOnFocus}
                            onBlur={this.props.inputOnBlur}
                            value={this.props.input}
                            placeholder="city"
                            className="normal"
                            autoFocus="true"
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