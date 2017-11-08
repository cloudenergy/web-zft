/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-11-08 17:33:54
 */
import api from "./api";
import "../static/style";
import mixin from "./mixins";
import 'element-ui/lib/theme-chalk/index.css';
import {
    Select,
    Option,
    Loading,
    Dialog
} from "element-ui";

export default function(vue) {
    // 设置api 
    vue.prototype.$model = api;
    vue.prototype.$ELEMENT = { size: 'small' }

    /**
     * element ui 
     */
    vue.use(Select)
    vue.use(Option)
    vue.use(Loading)
    vue.use(Dialog)

    mixin(vue);
}