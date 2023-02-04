'use strict';

import React from 'react';

import { Chart as ChartJs } from 'react-chartjs-2';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement } from 'chart.js';

Chart.register(CategoryScale, Legend, LinearScale, LineElement, PointElement);

class WeatherChart extends React.Component {

    options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: true,
        },
        stacked: false,
        layout: {
            padding: {
                bottom: 5
            }
        },
        plugins: {
            legend: {
                display: true,
                onClick: null,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    font: {
                        weight: 600,
                        size: 13,
                        family: '"Montserrat", sans-serif'
                    }
                }
            },
        },
        scales: {
            axisY1: {
                type: 'linear',
                display: true,
                position: 'left',
                grace: 1,
                grid: {
                    borderColor: '#808080',
                    borderWidth: 2,
                },
                ticks: {
                    color: '#808080',
                    maxTicksLimit: 6,
                    precision: 0,
                    font: {
                        weight: 600,
                        size: 12,
                        family: '"Montserrat", sans-serif'
                    },
                }
            },
            axisY2: {
                type: 'linear',
                display: true,
                position: 'right',
                grace: 1,
                grid: {
                    drawOnChartArea: false,
                    borderColor: '#800080',
                    borderWidth: 2,
                },
                ticks: {
                    color: '#800080',
                    maxTicksLimit: 5,
                    precision: 0,
                    font: {
                        weight: 600,
                        size: 12,
                        family: '"Montserrat", sans-serif'
                    },
                }
            },
            xAxis: {
                ticks: {
                    color: 'black',
                    font: {
                        weight: 600,
                        size: 12,
                        family: '"Montserrat", sans-serif',
                    }
                }
            }
        }
    };


    render() {
        const { time, temperature, pressure } = this.props.hourlyForecast;

        const data = {
            labels: time && time.slice(1, 10),
            datasets: [
                {
                    label: this.props.units.temperature,
                    data: temperature && temperature.slice(1, 10),
                    borderColor: '#808080',
                    backgroundColor: 'white',
                    pointRadius: 3,
                    pointStyle: 'circle',
                    borderWidth: 2,
                    yAxisID: 'axisY1',
                },
                {
                    label: this.props.units.pressure,
                    data: pressure && pressure.slice(1, 10),
                    borderColor: '#800080',
                    backgroundColor: 'white',
                    pointRadius: 3,
                    pointStyle: 'circle',
                    borderWidth: 2,
                    yAxisID: 'axisY2',
                },
            ],
        };


        if (!this.props.displayComponent || this.props.switchComponent) {
            return null;
        }

        return (
            <div className='current-weather current-chart'>
                <ChartJs
                    options={this.options}
                    data={data}
                    type='line'
                />
            </div>
        )
    }
}

export default WeatherChart;
