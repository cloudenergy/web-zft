'use strict';

import userInfo from './userinfo'
import _ from 'lodash'

export default {
  UPDATE_ENV(state, data) {
    Object.keys(data).forEach(item => {
      state.userInfo[item] = data[item];
    });
  },
  SAVE_COMMUNITIES(state, data) {
    // 写的麻烦了，等等重构
    _.values(data.data).forEach(ele => {
      var city = {}
      city.id = ele.districtId
      city.name = ele.name
      state.userInfo.businessCity.push({
        'houseFormat': data.houseType,
        city
      })
    })
    state.userInfo.businessArea = _.values(data.data).map(ele => {
      var cityArea = _.values(ele.districts).map(item => {
        return {
          id: item.districtId,
          name: item.name
        }
      })
      return {
        id: ele.districtId,
        area: cityArea
      }
    })

    if (data.houseType === 'SHARE') {
      state.userInfo.shareArea = state.userInfo.businessArea
    } else if (data.houseType === 'SOLE') {
      state.userInfo.soleArea = state.userInfo.businessArea
    } else {
      state.userInfo.entireArea = state.userInfo.businessArea
    }
  },
  SAVE_OTHERCOST(state, data) {
    state.userInfo.othercost = _.filter(data, {
      group: '加收费用'
    });
  },
  SAVE_CITY_AREA(state, data) {
    state.userInfo.cityArea = data
  },
  Login_Info(state, data) {
    state.userInfo.successInfo = data
  },
  CLEAR_USER(state) {
    state.userInfo = userInfo()
  },
  SAVE_HOUSE_KEEPER(state, data) {
    state.userInfo.houseKeeper = data
  },
}
