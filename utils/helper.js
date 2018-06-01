/**
 * 检验对象是否为function
 * @param {*any} func 验证对象
 */
export function isFunc(func) {
	return typeof func == 'function';
}

/**
 * 通过promise 实现简单的 chain
 * @param {*any} task
 */
export const chain = function(task) {
	return Promise.resolve(task);
};

/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */
function randomColor() {
	return (
		'#' +
		('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
	);
}

/**
 *
 * @param {*function} fn 待转换函数
 * @param {*number} arity  参数个数
 * @param {*array} a 参数
 */
export function convertToFP(fn, arity, a) {
	a = a || [];

	if (a.length >= arity) {
		return fn.apply(null, a.slice(0, arity).reverse());
	}

	return function() {
		var args = Array.prototype.slice.call(arguments);
		return convertToFP(fn, arity, a.concat(args));
	};
}

/**
 * compose functions
 * var f = compose(add1)(mult2)(square)(negate)();
 * @param {*function} f
 */
export const compose = function compose(f) {
	var queue = f ? [f] : [];
	var fn = function fn(g) {
		if (arguments.length) {
			queue.push(g);
			return fn;
		}
		return function() {
			var args = Array.prototype.slice.call(arguments);
			queue.forEach(function(func) {
				args = [func.apply(this, args)];
			});
			return args[0];
		};
	};
	return fn;
};

/**
 * 判断是否为支持的浏览器
 */
export const isBrowserSupport = function() {
	const userAgent = navigator.userAgent;
	const isSafari =
		userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1;
	const isChrome =
		userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && parseInt(userAgent.substring(userAgent.indexOf('Chrome'),userAgent.indexOf(' Safari')).replace(/Chrome\//,""))>=62;
	const isFF = userAgent.indexOf('Firefox') > -1;
	// 浏览器判断

	return isChrome || isSafari || isFF;
};

/**
 * 删除YTL
 */

export const delYTL = function delYTL(val) {
	return val ? val.replace(/^YTL/g, '') : '';
};
