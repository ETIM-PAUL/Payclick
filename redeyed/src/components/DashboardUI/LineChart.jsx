
  
import React, { Component } from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        ...props.options,
        xaxis: {
          categories: props.categories
        }
      },
      series: props.series
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

LineChart.defaultProps = {
  options: { chart: { id: "" } },
  categories: [],
  series: []
};

LineChart.propTypes = {
  options: PropTypes.shape({}),
  categories: PropTypes.shape([]),
  series: PropTypes.shape([])
};

export default LineChart;
