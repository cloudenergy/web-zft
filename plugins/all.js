/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-12-01 09:39:25
 */
import api from './api';
import '../static/style';
import mixin from './mixins';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';

export default function(vue) {
	/**
	 * element ui
	 */
	// [Select, Option, Loading, Dialog, Menu, Submenu, MenuItem, RadioButton, RadioGroup].map(el => vue.use(el));

	vue.use(Element);

	// 设置api
	vue.prototype.$model = api;
	vue.prototype.$ELEMENT = { size: 'mini' };
	// modal作为 event bus 使用
	vue.prototype.$modal = new vue();

	mixin(vue);
}
