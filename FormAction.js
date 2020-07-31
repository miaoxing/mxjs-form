import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {CListBtn} from "@mxjs/a-clink";

function FormAction({url, list = true}) {
  return (
    <Form.Group as={Row} className="form-actions">
      <Col sm={{span: 10, offset: 2}}>
        <Button type="submit">提交</Button>
        {list && (url ? <Button href={url} variant="secondary" className="ml-3">返回列表</Button> :
          <CListBtn className="ml-3"/>)}
      </Col>
    </Form.Group>
  );
}

export default FormAction;
