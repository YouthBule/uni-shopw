<template>
    <view class="position">
        <view @click="onclick()" class="my-search-container" :style="{'background-color':bgcolor}">
            <view class="my-search-box" :style="{'border-radius':radius+'px'}">
                <uni-icons type="search" size="17"></uni-icons>
                <text class="placeholder">搜索</text>
            </view>
        </view>
    </view>
</template>

<script setup name="my-search">
    // 父传子 
    const props = defineProps({
        bgcolor: {
            type: String,
            default: '#c00000',
        },
        radius: {
            type: Number,
            default: 20,
        }
    })
    // 子传父 
    const emit = defineEmits(['click'])
    // 根元素点击事件 
    const onclick = () => {
        emit('click')
    }
</script>

<style lang="scss">
    .position {
        height: 100rpx;
        overflow: hidden;
        position: sticky;
        top: 0;
    }

    .my-search-container {
        height: 100rpx;
        // background-color: #c00000;
        display: flex;
        align-items: center;
        padding: 0 20rpx;

        .my-search-box {
            height: 72rpx;
            background-color: #ffffff;
            // border-radius: 36rpx;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .placeholder {
                font-size: 30rpx;
                margin-left: 10rpx;
            }
        }
    }
</style>
