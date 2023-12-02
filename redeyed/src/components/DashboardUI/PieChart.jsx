
  

import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: props.options,
      series: props.series,
      labels: props.labels
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

PieChart.defaultProps = {
  options: {},
  series: [],
  labels: []
};

PieChart.propTypes = {
  options: PropTypes.shape({}),
  series: PropTypes.shape([]),
  labels: PropTypes.shape([])
};

export default PieChart;
