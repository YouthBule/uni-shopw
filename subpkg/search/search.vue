<template>
    <view class="searchbox">
        <uni-search-bar radius='30'  clearButton='always' cancelButton="none" focus='true' @input='input($event)'>
        </uni-search-bar>
    </view>
</template>

<script setup>
    import {
        onLoad,
        onShow
    } from "@dcloudio/uni-app";
    import {
        reactive
    } from "vue";

    // 搜索框数据--------------------------------------------------------------------------------------------------
    const search = reactive({
        timer: '',
        key: '',
        List: []
    })
    // 搜索框输入事件 
    const input = (e) => {
        // 防抖 
        clearTimeout(search.timer)
        search.timer = setTimeout(() => {
            search.key = e
            console.log(search.key);
        }, 300)
    }
    // 获取搜索列表 
    const getSearchList = () => {
        uni.$http.get('/goods/qsearch', {
            query: search.key
        })
    }

    import {
        ref,
        onMounted,
        onUpdated,
        nextTick
    } from "vue"
</script>



<style lang="scss">
    .searchbox {
        background-color: #c00000;
        height: 100rpx;
        position: sticky;
        top: 0;
    }
</style>
