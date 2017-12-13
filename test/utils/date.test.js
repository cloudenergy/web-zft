import {chineseHuman} from '../../utils/date.js';

describe('DateUtil', () => {
	it('should calculate human readable duration between 2 timestamps', () => {
		expect(chineseHuman(30000000)).toBe('11个月13天');
	});
});
