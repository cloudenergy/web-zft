/*
 * @Author: insane.luojie 
 * @Date: 2017-11-12 23:32:31 
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-11-13 12:30:46
 */

const opts = {
	mask: true
};

export default class Modal {
	constructor(options) {
		console.log("this: ", options, opts);
	}

	open() {
		console.log("open");
	}

	close() {}
}
