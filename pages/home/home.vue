<template>
    <view>
  <!--      <view class="navbox">
            <my-nav title='首页'></my-nav> -->
        <!-- </view> -->
        
        
        <!-- 搜索组件 -->
        <view class="search-box">
            <my-search @click="clickSearch()"></my-search>
        </view>
        <!-- 轮播图区域 -->
        <view class="m-swiper">
            <swiper indicator-dots autoplay circular interval='3000' indicator-active-color="#EA4350"
                indicator-color="rgba(0,0,0,0.4)">
                <swiper-item v-for="item in swipe.list" :key="item.goods_id">
                    <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
                        <image :src="item.image_src" mode="widthFix" />
                    </navigator>
                </swiper-item>
            </swiper>
        </view>
        <!-- 入口导航模块 -->
        <view class="m-nav">
            <view v-for="item in nav.list" :key="item.name">
                <navigator v-if="item.name === '分类'" url="/pages/cate/cate" :open-type="item.open_type"
                    hover-class="none">
                    <image :src="item.image_src" mode="widthFix" />
                </navigator>
                <image v-else :src="item.image_src" mode="widthFix" :key="item.name" />
            </view>
        </view>

        <!-- 楼层模块 -->
        <view class="m-floor">
            <view class="floor" v-for="item in floor.list" :key="item.floor_title.name">
                <!-- 楼层标题 -->
                <view class="floor-title">
                    <image :src="item.floor_title.image_src" mode="widthFix" />
                </view>
                <view class="floor-concent">
                    <navigator :url="item.product_list[0].url" class="left-img-box"
                        :style="{width:item.product_list[0].image_width}+rpx">
                        <image :src="item.product_list[0].image_src" mode="heightFix"></image>
                    </navigator>
                    <view class="right-img-box">
                        <navigator :url="item2.url" class="right-img-item" v-for="(item2,index) in item.product_list"
                            :key="item2.name">
                            <template v-if="index !== 0">
                                <image :src="item2.image_src" :style="{width:`${item2.image_width}rpx`}"
                                    mode="heightFix"></image>
                            </template>
                        </navigator>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
    import {
        reactive
    } from "vue";
    import {
        onReachBottom,
        onShow,
        onLoad
    } from '@dcloudio/uni-app';

    // 搜索组件区域 -------------------------------------------------------------------------------------------------------------------------//
    const clickSearch = () => {
        gotoSearch()
    }
    const gotoSearch = () => {
        uni.navigateTo({
            url: '/subpkg/search/search'
        })
    }
    // --------------------------------------轮播图区域------------------------------------------//
    let swipe = reactive({
        list: []
    })
    const getSwipeList = async () => {
        const {
            data: res
        } = await uni.$http.get('/home/swiperdata')
        if (res.meta.status === 200) {
            swipe.list = res.message
        } else {
            return $showMsg()
        }
    }
    // -----------------------------------导航区域--------------------------------------------//
    let nav = reactive({
        list: []
    })
    const getNavList = async () => {
        const {
            data: res
        } = await uni.$http.get('/home/catitems')
        if (res.meta.status === 200) {
            nav.list = res.message
            console.log(res);
        } else {
            return $showMsg()
        }
    }

    // ----------------------------------------楼层区域 -----------------------------------------//
    let floor = reactive({
        list: []
    })
    // 获取楼层数据 
    const getFloorList = async () => {
        const {
            data: res
        } = await uni.$http.get('/home/floordata')
        if (res.meta.status === 200) {
            // 改变url 
            res.message.forEach(item => {
                item.product_list.forEach(i => {
                    i.url = `/subpkg/goods_list/goods_list?${i.navigator_url.split('?')[1]}`
                })
            })
            floor.list = res.message
            console.dir(res, floor.list);
        } else {
            return $showMsg()
        }
    }
    // 处理数据路径 


    // -------------------------------小程序页面加载生命周期 --------------------------------------------
    
    onLoad(() => {
        getSwipeList()
        getNavList()
        getFloorList()
    })
</script>

<style lang="scss">
    .search-box {
        position: sticky;
        top: 0;
        z-index: 99;
    }

    .m-swiper,
    .m-swiper image {
        width: 750rpx;
        height: 340rpx;
    }

    .m-nav {
        margin: 12rpx 0 43rpx;
        display: flex;
        justify-content: space-around;

        image {
            width: 128rpx;
        }
    }

    .m-floor {
        .floor-title {
            image {
                width: 750rpx;
            }
        }

        .floor-concent {
            display: flex;
            margin: 10rpx;
            justify-content: space-between;

            .left-img-box {

                // width: ;
                image {
                    height: 399rpx;
                }
            }

            .right-img-box {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;

                image {
                    margin-left: 5rpx;
                    margin-bottom: 10rpx;
                    height: 190rpx;
                }
            }
        }

    }
</style>
