/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by: insane.luojie
 * @Last Modified time: 2017-11-10 23:21:00
 */
export default function(to, from, next) {
    if (to.name == 'index') {
        return next("/houses");
    }
    next();
}