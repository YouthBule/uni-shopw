<template>
    <view class="nav-bar" :style="{backgroundColor:bgcolor}">
        <view class="nav-title" :style="{color:color}">{{title}}</view>
    </view>
</template>

<script setup name="my-nav">
    import { onLoad ,onLaunch} from "@dcloudio/uni-app"
    
    
    // 父传子 
    const props = defineProps({
        bgcolor: {
            type: String,
            default: '#c00000',
        },
        title: {
            type: String,
            default: 'uni购物',
            required: true
        },
        color: {
            type: String,
            default: '#ffffff',
        }
    })


</script>

<style lang="scss">
    .nav-bar {
        position: sticky;
        top: 0;
        z-index: 999;
        height: 120rpx;
        padding-top: 70rpx;
        box-sizing: border-box;

        // line-height: 60px;
        .nav-title {
            // font-size: 14px;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: flex-end;
        }
    }
</style>
