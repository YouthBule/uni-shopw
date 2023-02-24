// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {
    $http
} from '@escook/request-miniprogram'
uni.$http = $http
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
    uni.showLoading({
        title: '数据加载中...',
    })
}
// 请求完成之后做一些事情
$http.afterRequest = function() {
    uni.hideLoading()
}
$http.baseUrl = 'https://www.example.com'
Vue.config.productionTip = false
App.mpType = 'app'

uni.$showMsg = function(title = '数据请求失败！'，
    duration = 1500) {
    uni.showToast({
        title,
        duration,
        icon: 'none'
    })
}


const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
    createSSRApp
} from 'vue'
import App from './App.vue'
import {
    $http
} from '@escook/request-miniprogram'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
    uni.showLoading({
        title: '数据加载中...',
    })
}
// 请求完成之后做一些事情
$http.afterRequest = function() {
    uni.hideLoading()
}
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
uni.$http = $http

export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}

// #endif
