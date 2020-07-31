import React from "react";
import {FormLabel, FormGroup} from "react-bootstrap";
import DatePicker from 'components/DatePicker'
import moment from "moment";
import 'jquery-unparam';
import 'react-datepicker/dist/react-datepicker.css';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .form .form-label {
    width: 7em;
  }
`;

class MFormItemDateRange extends React.Component {
  static defaultProps = {
    min: 'Min',
    max: 'Max'
  };

  minName = this.props.name + this.props.min;
  maxName = this.props.name + this.props.max;

  constructor(props, context) {
    super(props, context);

    const params = $.unparam(location.search.substring(1));
    this.state = {
      dateMin: params[this.minName] ? moment(params[this.minName]) : null,
      dateMax: params[this.maxName] ? moment(params[this.maxName]) : null,
    };
  }

  handleChangeStart(dateMin) {
    let state = {dateMin};

    if (dateMin && dateMin.isAfter(this.state.dateMax)) {
      state.dateMax = dateMin;
    }

    this.setState(state);
  }

  handleChangeEnd(dateMax) {
    let state = {dateMax};

    if (dateMax && dateMax.isBefore(this.state.dateMin)) {
      state.dateMin = dateMax;
    }

    this.setState(state);
  }

  render() {
    return <>
      <GlobalStyle/>
      <FormGroup>
        <FormLabel>开始{this.props.label}日期</FormLabel>
        <div className="col-control">
          <DatePicker
            selected={this.state.dateMin}
            selectsStart
            startDate={this.state.dateMin}
            endDate={this.state.dateMax}
            onChange={this.handleChangeStart.bind(this)}
            name={this.minName}
            placeholderText="请选择日期"
          />
        </div>
      </FormGroup>
      <FormGroup>
        <FormLabel>结束{this.props.label}日期</FormLabel>
        <div className="col-control">
          <DatePicker
            selected={this.state.dateMax}
            selectsEnd
            startDate={this.state.dateMin}
            endDate={this.state.dateMax}
            onChange={this.handleChangeEnd.bind(this)}
            name={this.maxName}
            placeholderText="请选择日期"
          />
        </div>
      </FormGroup>
    </>
  }
}

export default MFormItemDateRange;
