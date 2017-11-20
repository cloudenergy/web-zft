/*
 * @Author: insane.luojie 
 * @Date: 2017-11-10 10:01:31 
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-11-20 23:08:44
 */

import api from '~/plugins/api';

export default {
	state: {
		user: {
			id: '',
			projectId: ''
		}
	},
	actions: {
		getCommunities() {
			return api('communities', null, { id: '123' });
		}
	}
};
