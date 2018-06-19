import {readableDuration} from '../../utils/date.js';

describe('DateUtil', () => {
  it('should give human readable duration description between 2 timestamps', () => {
    expect(readableDuration(30000000)).toBe('11个月13天');
    expect(readableDuration(300000000)).toBe('9年6个月3天');
  });
});
