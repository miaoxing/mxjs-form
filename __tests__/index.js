import {render} from '@testing-library/react';
import {Form} from '..';
import {MemoryRouter} from 'react-router';

describe('test', () => {
  test('basic', () => {
    const result = render(<MemoryRouter>
      <Form initialValues={{}}/>
    </MemoryRouter>);
    expect(result.container).toMatchSnapshot();
  });
});
