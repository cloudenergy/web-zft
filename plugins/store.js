/*
 * @Author: insane.luojie 
 * @Date: 2017-11-10 10:01:31 
 * @Last Modified by: mikey.other
 * @Last Modified time: 2018-01-18 18:35:29
 */

import api from '~/plugins/api';
import { fromPairs, merge, map } from 'lodash';
import _ from 'lodash'

let localUser = '';
try {
    localUser = JSON.parse(localStorage.user);
} catch (e) {
    localUser = {
        projectId: 100
    };
}

export default {
    state: {
        user: {
            ...localUser
        },
        cityArea: {},
        houseTypes: {
            SHARE: ['SHARE', '合租'],
            SOLE: ['SOLE', '整租'],
            ENTIRE: ['ENTIRE', '整栋']
        },
        defaultHouseType: 'SOLE',
        communities: null,
        othercost:null
    },
    mutations: {
        UPDATE_ENV(state, data) {
            Object.keys(data).forEach(item => {
                state[item] = data[item];
            });
        },
        SAVE_COMMUNITIES(state, data) {
            state.communities = data;
        },
        SAVE_OTHERCOST(state, data) {
            state.othercost = function(){
                return _.filter(data,{group:"加收费用"})
            }
        }
    },
    actions: {
        POST_LOGIN({ commit, state }) {
            return api('login', {
                username: 'admin100',
                password: '5f4dcc3b5aa765d61d8327deb882cf99'
            });
        },

        GET_ENVIRONMENTS({ commit, state }) {
            return api('environments')
                .then(env => fromPairs(map(env, i => [i.key, i.value])))
                .then(env => {
                    commit('UPDATE_ENV', env);

                    // sync user
                    localStorage.user = JSON.stringify({
                        auth: true,
                        ...env.user
                    });
                });
        },
        GET_COMMUNITIES({ commit, state }, { houseType }) {
            if (state.communities) {
                return Promise.resolve(state.communities);
            }
            return api('communities').query(
                { houseFormat: houseType },
                { projectId: state.user.projectId }
            ).then(data => {
                commit("SAVE_COMMUNITIES", data);
                return data;
            });
        },
        GET_CITY_AREA({ commit, state }) {
            if (Object.keys(state.city_area).length) {
                return state.city_area;
            }
            return api('city_area');
        },
        GET_OTHERCOST({ commit, state }) {
            if (state.othercost) {
                return Promise.resolve(state.othercost);
            }
            return api('config_list').query(
                {},
                { projectId: state.user.projectId }
            ).then(data => {
                commit("SAVE_OTHERCOST", data);
                return _.filter(data,{group:"加收费用"});
            });
        }
    }
};
