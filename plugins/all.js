/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-11-09 00:21:38
 */
import api from "./api";
import "../static/style";
import mixin from "./mixins";
import 'element-ui/lib/theme-chalk/index.css';
import {
    Select,
    Option,
    Loading,
    Dialog,
    Menu,
    Submenu,
    MenuItem
} from "element-ui";

export default function(vue) {
    // 设置api 
    vue.prototype.$model = api;
    vue.prototype.$ELEMENT = { size: 'small' };

    /**
     * element ui 
     */
    [Select, Option, Loading, Dialog, Menu, Submenu, MenuItem].map(el => vue.use(el));

    mixin(vue);
}