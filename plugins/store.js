/*
 * @Author: insane.luojie 
 * @Date: 2017-11-10 10:01:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-23 11:49:57
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
			state.userInfo.communitiesChoose = {}
			state.userInfo.communitiesChoose.houseFormat = data.houseType
			state.userInfo.communitiesChoose.data = []
			_.values(data.data).forEach(ele => {
				_.values(ele.districts).forEach(item => {
					item.communities.forEach(communities => {
						communities.cityId = ele.districtId
						communities.areaId = item.districtId
						state.userInfo.communitiesChoose.data.push(communities)
						return
					})
				})
			})
			if (data.houseType === 'SHARE') {
				state.userInfo.communities = state.userInfo.communitiesChoose.data;
			} else if (data.houseType === 'SOLE') {
				state.userInfo.soleCommunities = state.userInfo.communitiesChoose.data
			} else {
				state.userInfo.entireCommunities = state.userInfo.communitiesChoose.data
			}
			// 保存所有城市
			if(state.userInfo.communities!==null&&state.userInfo.soleCommunities!==null&&state.userInfo.entireCommunities!==null&&state.userInfo.allCommunityBoolean) {
				state.userInfo.allCommunity =_.uniqBy(_.concat(state.userInfo.communities,state.userInfo.soleCommunities,state.userInfo.entireCommunities),'geoLocationId') 
				state.userInfo.allCommunityBoolean = false
				return 
			}
			
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
		SAVE_HOUSE_KEERER(state, data) {
			state.userInfo.houseKeeper = data
		},
		ADD_COMMUNITYS(state,data) {
			let addCommunityInfo = {
				'areaId':data.area,
				'cityId':data.city,
				'name':data.location.name,
				'geoLocationId':data.location.id
			}
			if (data.houseFormat === 'SHARE') {
				state.userInfo.communities.push(addCommunityInfo)
				state.userInfo.communities = _.uniqBy(state.userInfo.communities,'geoLocationId')
			} else if (data.houseFormat === 'SOLE') {
				state.userInfo.soleCommunities.push(addCommunityInfo)
				state.userInfo.soleCommunities = _.uniqBy(state.userInfo.soleCommunities,'geoLocationId')
			} else {
				state.userInfo.entireCommunities.push(addCommunityInfo)
				state.userInfo.entireCommunities = _.uniqBy(state.userInfo.entireCommunities,'geoLocationId')
			}
		}
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
					keepAlive: keepAlive?30:0
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
			force,
			val
		}) {
			if(val!==true) {
				if (houseType === 'SHARE') {
					if (state.userInfo.communities) {
						return Promise.resolve(state.userInfo.communities);
					}
				} else if (houseType === 'SOLE') {
					if (state.userInfo.soleCommunities) {
						return Promise.resolve(state.userInfo.soleCommunities);
					}
				} else {
					if (state.userInfo.entireCommunities) {
						return Promise.resolve(state.userInfo.entireCommunities);
					}
				}
			}
			api('communities')
				.query({
					houseFormat: 'SOLE'
				}, {
					projectId: state.userInfo.user.projectId
				})
				.then(data => {
					commit('SAVE_COMMUNITIES', {
						data,
						houseType:'SOLE'
					});
				})
			api('communities')
				.query({
					houseFormat: 'ENTIRE'
				}, {
					projectId: state.userInfo.user.projectId
				})
				.then(data => {
					commit('SAVE_COMMUNITIES', {
						data,
						houseType:'ENTIRE'
					});
				})
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
				})
				.then(() => {
					return state.userInfo.communitiesChoose.data
				})
		},
		GET_DISTRICTS({
			commit,
			state
		}, {
			city,
			isForm
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
				return state.userInfo.businessArea.filter(ele => {
					return ele.id === city
				})
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
		HOUSE_KEERER({
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
					commit('SAVE_HOUSE_KEERER', data)
					return data
				})
		},
		ADD_COMMUNITY({
			commit,
			state
		},{
			val
		}) {
			commit('ADD_COMMUNITYS',val)
		}
	}
};