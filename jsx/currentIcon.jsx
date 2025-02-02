'use strict';

import React from 'react';

import { WEATHER_ICON_MAP } from '../js/consts.js';


class CurrentIcon extends React.Component {
    render() {
        return (
            <div className="current-icon">
                <i className={WEATHER_ICON_MAP[this.props.icon].className} />
            </div>
        )
    }
}

export default CurrentIcon;
