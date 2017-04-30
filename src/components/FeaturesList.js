import React, {PropTypes} from 'react';
import { Table, Icon } from 'antd';
const { Column, ColumnGroup } = Table;
import { Progress } from 'antd';

const columns = [{
  title: 'Site ID',
  dataIndex: 'title',
}, {
  title: 'Latitude',
  dataIndex: 'lat',
}, {
  title: 'Longitude',
  dataIndex: 'lng',
}];




export default class FeaturesList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRowClick(record, index){
    if(this.props.onRowClick) this.props.onRowClick(record, index)
  }

  render() {
    const {features=[]} = this.props;
    const data = features.map((f, key) => {
      return {
        key,
        title: f.properties.title,
        status: f.properties.status,
        percent: f.properties.percent,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
        feature: f
      }
    })
    return (
      <div>
        <Table
          dataSource={data}
          size="small"
          onRowClick={(record, index)=> this.handleRowClick(record, index)}
        >
          <Column
             title="Site ID"
             dataIndex="title"
             key="title"
             render={(text, record) => (<span className={`project-${record.status}`}>{record.title}</span>)}
           />

           <Column
             width={170}
              title="Status"
              dataIndex="percent"
              key="percent"
              render={(text, record) => (<span className={`project-${record.status}`}>{record.status}</span>)}
            />




        </Table>
      </div>
    );
  }
}

FeaturesList.propTypes = {
};
