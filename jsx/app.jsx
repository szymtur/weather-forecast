'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Main from './main.jsx';
import { checkIsMobile, mobileStyles, viewportSettingsChanger } from '../js/mobile.js';

if (!window.Promise) { window.Promise = Promise }


document.addEventListener('DOMContentLoaded', function() {
    class App extends React.Component {

        state = {
            isMobile: checkIsMobile(),
            isLandscape: window.innerHeight <= window.innerWidth,
        }

        updateScreenState() {
            this.setState({
                isMobile: checkIsMobile(),
                isLandscape: window.innerHeight <= window.innerWidth,
            }, () => {
                if (this.state.isMobile) {
                    mobileStyles(this.state.isLandscape);
                    viewportSettingsChanger(this.state.isLandscape);
                }
            });
        };

        componentDidMount() {
            this.updateScreenState();
            window.addEventListener('resize', this.updateScreenState.bind(this));
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.updateScreenState.bind(this));
        }

        render() {
            return (
                <div>
                    <Main
                        isMobile={this.state.isMobile}
                        isLandscape={this.state.isLandscape}
                    />
                </div>
            );
        }
    }

    const root = ReactDOM.createRoot(document.getElementById("app"));

    root.render(<App />);
});
