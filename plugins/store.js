/*
 * @Author: insane.luojie 
 * @Date: 2017-11-10 10:01:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-13 11:07:56
 */

import api from '~/plugins/api';
import { fromPairs, merge, map } from 'lodash';

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
			SHARE: ['SHARE', '合租'],
			SOLE: ['SOLE', '整租'],
			ENTIRE: ['ENTIRE', '整栋']
		},
		defaultHouseType: 'SOLE'
	},
	mutations: {
		UPDATE_ENV(state, data) {
			Object.keys(data).forEach(item => {
				state[item] = data[item];
			});
		}
	},
	actions: {
		POST_LOGIN({ commit, state }) {
			return api('login', {
				username: 'admin100',
				password: '5f4dcc3b5aa765d61d8327deb882cf99'
			});
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
		GET_COMMUNITIES({ commit, state }, { houseType }) {
			return api('communities').query(
				{ houseFormat: houseType },
				{ projectId: state.user.projectId }
			);
		},
		GET_CITY_AREA({ commit, state }) {
			if (Object.keys(state.city_area).length) {
				return state.city_area;
			}
			return api('city_area');
		}
	}
};
