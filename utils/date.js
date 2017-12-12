import { convertToFP } from './helper';

import _addMonths from 'date-fns/add_months';
import _format from 'date-fns/format';
import _addYears from 'date-fns/add_years';
import _addDays from 'date-fns/add_days';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
export { chain } from './helper';

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

export const timeDifferenceInText = (from, to) => distanceInWordsStrict(from, to, {unit: 'M', partialMethod: 'round'})

