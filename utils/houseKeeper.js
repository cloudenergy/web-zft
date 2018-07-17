'use strict';

import fp from 'lodash/fp';

export const filterOP = fp.reject(c => fp.includes(fp.get('level')(c))(['OP', 'USER']));
