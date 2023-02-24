<template>
    <my-search @click='clickSearch()' :bgcolor="'#c00000'" :radius="30"></my-search>
    <view class="scroll-view-container">
        <scroll-view class="left-scroll-view" scroll-y :style="{height:wh+'px'}">
            <view @click="tabNav(index)" :class="['left-scroll-view-item' ,{active:cate.active===index}]"
                v-for="(item,index) in cate.list" :key='item.cat_id'>
                {{item.cat_name}}
            </view>
        </scroll-view>
        <scroll-view class="right-scroll-view" scroll-y="true" :style="{height:wh+'px'}" :scroll-top="cate.rightCroll">
            <view class="right-scroll-view-item" v-for="(item,index) in cate.secondList" :key="item.cat_id">
                <view class="right-scroll-view-title">
                    {{item.cat_name}}
                </view>
                <view class="right-scroll-view-goods" @click="goodsListClick(item2)"
                    v-for="(item2,index2) in cate.secondList[index].children" :key="item2.cat_id">
                    <image :src="item2.cat_icon" mode="widthFix" style="width: 100rpx;"></image>
                    <text>{{item2.cat_name}}</text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
    import {
        onReachBottom,
        onShow,
        onLoad
    } from '@dcloudio/uni-app';
    import {
        computed,
        reactive,
        ref
    } from "vue";


    //-------------------------------------------------------分类列表数据---------------------------------------------------------------//
    // 声明数据 
    const cate = reactive({
        list: [],
        active: 0,
        secondList: [],
        rightCroll: 0
    })
    // 左侧点击切换
    const tabNav = (num) => {
        cate.active = num
        cate.secondList = cate.list[cate.active].children
        cate.rightCroll = 1 - cate.rightCroll
        console.log(cate.rightCroll);
    }
    // 获取列表数据 并储存数据
    const getCateList = async () => {
        const {
            data: res
        } = await uni.$http.get('/categories')
        if (res.meta.status === 200) {
            cate.list = res.message
            cate.secondList = cate.list[cate.active].children
            cate.goodLsit = cate.secondList.children
            // console.log(cate.secondList);
            // console.log('123',cate.goodLsit);
        }
    }
    // 点击商品函数
    const goodsListClick = (e) => {
        gotoGoodList(e)
    }
    // 跳转函数 
    const gotoGoodList = (e) => {
        uni.navigateTo({
            url: "/subpkg/goods_list/goods_list?cid=" + e.cat_id
        })
    }
    // ---------------------------------------默认高度 数据 ---------------------------------------//
    let wh = ref(0)
    onLoad(() => {
        uni.getSystemInfo({
            success: (res) => {
                console.log(res)
                wh.value = res.windowHeight - 75
            }
        })
        getCateList()
    })
    //-------------------------------------搜索组件事件----------------------------------------------//
   // 点击组件
    const clickSearch = () => {
        gotoSearch()
    }
    // 跳转页面
    const gotoSearch = () => {
        uni.navigateTo({
            url: '/subpkg/search/search'
        })
    }
</script>

<style lang="scss">
    .scroll-view-container {
        position: absolute;
        display: flex;
        height: 300rpx;
        ::-webkit-scrollbar {
            display: none;
        }
        .left-scroll-view {
            height: 100%;
            width: 182rpx;
            font-size: 28rpx;
            text-align: center;
            background-color: #F3F3F3;

            .left-scroll-view-item {
                // width: 250rpx;
                line-height: 40px;
                text-align: center;
                font-size: 12px;
                position: relative;

                // padding: 17rpx 0;
                &.active {
                    background-color: #fff;

                    &::before {
                        content: '';
                        display: block;
                        width: 3px;
                        height: 30px;
                        background-color: #C00000;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                    }
                }
            }

        }

        .right-scroll-view {
            height: 100%;
            flex: 1;
            padding: 10px;
            background-color: #fff;

            .right-scroll-view-item {
                display: flex;
                // flex-direction: column;
                justify-content: flex-start;
                text-align: center;
                flex-wrap: wrap;

                .right-scroll-view-title {
                    font-weight: bold;
                    text-align: center;
                    font-size: 12px;
                    width: 100%;
                    padding: 15px 0;
                }

                .right-scroll-view-goods {
                    width: 33.33%;
                    display: flex;
                    text-align: center;
                    justify-content: space-around;
                    align-items: center;
                    flex-direction: column;

                    image {
                        display: block;
                        text-align: center;
                    }

                    text {
                        font-size: 24rpx // text-align: center;
                    }
                }
            }
        }
    }
</style>
