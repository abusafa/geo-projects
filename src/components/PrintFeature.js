/*global L*/

import React, {PropTypes} from 'react';
import {Progress} from 'antd';

export default class PrintFeature extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {
            features,
            zoom = 13,
            mapid = 'mapbox.dark',
            center = [0, 0],
            size='600x300'
        } = this.props;
        let featuresText = features.map((f) => {
            return `pin-s-${f.properties['marker-symbol']}+${f.properties['marker-color'].substr(1)}(${f.geometry.coordinates.join(',')})`
        }).join(',');

        const url = `https://api.mapbox.com/v4/${mapid}/${featuresText}/${center.join(',')},${zoom}/${size}@2x.png?access_token=pk.eyJ1IjoiaWhhYiIsImEiOiJZT19QbkJJIn0.ROWLhlTd-2mI94QvdzrH8g`;
        console.log(url);
        return (
            <div>
                {features && <div>
                    <img src={url}/> {this.props.children}
                </div>
                }
            </div>
        );
    }
}

PrintFeature.propTypes = {};
