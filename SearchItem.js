import { Fragment, Component } from 'react';
import FormItem from './FormItem';

class SearchItem extends Component {
  render() {
    return <FormItem container={Fragment} labelSize={1} controlSize={3} {...this.props} />;
  }
}

export default SearchItem;
