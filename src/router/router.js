import Layout from '../layout/index'
const frameIn = [
    {
        path: '/',
        component: Layout,
        redirect: '/Home',
        children: [{
            path: 'Home',
            name: 'Home',
            component: () => import('../views/Home'),
            meta: {title: '首页', icon: 'home', requiresAuth: true}
        }]
    }
]

export default [...frameIn]
