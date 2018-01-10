import _ from 'lodash'

const newList = ( data, filter ) => _(data).difference(filter).value()

describe('TestCheck',() => {
    it("I dont know what to write", ()=>{
        expect(newList([5,4,2,3],[4,2,1])).toEqual([5,3])
    })
})