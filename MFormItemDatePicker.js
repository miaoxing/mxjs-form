/* eslint-disable react/prop-types */
import { Component } from 'react';
import {FormLabel, FormGroup} from 'react-bootstrap';
import {connect} from 'formik';
import moment from 'moment';
import Required from './Required';
import DatePicker from 'components/DatePicker';

class MFormItemDatePicker extends Component {
  handleChange(date) {
    this.props.formik.setFieldValue(this.props.name, date ? date.format('YYYY-MM-DD') : '');
  }

  render() {
    const {label, name, formik, placeholder, ...rest} = this.props;
    if (placeholder) {
      rest.placeholderText = placeholder;
    }

    return <FormGroup>
      <FormLabel>
        {label}
        {this.props.required && <>{' '}<Required/></>}
      </FormLabel>
      <div className="col-control">
        <DatePicker
          selected={formik.values[name] ? moment(formik.values[name]) : null}
          onChange={this.handleChange.bind(this)}
          {...rest}
        />
      </div>
    </FormGroup>;
  }
}

export default connect(MFormItemDatePicker);
