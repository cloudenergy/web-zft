/*
 * @Author: insane.luojie 
 * @Date: 2017-11-10 10:01:31 
 * @Last Modified by: mikey.other
 * @Last Modified time: 2018-02-07 16:15:01
 */

import api from '~/plugins/api';
import { fromPairs, merge, map } from 'lodash';
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

export default {
	state: {
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
		soleCommunities:null,
		entireCommunities:null,
		successInfo:false,
		businessCity:[],
		businessArea:null,
		communitiesChoose:{}
	},
	mutations: {
		UPDATE_ENV(state, data) {
			Object.keys(data).forEach(item => {
				state[item] = data[item];
			});
		},
		SAVE_COMMUNITIES(state, data) {
			_.values(data.data).forEach(ele=>{
				var city = {}
				city.id = ele.districtId
				city.name = ele.name
				state.businessCity.push({'houseFormat':data.houseType,city})
			})
			state.businessArea=_.values(data.data).map(ele=>{
				var cityArea = _.values(ele.districts).map(item=>{
					var area = {}
					area.id = item.districtId
					area.name = item.name
					return area
				})
				var test = {}
				test.id=ele.districtId
				test.area = cityArea
				return test
			})
			state.communitiesChoose = {}
			state.communitiesChoose.houseFormat = data.houseType
			state.communitiesChoose.data = []
			_.values(data.data).forEach(ele=>{
				_.values(ele.districts).forEach(item=>{
					item.communities.forEach(communities=>{
						communities.cityId = ele.districtId
						communities.areaId = item.districtId
						state.communitiesChoose.data.push(communities)
					})
				})
			})
			if(data.houseType==='SHARE'){
				state.communities = state.communitiesChoose.data;
			}else if(data.houseType==='SOLE'){
				state.soleCommunities = state.communitiesChoose.data
			}else{
				state.entireCommunities = state.communitiesChoose.data
			}
		},
		SAVE_OTHERCOST(state, data) {
			state.othercost = _.filter(data, { group: '加收费用' });
		},
		SAVE_CITY_AREA(state,data,) {
			state.cityArea = data
		},
		Login_Info(state, data){
			state.successInfo = data
		}
	},
	actions: {
		POST_LOGIN({ commit, state },{username,password}) {
			return api('login', {
				username: username,
				password: md5(password)
			})
			.then(res=>{
				if(res.code===0){
					commit('Login_Info', true)
				}else{
					commit('Login_Info', false)
				}
			})
		},

		GET_ENVIRONMENTS({ commit, state }) {
			return api('environments')
				.then(env => fromPairs(map(env, i => [i.key, i.value])))
				.then(env => {
					commit('UPDATE_ENV', env);

					// sync user
					localStorage.user = JSON.stringify({
						auth: true,
						...env.user
					});
				});
		},
		GET_COMMUNITIES(
			{ commit, state },
			{ houseType, districtsCode, force }
		) {
			if(houseType==='SHARE'){
				if (state.communities ) {
					return Promise.resolve(state.communities);
				}
			}else if(houseType==='SOLE'){
				if (state.soleCommunities ) {
					return Promise.resolve(state.soleCommunities);
				}
			}else {
				if (state.entireCommunities ) {
					return Promise.resolve(state.entireCommunities);
				}
			}
			return api('communities')
				.query(
					{ houseFormat: houseType, districtsCode },
					{ projectId: state.user.projectId }
				)
				.then(data => {
					commit('SAVE_COMMUNITIES', {data,houseType});
				})
				.then(()=>{
					return state.communitiesChoose.data
				})
		},
		GET_DISTRICTS(
			{ commit, state },
			{ city }
		){	
			return state.businessArea.filter(ele=>{
				return ele.id===city
			})
		},
		GET_CITY_AREA({ commit, state }) {
			if (Object.keys(state.cityArea).length) {
				return state.cityArea;
			}
			return api('districts', { level: 2 })
					.then(data => {
						commit('SAVE_CITY_AREA', data);
						return data;
					})
		},
		GET_COMMUNITY_CITY_AREA({commit,state}) {
			if (Object.keys(state.cityArea).length) {
				return state.cityArea;
			}
			return api('districts', { level: 2 })
					.then(data => {
						commit('SAVE_CITY_AREA', data);
						return data;
					})
		},
		GET_OTHERCOST({ commit, state }) {
			if (state.othercost) {
				return Promise.resolve(state.othercost);
			}
			return api('config_list')
				.query({}, { projectId: state.user.projectId })
				.then(data => {
					commit('SAVE_OTHERCOST', data);
					return _.filter(data, { group: '加收费用' });
				});
		}
	}
};
