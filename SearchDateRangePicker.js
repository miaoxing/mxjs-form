import React from 'react';
import rp from 'require-promise';
import SearchItem from 'components/SearchItem';
import decamelize from 'decamelize';
import {connect} from "formik";
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  // 解决月份为中文时年月下来未对齐
  .yearselect {
    position: relative;
    top: -2px;
  }
  
  // 适当美化原生的年月下拉
  .yearselect,
  .monthselect {
    background: #fff;
    border: 1px solid #e0e0e0;
  }
`;

@connect
class SearchDateRangePicker extends React.Component {
  static defaultProps = {
    min: 'Min',
    max: 'Max',
  };

  id = decamelize(this.props.name, '-');
  format = 'YYYY-MM-DD';

  componentDidMount() {
    const now = moment();
    $('.js-' + this.id).daterangepicker({
      autoUpdateInput: false,
      showDropdowns: true,
      alwaysShowCalendars: true,
      locale: {
        separator: ' ~ ',
        format: this.format,
        applyLabel: '确定',
        cancelLabel: '清空',
        customRangeLabel: '自定义范围',
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
      },
      ranges: {
        '今天': [now, now],
        '本周': [moment().startOf('isoweek'), moment().endOf('isoweek')],
        /*'昨天': [moment().subtract(1, 'days'), moment().subtract('days', 1)],*/
        '过去7天': [moment().subtract(6, 'days'), now],
        '过去30天': [moment().subtract(29, 'days'), now],
        '本月': [moment().startOf('month'), moment().endOf('month')],
        /*'上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, month).endOf('month')]*/
        '本季度': [moment().startOf('quarter'), moment().endOf('quarter')],
      }
    }).on('apply.daterangepicker', (ev, picker) => {
      this.updateValues(picker.startDate, picker.endDate);
    }).on('cancel.daterangepicker', (ev, picker) => {
      this.updateValues(null, null);
    }).on('blur', (e) => {
      var $el = $(e.target);
      var picker = $el.data('daterangepicker');
      var dateString = $el.val().split(picker.locale.separator),
        start = null,
        end = null;

      if (dateString.length === 2) {
        start = moment(dateString[0], picker.locale.format);
        end = moment(dateString[1], picker.locale.format);
      }

      if (start === null || end === null) {
        start = moment($el.val(), picker.locale.format);
        end = start;
      }

      // 如果输入无效的值,还原为原来的值
      if (!start.isValid() || !end.isValid()) {
        this.updateValues(picker.startDate, picker.endDate);
        return;
      }

      picker.setStartDate(start);
      picker.setEndDate(end);
      picker.updateView();
      // 更新输入框到最新值
      this.updateValues(start, end);
    });
  }

  updateValues(start, end) {
    var startValue = start ? (start.format(this.format) + ' 00:00:00') : '';
    var endValue = end ? (end.format(this.format) + ' 23:59:59') : '';
    var fullValue = start ? (start.format(this.format) + ' ~ ' + end.format(this.format)) : '';

    $('.js-' + this.id + '-min').val(startValue);
    $('.js-' + this.id + '-max').val(endValue);
    $('.js-' + this.id).val(fullValue).trigger('change');

    if (this.props.formik.setFieldValue) {
      this.props.formik.setFieldValue(this.props.name + this.props.min, startValue);
      this.props.formik.setFieldValue(this.props.name + this.props.max, endValue);
      this.props.formik.setFieldValue(this.props.name + 'Range', fullValue);
      this.props.formik.submitForm();
    }
  }

  render() {
    return <>
      <GlobalStyle/>
      <SearchItem label={this.props.label} className={'js-' + this.id} autoComplete="off"
        name={this.props.name + 'Range'}/>
      <input type="hidden" className={'js-' + this.id + '-min'} name={this.props.name + this.props.min}/>
      <input type="hidden" className={'js-' + this.id + '-max'} name={this.props.name + this.props.max}/>
    </>;
  }
}

export default SearchDateRangePicker;
