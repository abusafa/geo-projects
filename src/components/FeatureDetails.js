import React, {PropTypes} from 'react';
import {Progress} from 'antd';
import {Button, Modal} from 'antd';
import PrintFeature from './PrintFeature.js';

export default class FeatureDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePrint() {
        var content = document.getElementById("divcontents");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    render() {
        const {feature} = this.props;
        //success exception active


        return (
            <div>
                <div className="feature-title">
                    <h1 >{feature && feature.properties.title}</h1>

                </div>

                <h2 className={feature.properties.status}>
                  <span className={`project-${feature.properties.status}`}>{feature && feature.properties.status}</span>
                </h2>

                <div className="feature-coordinates">
                    <h4>{feature && feature.geometry.coordinates.join(' , ')}</h4>
                </div>
                <Button type="primary" icon="print" size="large" onClick={() => this.handlePrint()}>Print or Export to PDF</Button>

                <iframe id="ifmcontentstoprint" style={{
                    height: 0,
                    width: 0,
                    position: "absolute"
                }}></iframe>

                <div id="divcontents">
                    <PrintFeature features={[feature]} center={feature.geometry.coordinates} zoom={14} mapid="mapbox.streets">
                      <h1>{feature.properties.title}</h1>
                      <h2 className={feature.properties.status}>{feature.properties.status} </h2>
                      <h4 style={{color:"#999"}}>{feature.geometry.coordinates.join(' , ')}</h4>
                    </PrintFeature>
                </div>

            </div>
        );
    }
}

FeatureDetails.propTypes = {};
