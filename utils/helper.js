/**
 * 检验对象是否为function
 * @param {*any} func 验证对象
 */
export function isFunc(func) {
	return typeof func == 'function';
}

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
