import React from 'react';
import {Col, FormLabel, FormControl, FormGroup, Row} from 'react-bootstrap';

const FormText = ({label, control, labelSize = 2, detailSize = 10, children}) => {
  return <FormGroup as={Row}>
    {label && <FormLabel column sm={labelSize} className="text-sm-right">
      {label}
    </FormLabel>}
    <Col sm={label ? detailSize : 12}>
      {control || <div className="form-control-plaintext">{children || '-'}</div>}
    </Col>
  </FormGroup>;
};

export default FormText;
