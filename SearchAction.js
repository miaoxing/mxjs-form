import React from 'react';
import {Col} from 'react-bootstrap';
import classNames from 'classnames';

export default function SearchAction({className, ...props}) {
  return (
    <Col sm={{span: 11, offset: 1}} className={classNames('mt-3 mt-sm-0', className)} {...props}>
      {props.children}
    </Col>
  );
}
