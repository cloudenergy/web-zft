/*eslint no-unused-vars: 0 */
import {
	makeGet,
	makePost,
	setup,
	makeResource,
	decorateMaker,
	makePut,
	makeDelete
} from '@/api';
import { isFunc } from '~/utils';
import { Message } from 'element-ui';

import router from '@/router';
import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

let baseURL = '/api/v1.0';

switch (process.env.NODE_ENV) {
	case 'development':
		baseURL = '/api/v1.0';
		break;
	case 'production':
		baseURL = '/api/v1.0';
		break;
	default:
		baseURL: '/api/v1.0';
		break;
}

setup({
	baseURL,
	cancelToken: source.token,
	headers: {
		'content-type': 'application/json'
	}
});

const interceptor = function(res) {
	const { code, message, errmsg, status, data } = res;
	if ((code && code !== 0) || errmsg) {
		Message({
			message: message || errmsg,
			type: 'error'
		});

		return Promise.reject(message || errmsg);
	}

	if (status && status == 401) {
		source.cancel('login required.');
		router.replace('/login');
		return;
	}

	return res;
};
const [get, post, put, del] = [makeGet, makePost, makePut, makeDelete].map(
	action => decorateMaker(action, interceptor)
);

const resource = (url, actions) => {
	return makeResource(url, actions, {
		GET: get,
		POST: post,
		PUT: put,
		DELETE: del
	});
};

const apis = {
	houses: resource('/projects/{projectId}/houses'),
	communities: resource('/projects/{projectId}/communities'),
	contracts: resource('/projects/{projectId}/contracts'),
	rooms: resource('/projects/{projectId}/rooms'),
	locations: get('/locations/{action}'),
	contract_bill: resource('/projects/{projectId}/contracts/{id}/bills'),
	contract_del: resource('/projects/{projectId}/contracts'),
	set_electric_price: resource('/projects/{projectId}/houses'),
	login: post('login')
};

/**
 * 通过接口名称返回请求对象
 * @param {string} entry	接口名称
 * @param {object} data  query/body 参数
 * @param {object} params url 参数
 */
export default function(entry, data, params) {
	// entry - string, array, function

	if (apis.hasOwnProperty(entry)) {
		return isFunc(apis[entry]) ? apis[entry](data, params) : apis[entry];
	}

	throw 'Entry not defined';
}
