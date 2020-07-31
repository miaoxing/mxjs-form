import React from 'react';
import FormItem from "components/FormItem";
import {connect, getIn} from "formik";
import rp from 'require-promise';

const loader = rp('ueditor');

class FormItemUeditor extends React.Component {
  editor;

  componentDidUpdate(prevProps) {
    if (!this.editor) {
      return;
    }

    if (getIn(prevProps.formik.values, this.props.name) !== getIn(this.props.formik.values, this.props.name)) {
      this.editor.ready(() => {
        this.editor.setContent(getIn(this.props.formik.values, this.props.name));
      });
    }
  }

  componentDidMount() {
    this.getEditor().then(() => {
      this.editor.addListener('contentChange', () => {
        this.props.formik.setFieldValue(this.props.name, this.editor.getContent());
      });
    });
  }

  getEditor() {
    return loader.then(() => {
      this.editor = UE.getEditor(this.props.name);
    });
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  render() {
    const {...rest} = this.props;

    // NOTE: bsPrefix 传入空无效
    return <FormItem component="textarea" controlSize={6} bsPrefix=" " {...rest}/>;
  }
}

export default connect(FormItemUeditor);
