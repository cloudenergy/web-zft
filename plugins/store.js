/*
 * @Author: insane.luojie 
 * @Date: 2017-11-10 10:01:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-25 11:11:52
 */

import api from '~/plugins/api';

export default {
	state: {
		user: {
			projectId: 100
		},
		cityArea: {},
		houseTypes: {
			SOLE: ['SOLE', '整租'],
			SHARE: ['SHARE', '合租'],
			ENTIRE: ['ENTIRE', '整栋']
		},
		defaultHouseType: 'SOLE'
	},
	actions: {
		POST_LOGIN({ commit, state }) {
			return api('login', { username: 'admin100', password: '5f4dcc3b5aa765d61d8327deb882cf99' });
		},

		GET_ENVIRONMENTS({ commit, state }) {
			return api('environments');
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
