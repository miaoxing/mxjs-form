import React from 'react';
import FormItem from "components/FormItem";
import ReactDOM from "react-dom";
import {connect} from "formik";
import rp from 'require-promise';

const loader = rp('plugins/admin/js/image-upload');

class FormItemImage extends React.Component {
  static defaultProps = {
    label: '图片',
    name: 'images',
  };

  $el = null;

  componentDidUpdate(prevProps) {
    if (this.props.formik.values.images === prevProps.formik.values.images) {
      return;
    }

    const imageUpload = this.$el.data('image-upload');
    imageUpload && imageUpload.setImages(this.props.formik.values.images);
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);
    this.$el = $('input', dom);

    loader.then(() => {
      this.$el.imageUpload({
        max: 10,
        images: this.props.formik.values.images,
        onChange: () => {
          let images = [];
          $(dom).find('.js-image-item').each(function () {
            images.push($(this).find('input').val());
          });
          this.props.formik.setFieldValue(this.props.name, images);
        }
      });
    });
  }

  render() {
    const {...rest} = this.props;

    return <FormItem required {...rest}/>
  }
}

export default connect(FormItemImage);
