'use strict';

import {removePrefix} from '../../utils/helper';

describe('Util methods', () => {
  it('should hide Hai Xing device id prefix', () => {
    expect(removePrefix('HX01234')).toBe('01234');
  });
  it('should hide YTL device id prefix', () => {
    expect(removePrefix('YTL01234')).toBe('01234');
  });

  it('should hide any other device id prefix', () => {
    expect(removePrefix('SQ01234')).toBe('01234');
    expect(removePrefix('QS01234')).toBe('01234');
  });

  it('should return original id if start with number', () => {
    expect(removePrefix('1201234')).toBe('1201234');
  });
})
