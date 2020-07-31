import React from "react";
import {Form} from 'react-bootstrap';
import {Field, getIn} from 'formik';

export default ({id, label, ...props}) => {
  if (!id) {
    id = props.name + '-' + props.value;
  }
  if (!label && !props.children) {
    label = ' ';
  }

  return (
    <Field
      name={props.name}
      render={({field, form}) => {
        // Checked状态要自行维护 @link https://github.com/jaredpalmer/formik/pull/1115
        let checked;
        let extProps = {};

        if (typeof field.value === 'object') {
          // 多个checkbox选择的情况
          checked = field.value.includes(props.value);
          extProps.onChange = () => {
            let nextValue;
            if (checked) {
              nextValue = field.value.filter(value => value !== props.value);
            } else {
              nextValue = field.value.concat(props.value);
            }
            form.setFieldValue(props.name, nextValue);
          }
        } else {
          // 单个checkbox或radio的情况
          // HTML会转换为字符串，因此不能用严格比较
          checked = props.value == field.value;
        }

        return <Form.Check custom checked={checked} id={id} label={label} {...field} {...props} {...extProps}/>
      }}
    />
  );
}
