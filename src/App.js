
/*global L*/


import React, { Component } from 'react';
import logo from './logo.svg';
import hoilogo from './logo.jpg';
import './App.css';
import '../node_modules/antd/dist/antd.min.css';
import styled from 'styled-components';
import geojson from './data.geo.json';
import FeatureDetails from './components/FeatureDetails.js';
import FeaturesList from './components/FeaturesList.js';
import { Tabs, Button } from 'antd';
import {each} from 'lodash';
import faker from 'faker';
import PrintFeature from './components/PrintFeature.js'
const TabPane = Tabs.TabPane;

class App extends Component {

  constructor(){
    super();
    this.state = {
      selectedMarker: null,
      selectedFeature: null,
      tapActiveKey:"1",
      zoom:11,
      center: {lat: 21.453095, lng: 39.707877},
      mapid:'mapbox.dark'
    }
  }

  componentDidMount(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiaWhhYiIsImEiOiJZT19QbkJJIn0.ROWLhlTd-2mI94QvdzrH8g';

    const layers = {
        Dark: L.mapbox.tileLayer('mapbox.dark'),
        Streets: L.mapbox.tileLayer('mapbox.streets'),
        Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
        Satellite: L.mapbox.tileLayer('mapbox.satellite')
    };




    window.mapview = L.mapbox.map('map-canvas', null)
        .setView([this.state.center.lat, this.state.center.lng], this.state.zoom);

    window.mapview.on('moveend', (e) => {
      this.setState({
        zoom:e.target.getZoom(),
        center:e.target.getCenter()
      })

      console.log(this.state.center);
      console.log(e.target.getZoom());
    })

    window.mapview.on('baselayerchange', (e) => {
      console.log(e);
      let mapid ="mapbox.dark";

      switch(e.name){
        case 'Dark':
          mapid ="mapbox.dark"
        break;
        case 'Streets':
          mapid ="mapbox.streets"
        break;
        case 'Outdoors':
          mapid ="mapbox.outdoors"
        break;
        case 'Satellite':
          mapid ="mapbox.satellite"
        break;
      }

      this.setState({
        mapid:mapid
      })
    })

    layers.Dark.addTo(window.mapview);
    L.control.layers(layers).addTo(window.mapview);

    window.myLayer = L.mapbox.featureLayer().addTo(window.mapview);
    window.myLayer.setGeoJSON(geojson);

    window.myLayer.on('click', (e) => {
        this.setState({
          selectedFeature: e.layer.feature,
          selectedMarker: e.layer,
          tapActiveKey: "2"
        })
    });



  }

  onChange(tapActiveKey){
    this.setState({ tapActiveKey });
  }

  handleRowClick(record, index){
    window.mapview.setView([record.lat, record.lng], 15);
    this.setState({
      selectedFeature: record.feature,
    })

  }
  handlePrint() {
      var content = document.getElementById("divcontentsall");
      var pri = document.getElementById("ifmcontentstoprintall").contentWindow;
      pri.document.open();
      pri.document.write(content.innerHTML);
      pri.document.close();
      pri.focus();
      pri.print();
  }

  render() {
    return (
      <div className="App">
        <div id="map-canvas" className="map-canvas"></div>
        <Button type="primary" style={{position:'absolute', bottom:10, left:10}} icon="print" size="large" onClick={() => this.handlePrint()}>Print or Export view to PDF</Button>
        <div id="divcontentsall">
            <PrintFeature features={geojson.features} center={[this.state.center.lng, this.state.center.lat]} zoom={this.state.zoom} mapid={this.state.mapid} size='600x400'>
            </PrintFeature>
        </div>
        <iframe id="ifmcontentstoprintall" style={{
            height: 0,
            width: 0,
            position: "absolute"
        }}></iframe>

        <div className="sidebar">
          <img src={hoilogo} />
          <Tabs
            defaultActiveKey="1"
            activeKey={this.state.tapActiveKey}
            onChange={(activeKey)=>this.onChange(activeKey)}
            >
            <TabPane tab="List" key="1">
              <FeaturesList
                features={geojson.features}
                onRowClick={(record, index)=>this.handleRowClick(record, index)}
              />
            </TabPane>
            <TabPane tab="Info" key="2">
              <FeatureDetails feature={this.state.selectedFeature}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
