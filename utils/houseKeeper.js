'use strict';

import fp from 'lodash/fp';

export const filterOP = fp.reject(c => c.level === 'OP');
