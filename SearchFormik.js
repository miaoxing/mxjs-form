import React from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";
import {withTable} from "@mxjs/a-table";
import {Formik} from "formik";
import _ from 'lodash';
import parseStr from "locutus/php/strings/parse_str";

class SearchFormik extends React.Component {
  static defaultProps = {
    loadQuery: true,
    realTime: true,
  };

  static propTypes = {
    loadQuery: PropTypes.bool,
    realTime: PropTypes.bool,
  };

  delay = 300;
  values = {};

  constructor(props) {
    super(props);

    if (this.props.loadQuery) {
      parseStr(location.search.substr(1), this.values);
    }
  }

  handleChange = (submitForm, e) => {
    if (e.target.type === 'text') {
      this.handleTextChange(submitForm);
    } else {
      submitForm();
    }
  };

  handleTextChange = _.debounce((submitForm) => submitForm(), this.delay);

  handleSubmit = (values) => {
    this.props.table.handleSearch && this.props.table.handleSearch(values);
  };

  render() {
    const {className, loadQuery, realTime, table, ...rest} = this.props;
    return <Formik
      initialValues={this.values}
      onSubmit={this.handleSubmit}
      render={({submitForm}) => (
        <Form
          className={(className ? className + ' ' : '') + 'search-form'}
          onChange={realTime ? this.handleChange.bind(this, submitForm) : null}
          {...rest}
        >
          <div className="form-row">
            {this.props.children}
          </div>
        </Form>
      )}
    />;
  }
}

export default withTable(SearchFormik);
