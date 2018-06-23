/*
 * @Author: insane.luojie
 * @Date:   2017-09-30 09:33:33
 * @Last Modified by: mikey.other
 * @Last Modified time: 2018-02-07 10:09:29
 */
import fp from 'lodash/fp';
import { isBrowserSupport } from '~/utils/helper';
function updateHeader(comp) {
  const { meta } = comp;
  if (meta && meta.title) {
    document.title = meta.title;
  }
}

const noopData = () => ({});

/**
 * 合并异步数据
 * @param {*object} component
 */
function applyAsyncData(component) {
  return function(asyncData) {
    const ComponentData = component.data || noopData;
    // Prevent calling this method for each request on SSR context
    component.data = function() {
      const data = ComponentData.call(this);
      return { ...data, ...asyncData };
    };

    if (component._Ctor && component._Ctor[0].options) {
      component._Ctor[0].options.data = component.data;
    }
  };
}

export default function(router) {
  router.beforeEach((to, from, next) => {
    if(fp.get('query.source')(to) === 'wx') {
      router.replace('/mobile/login');
    }
    if (!isBrowserSupport()) {
      if (to.name && to.name !== 'upgrade') {
        return next('/upgrade');
      }
    }
    next();
  });

  // 数据请求
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (!activated.length) {
      return next();
    }
    // this is where we should trigger a loading indicator if there is one
    Promise.all(
      activated.map(c => {
        if (c.asyncData) {
          return c.asyncData(api, to).then(applyAsyncData(c));
        }
      })
    )
      .then(() => {
        // stop loading indicator
        next();
      })
      .catch(e => {
        next();
      });

    if (matched.length) {
      updateHeader(matched[matched.length - 1]);
    }
  });
}
