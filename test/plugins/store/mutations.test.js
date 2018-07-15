'use strict'
import mutations from '../../../plugins/store/mutations';

describe('Store mutations', () => {
  it('should save communities', () => {
    const state = {userInfo: {}};
    mutations.SAVE_COMMUNITIES(state, {})
    expect(state.userInfo).toEqual({businessArea: [], entireArea: []});
  });

  it('should save share communities', () => {
    const state = {userInfo: {businessCity: []}};
    mutations.SAVE_COMMUNITIES(state, {
      data: {
        '130300': {
          'districtId': '130300',
          'name': '秦皇岛市',
          'districts': {
            '130302': {
              'districtId': '130302',
              'name': '海港区',
              'communities': [{
                'geoLocationId': 6423523425708544000,
                'buildingId': '6423523425742098432',
                'name': '速8酒店(建设大街店)'
              }]
            }
          }
        }
      }
    });
    expect(state.userInfo).toEqual({
      businessArea: [{
        area: [{
          'id': '130302',
          'name': '海港区',
        }],
        'id': '130300',
      }],
      businessCity: [{
        city: {
          'id': '130300',
          'name': '秦皇岛市',
        }
      }],
      entireArea: [{
        area: [{
          'id': '130302',
          'name': '海港区',
        }],
        'id': '130300',
      }]
    });
  });
});
