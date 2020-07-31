import React from 'react';
import {connect} from 'formik';
import moment from 'moment';
import DatePicker from 'components/DatePicker';
import FormItem from "components/FormItem";

class FormItemDatePicker extends React.Component {
  handleChange(date) {
    this.props.formik.setFieldValue(this.props.name, date ? date.format('YYYY-MM-DD') : '');
  }

  render() {
    const name = this.props.name;
    const {formik, ...rest} = this.props;

    return <FormItem
      control={<DatePicker
        selected={formik.values[name] ? moment(formik.values[name]) : null}
        onChange={this.handleChange.bind(this)}
        withPortal={false}
      />}
      {...rest}
    />
  }
}

export default connect(FormItemDatePicker);
