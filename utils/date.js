import { convertToFP } from './helper';

import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';

/**
 * 时间操作
 * @param {*number} num 数值
 * @param {*string} type 类型 day/month/year
 */
const add = function(num, type) {};

let dateUtils = {
	format,
	addMonths
};

const args = {
	format: 2,
	addMonths: 2
};

// Object.keys(dateUtils).forEach(item => {
// 	const method = dateUtils[item];
// 	dateUtils[item] = convertToFP(method, args[item]);
// });

dateUtils.add = add;

export default dateUtils;
