import Vue from 'vue'
import Router from 'vue-router'

// 路由数据
import routes from './router'
Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
    base: process.env.BASE_URL,
    routes
});

/**
 * 路由拦截
 * 权限验证
 */
// router.beforeEach((to, from, next) => {
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     if (to.meta.requiresAuth) {
//         const token = Cookies.get('token')
//         if (token){
//             next()
//         }else {
//             Notification.error({
//                 title: '未登录，请先登录!',
//                 position: 'bottom-right'
//             })
//             return next({ name: 'login' })
//         }
//     }else {
//         next()
//     }
// })

// router.afterEach(() => {
// })

export default router
