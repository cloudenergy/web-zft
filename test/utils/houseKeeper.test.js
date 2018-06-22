'use strict';

import {filterOP} from '../../utils/houseKeeper';

describe('HouseKeeper',() => {
  it('should ignore OP role in list', ()=>{
    expect(filterOP([{level: 'OP'}, {level: 'ADMIN'}])).toEqual([{level: 'ADMIN'}])
  })
})
