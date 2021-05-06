/* eslint-disable react/prop-types */
import React from 'react';
import propTypes from 'prop-types';
import {Formik, Form as FormikForm} from 'formik';
import {withRouter} from 'react-router-dom';
import curUrl from '@mxjs/cur-url';
import $ from 'miaoxing';

/**
 * 在基础的表单上增加了
 *
 * 1. 简化 Formik 和 form 的层级结构
 * 2. 默认自动从后台读取数据
 * 3. 点击提交数据发送到后台
 * 4. 提交成功后跳转到相应页面
 */
class Form extends React.Component {
  static propTypes = {
    /**
     * 提交到后台的地址，默认自动识别为当前表单地址
     */
    url: propTypes.string,

    /**
     * 获取表单数据的后台地址
     */
    valuesUrl: propTypes.oneOfType([propTypes.string, propTypes.bool]),

    /**
     * 提交成功后跳转的地址，默认为上一级页面
     */
    redirectUrl: propTypes.string,

    /**
     * 渲染子组件
     */
    render: propTypes.func,

    /**
     * HTML form 元素的属性
     */
    formProps: propTypes.object,

    /**
     * Formik 的属性
     */
    initialValues: propTypes.object,
  };

  state = {
    initialValues: this.props.initialValues,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.initialValues && props.initialValues !== state.initialValues) {
      return {
        initialValues: props.initialValues,
      };
    }
    return null;
  }

  handleSubmit = (values) => {
    $.get({
      url: this.getSubmitUrl(),
      method: 'post',
      data: values,
      loading: true,
    }).then(ret => {
      $.ret(ret).suc(() => {
        this.redirect(this.getRedirectUrl());
      });
    });
  };

  redirect(url) {
    if (url !== this.props.history.location.pathname) {
      this.props.history.push(url);
    }
  }

  getSubmitUrl() {
    return this.props.url || curUrl.apiForm();
  }

  getRedirectUrl() {
    return this.props.redirectUrl || curUrl.index();
  }

  getValuesUrl() {
    if (typeof this.props.valuesUrl === 'undefined') {
      return curUrl.apiData();
    }

    return this.props.valuesUrl;
  }

  componentDidMount() {
    if (this.props.initialValues) {
      return;
    }

    const valuesUrl = this.getValuesUrl();
    if (valuesUrl !== false) {
      $.get(valuesUrl).then(ret => {
        this.setState({initialValues: this.filterValues(ret.data)});
      });
    }
  }

  /**
   * 将输入项的值从 null 转换为空字符,因为 React input 值不允许为 null
   *
   * @param object data
   * @returns object
   */
  filterValues(data) {
    Object.keys(data).forEach(key => {
      if (data[key] === null) {
        data[key] = '';
      }
    });
    return data;
  }

  render() {
    const {render, children, formProps} = this.props;
    return (
      <Formik
        initialValues={this.state.initialValues}
        enableReinitialize={true}
        onSubmit={this.handleSubmit}
      >
        {(props) => (
          <FormikForm {...formProps}>
            {render ? render(props) : children}
          </FormikForm>
        )}
      </Formik>
    );
  }
}

export default withRouter(Form);
