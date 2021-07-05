/* eslint-disable react/prop-types */
import { Children } from 'react';
import {FormControl as RbFormControl} from 'react-bootstrap';
import {connect} from 'formik';
import Field from './Field';
import Options from './Options';

function isSelect(props) {
  const firstChild = Children.toArray(props.children)[0];
  return firstChild && (firstChild.type === 'option' || firstChild.type === <Options/>.type);
}

function handleFormik(props) {
  // 自动识别select类型
  if (!props.component && isSelect(props)) {
    props.component = 'select';
  }

  if (!props.as) {
    props.as = Field;
  }

  return props;
}

const FormControl = ({formik, ...props}) => {
  if (formik && formik.setFieldValue) {
    props = handleFormik(props);
  }

  // 自动识别select类型
  if (!props.as && isSelect(props)) {
    props.as = 'select';
  }

  if (!props.type && props.as !== 'select' && props.as !== 'textarea') {
    props.type = 'text';
  }

  return (
    <RbFormControl {...props}>{props.children}</RbFormControl>
  );
};

export default connect(FormControl);
