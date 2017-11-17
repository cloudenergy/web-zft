/*eslint no-unused-vars: 0 */
import { makeGet, makePost, setup } from '@/api';

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
	baseURL
});

const apis = {
	houses: makeGet('/houses')
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
		return apis[entry](data, params);
	}

	throw 'Entry not defined';
}
