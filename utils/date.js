import { convertToFP } from './helper';

import _addMonths from 'date-fns/add_months';
import _format from 'date-fns/format';
import _addYears from 'date-fns/add_years';
import _addDays from 'date-fns/add_days';
export { chain } from './helper';
import humanizeDuration from 'humanize-duration'
import endOfDay from 'date-fns/end_of_day'

/**
 * 时间操作
 * @param {*number} num 数值
 * @param {*string} type 类型 day/month/year
 */
export const add = function(num, type) {};

export const format = convertToFP(_format, 2);
export const addMonths = convertToFP(_addMonths, 2);
export const addYears = convertToFP(_addYears, 2);
export const addDays = convertToFP(_addDays, 2);

const oneExtraDay = 50296857;

export const readableDuration = date => humanizeDuration.humanizer({
  language: 'zh_CN',
  units: ['y', 'mo', 'd'],
  round: true,
  delimiter: '',
  spacer: ''
})(date*1000 + oneExtraDay);

export const differentTime = data => {
  return endOfDay(new Date(data))
}
