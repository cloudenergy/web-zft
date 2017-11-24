import { convertToFP } from './helper';

import _addMonths from 'date-fns/add_months';
import _format from 'date-fns/format';
import _addYears from 'date-fns/add_years';
import _addDays from 'date-fns/add_days';

/**
 * 时间操作
 * @param {*number} num 数值
 * @param {*string} type 类型 day/month/year
 */
const add = function(num, type) {};

export const chain = function(task) {
	return Promise.resolve(task);
};

export const format = convertToFP(_format, 2);
export const addMonths = convertToFP(_addMonths, 2);
export const addYears = convertToFP(_addYears, 2);
export const addDays = convertToFP(_addDays, 2);
