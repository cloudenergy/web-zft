import {timeDifferenceInText} from '../../utils/date.js';

describe('DateUtil', () => {
	it('should calculate months between 2 timestamps', () => {
		expect(timeDifferenceInText(0, 0)).toBe('0 months');
		expect(timeDifferenceInText(new Date(2017, 1, 1), new Date(2017, 2, 1))).toBe('1 month');
		expect(timeDifferenceInText(new Date(2017, 1, 1), new Date(2018, 1, 1))).toBe('12 months');
		expect(timeDifferenceInText(new Date(2017, 1, 1), new Date(2018, 6, 30))).toBe('18 months');
	});
});
