/*
 * @Author: insane.luojie
 * @Date: 2017-11-10 10:01:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-14 21:28:57
 */

import api from '~/plugins/api';
import {
	fromPairs,
	merge,
	map
} from 'lodash';
import _ from 'lodash';
import md5 from 'js-md5'

let localUser = '';
try {
	localUser = JSON.parse(localStorage.user);
} catch (e) {
	localUser = {
		projectId: 100
	};
}

function userInfo() {
	localUser = '';
	if (localStorage.user !== undefined) {
		localUser = JSON.parse(localStorage.user);
	}
	return {
		user: {
			...localUser
		},
		cityArea: {},
		houseTypes: {
			SOLE: ['SHARE', '合租'],
			SHARE: ['SOLE', '整租'],
			ENTIRE: ['ENTIRE', '整幢']
		},
		defaultHouseType: 'SOLE',
		communities: null,
		othercost: null,
		soleCommunities: null,
		entireCommunities: null,
		successInfo: false,
		businessCity: [],
		businessArea: null,
		communitiesChoose: {},
		houseKeeper: null,
		allCommunityBoolean:true,
		index:0,
		toward: [{
				EN: 'S',
				CH: '南'
			},
			{
				EN: 'N',
				CH: '北'
			},
			{
				EN: 'W',
				CH: '西'
			},
			{
				EN: 'E',
				CH: '东'
			},
			{
				EN: 'NE',
				CH: '东北'
			},
			{
				EN: 'SE',
				CH: '东南'
			},
			{
				EN: 'SW',
				CH: '西南'
			},
			{
				EN: 'NW',
				CH: '西北'
			}
		]
	}
}

export default {
	state: {
		userInfo: userInfo()
	},
	mutations: {
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

      _.values(data.data).forEach(ele => {
        _.values(ele.districts).forEach(item => {
          item.communities.forEach(communities => {
            communities.cityId = ele.districtId
            communities.areaId = item.districtId
          })
        })
      })
		},
		SAVE_OTHERCOST(state, data) {
			state.userInfo.othercost = _.filter(data, {
				group: '加收费用'
			});
		},
		SAVE_CITY_AREA(state, data, ) {
			state.userInfo.cityArea = data
		},
		Login_Info(state, data) {
			state.userInfo.successInfo = data
		},
		CLEAR_USER(state, data) {
			state.userInfo = userInfo()
		},
		SAVE_HOUSE_KEEPER(state, data) {
			state.userInfo.houseKeeper = data
		},
  },
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
				if(roadType==='flow') {
					return _.concat(state.userInfo.shareArea, state.userInfo.soleArea, state.userInfo.entireArea)
				}else {
					if(type==='SHARE') {
						return state.userInfo.shareArea
					} else if(type==='SOLE') {
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
