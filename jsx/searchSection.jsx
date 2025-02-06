'use strict';

import React from 'react';

class SearchSection extends React.Component {

    componentDidMount() {
        if (this.props.isMobile) {
            this.props.inputRef?.current && this.props.inputRef.current.blur();
        }
    }

    render() {
        return (
            <div className='search'>
                <form onSubmit={this.props.handleSubmit}>
                    <input
                        autoFocus={true}
                        className='normal'
                        onFocus={this.props.handleInputOnFocus}
                        onChange={this.props.handleInputOnChange}
                        placeholder='city'
                        ref={this.props.inputRef}
                        type="search"
                        value={this.props.input}
                    />
                    <input
                        type='submit'
                        value='get weather'
                        disabled={!this.props.input}
                    />
                </form>
            </div>
        )
    }
}

export default SearchSection;
