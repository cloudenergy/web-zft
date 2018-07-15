/*
 * @Author: insane.luojie
 * @Date: 2017-11-10 10:01:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-14 21:28:57
 */

import api from '~/plugins/api';
import mutations from './store/mutations';
import userInfo from './store/userinfo';
import {
  fromPairs,
  map
} from 'lodash';
import _ from 'lodash';
import md5 from 'js-md5'


export default {
  state: {
    userInfo: userInfo()
  },
  mutations: mutations,
  actions: {
    POST_LOGIN({
      commit,
      state
    }, {
      username,
      password,
      keepAlive
    }) {
      return api('login', {
        username: username,
        password: md5(password),
        keepAlive
      })
        .then(res => {
          if (res.code === 0) {
            commit('Login_Info', true)
          } else {
            commit('Login_Info', false)
          }
        })
    },

    GET_ENVIRONMENTS({
      commit,
      state
    }) {
      return api('environments')
        .then(env => fromPairs(map(env, i => [i.key, i.value])))
        .then(env => {
          commit('UPDATE_ENV', env);
          // sync user
          localStorage.user = JSON.stringify({
            auth: true,
            ...env.user
          });
          const successInfo = state.userInfo.successInfo
          state.userInfo = userInfo()
          state.userInfo.successInfo = successInfo
        });
    },
    GET_COMMUNITIES({
      commit,
      state
    }, {
      houseType,
      districtsCode,
    }) {
      return api('communities')
        .query({
          houseFormat: houseType
        }, {
          projectId: state.userInfo.user.projectId
        })
        .then(data => {
          commit('SAVE_COMMUNITIES', {
            data,
            houseType
          });
          return data;
        })
    },
    GET_DISTRICTS({
      commit,
      state
    }, {
      city,
      isForm,
      type,
      roadType
    }) {
      if (isForm) {
        return api('districts', {
          level: 3,
          cityId: city
        })
          .then(data => {
            return data;
          })
      } else {
        // 返回城市列表
        if (roadType === 'flow') {
          return _.concat(state.userInfo.shareArea, state.userInfo.soleArea, state.userInfo.entireArea)
        } else {
          if (type === 'SHARE') {
            return state.userInfo.shareArea
          } else if (type === 'SOLE') {
            return state.userInfo.soleArea
          } else {
            return state.userInfo.entireArea
          }
        }
      }
    },
    GET_CITY_AREA({
      commit,
      state
    }) {
      if (Object.keys(state.userInfo.cityArea).length) {
        return state.userInfo.cityArea;
      }
      return api('districts', {
        level: 2
      })
        .then(data => {
          commit('SAVE_CITY_AREA', data);
          return data;
        })
    },
    GET_COMMUNITY_CITY_AREA({
      commit,
      state
    }) {
      if (Object.keys(state.userInfo.cityArea).length) {
        return state.userInfo.cityArea;
      }
      return api('districts', {
        level: 2
      })
        .then(data => {
          commit('SAVE_CITY_AREA', data);
          return data;
        })
    },
    GET_OTHERCOST({
      commit,
      state
    }) {
      if (state.userInfo.othercost) {
        return Promise.resolve(state.userInfo.othercost);
      }
      return api('config_list')
        .query({}, {
          projectId: state.userInfo.user.projectId
        })
        .then(data => {
          commit('SAVE_OTHERCOST', data);
          return _.filter(data, {
            group: '加收费用'
          });
        });
    },
    CLEAR_USER_INFO({
      commit,
      state
    }) {
      commit('CLEAR_USER')
    },
    HOUSE_KEEPER({
      commit,
      state
    }, {
      projectId
    }) {
      if (state.userInfo.houseKeeper) {
        return Promise.resolve(state.userInfo.houseKeeper);
      }
      return api('credentials')
        .query({}, {
          projectId
        })
        .then(data => {
          commit('SAVE_HOUSE_KEEPER', data)
          return data
        })
    },
  }
};
