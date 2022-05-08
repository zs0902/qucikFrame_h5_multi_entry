<template>
<!-- 导航组件 -->
    <div class="carowner-loading-box" @click.self='closethis'>
      <div class="dh-type-box">
        <div class="dh-type-title" @click='closethis'>请选择导航方式</div>

        <div style="height:0.1rem;background:rgba(242,242,242,1);"></div>
        <div class="dh-type-main">
            <div 
                class="dh-type-item" 
                :style="{'background-color': item.backgroundColor}" 
                v-for="(item, index) in mapList" 
                :key="index" 
                @touchstart="item.backgroundColor='#eee'"
                @touchend="item.backgroundColor=''"
                @click='dhhao(item.name)'
            >
                <img :src="item.url" alt="">
                {{item.name}}
            </div>
        </div>
      </div>
   </div>
</template>
<script>
import Navigation from '@/methodsApi/navigation_lib/index'
export default {
    data(){
        return {
            mapList: [
                {name: '高德地图', url: require('@/assets/images/aMap.jpg'), disable: 'false', backgroundColor: ''},
                {name: '百度地图', url: require('@/assets/images/bMap.jpg'), disable: 'false', backgroundColor: ''},
                {name: '腾讯地图', url: require('@/assets/images/tMap.png'), disable: 'false', backgroundColor: ''}
            ],
            // 起点位置信息 (以下是默认经纬度)
            source: {
                lat: '30.492173',
                lng: '104.071915'
            }, 
            // 终点位置信息 (以下是默认经纬度)
            goto: {
                lat: '30.569926',
                lng: '104.066403'
            }, 
        }
    },
    methods:{
        dhhao(name){
            let Navi = new Navigation()
            if(name=='高德地图'){
                // Navi.aMapH5(this.source, this.goto)
                Navi.aMapApp(this.source, this.goto)
            }else if(name=='百度地图'){
                // Navi.bMapH5(this.source, this.goto)
                Navi.bMapApp(this.source, this.goto)
            }else if(name=='腾讯地图'){
                Navi.tMapH5(this.source, this.goto)
            }
            this.closethis()
        },
        closethis(){
            document.body.removeChild(document.querySelector('.carowner-loading-box'))
        },
    },
}
</script>
<style lang="less" scoped>
.carowner-loading-box {
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height:100vh;
    z-index:9999;
    background-color: rgba(0, 0, 0, 0.3);
}

@keyframes popFormBottom {
    0% {
        bottom: -4rem; 
    }

    100% {
        bottom: 0;
    }
}

.dh-type-box{
  position: absolute;
  padding: 0rem 0rem 0.2rem;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  animation: popFormBottom .2s;
  animation-fill-mode: forwards;

  .dh-type-title{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1rem;
      font-size: 0.32rem;
      font-weight: bold;
      color:#343434;
      background-image: url('../../../assets/images/clear.png');
      background-position: center right 0.21rem;
      background-size: 0.34rem 0.34rem;
      background-repeat: no-repeat;
  }
  .dh-type-item{
    display: flex;
    align-items: center;
    justify-content: center;
    height:0.9rem;
    box-sizing: border-box;
    padding: 0.1rem ;
    font-size: 0.28rem;

    img {
        width: 0.4rem;
        margin-right: 0.2rem;
        vertical-align: middle;
    }
  }
}
</style>