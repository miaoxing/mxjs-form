import React from "react";
import MFormItem from "./MFormItem";
import MobileVerifyCode from "components/MobileVerifyCode";
import {connect} from "formik";

@connect
class Child extends React.Component {
  static defaultProps = {
    verified: false,
    reset: false,
  };

  verifiedMobile;

  showVerifyCode() {
    if (!this.props.verified) {
      return true;
    }

    if (this.verifiedMobile !== this.props.formik.values.mobile) {
      return true;
    }

    return false;
  }

  render() {
    // 记录起验证过的手机号码
    if (!this.verifiedMobile && this.props.verified === true && this.props.formik.values.mobile) {
      this.verifiedMobile = this.props.formik.values.mobile;
    }

    return <>
      <MFormItem label="手机" name="mobile" className="js-mobile"/>
      {this.showVerifyCode() && <MobileVerifyCode/>}
    </>;
  }
}

// NOTE: Formik 2 支持 ForwardRef 后才合并 Child
export default class MFormItemMobileVerifyCode extends React.Component {
  reset(reset) {
    reset && $('.js-verify-code-send').verifyCode('reset');
  }

  render() {
    return <Child {...this.props}/>
  }
}
