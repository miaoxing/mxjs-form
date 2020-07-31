import React from 'react';
import FormItem from './FormItem';

class SearchItem extends React.Component {
  render() {
    return (
      <FormItem container={React.Fragment} labelSize={1} controlSize={3} {...this.props} />
    );
  }
}

export default SearchItem
