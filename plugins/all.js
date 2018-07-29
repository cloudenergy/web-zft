/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by: mikey.other
 * @Last Modified time: 2018-02-26 17:20:04
 */
import api from './api';
import mixin from './mixins';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/style';
import Element from 'element-ui';
import echarts from 'echarts'
import HighchartsVue from 'highcharts-vue'



export default function(vue) {
  /**
	 * element ui
	 */
  // [Select, Option, Loading, Dialog, Menu, Submenu, MenuItem, RadioButton, RadioGroup].map(el => vue.use(el));
  vue.prototype.$echarts = echarts
  vue.use(Element);
  vue.use(HighchartsVue);

  // 设置api
  vue.prototype.$model = api;
  vue.prototype.$ELEMENT = { size: 'mini' };
  // modal作为 event bus 使用
  vue.prototype.$modal = new vue();

  mixin(vue);
}
