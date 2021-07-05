/* eslint-disable react/prop-types */
import { Col, Form, Row } from 'react-bootstrap';
import decamelize from 'decamelize';
import FormControl from './FormControl';
import Required from './Required';

function FormGroup({children}) {
  return <Form.Group as={Row}>{children}</Form.Group>;
}

function FormItem({container = FormGroup, label, name, help, labelSize = 2, controlSize = 4, helpSize = 6, groupSize, ...props}) {
  const id = name ? decamelize(name, '-') : null;
  const Component = container; // 大写字母开头才会识别为组件

  return (
    <Component>
      <Form.Label column sm={labelSize} htmlFor={id}
        className={'text-sm-right ' + (groupSize ? ' col-form-label-' + groupSize : '')}>
        {props.required && <Required/>}
        {label}
      </Form.Label>
      <Col sm={controlSize}>
        {props.control || <FormControl id={id} name={name} className={(groupSize && ' form-control-' + groupSize)}
          {...props}>
          {props.children}
        </FormControl>}
      </Col>
      {help && <Form.Label column sm={helpSize} className="text-muted">
        {help}
      </Form.Label>}
    </Component>
  );
}

export default FormItem;
