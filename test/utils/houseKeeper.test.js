'use strict';

import {filterOP} from '../../utils/houseKeeper';

describe('HouseKeeper',() => {
  it('should ignore OP role in list', ()=>{
    expect(filterOP([{level: 'OP'}, {level: 'ADMIN'}])).toEqual([{level: 'ADMIN'}])
  })
  it('should ignore USER role in list', ()=>{
    expect(filterOP([{level: 'USER'}])).toEqual([])
  })
  it('should be able to handle empty list', ()=>{
    expect(filterOP([])).toEqual([])
  })
})
