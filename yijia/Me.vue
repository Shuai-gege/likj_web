<template>
    <div>
        <div class="login">
            <div class="head">
                <div  style="float:right">
                <van-icon name="setting-o" size="30px" color='#fff' @click="l_tap()"/>
                <van-icon name="chat-o" size="30px" color='#fff' @click="r_tap()"/>                
            </div>
        </div>
        <!-- 通知栏 -->
        <van-notice-bar
            color="#1989fa"
            background="#ecf9ff"
            left-icon="info-o"
            :speed='50'
            :scrollable='true'
            >
            <span style="float:left ;width:270px">{{inform}}</span>
           <!-- <span style="float:left;width:300px"></span>
           <span style="float:left">{{inform}}</span> -->
                                            
        </van-notice-bar>


            

        <div class="lo-head">
            <div class="touxiang">
                <div class="tu"></div>
                <div class="anniu">
                    <van-button type="primary" size='small' to="/login">登陆</van-button>
                    <van-button type="info" size='small' to="/register">注册</van-button>
                    <van-button type="warning" size='small' @click="tuichu()" >退出</van-button>
                </div>
                
            </div>


            </div>             
        </div>
        <!-- 代发货 -->

        <van-grid :border="false" :column-num="4">
            <van-grid-item>
                <van-icon name="cash-back-record" size='40px'/>
                <span>待付款</span>
            </van-grid-item>
            <van-grid-item>
               <van-icon name="records" size='40px' />
                <span>待发货</span>
            </van-grid-item>
            <van-grid-item>
               <van-icon name="credit-pay" size='40px' />
                <span>待收货</span>
            </van-grid-item>
            <van-grid-item>
               <van-icon name="logistics" size='40px' />
                <span>待发货</span>
            </van-grid-item>
        </van-grid>

        <!-- 单元格 -->

        <van-cell-group  style="margin-bottom:46px">
            <van-cell title="我的余额" :value="data.balance" icon="after-sale" />
            <van-cell title="历史订单" icon="notes-o" is-link url="//youzan.github.io/vant/mobile.html" />
            <van-cell title="充值中心" icon="cash-on-deliver" is-link to="chongzhi" />
            <van-cell title="优惠卡券" icon="credit-pay" is-link to="index" />
        </van-cell-group>
       

    </div>
</template>



<script>
import axios from 'axios';
export default {
    name:'Me',
    data(){
        return{
            inform:' 请登陆或注册',
            data:{},
            
        }
    },
     methods: {
        l_tap() {
            this.$router.push('/setting')
        },
        r_tap () {
            this.$router.push('/message')
            
        },
        tuichu(){
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            this.inform='请登陆或注册';
            this.$router.push("/index")
        }
        
  },
  mounted(){
      var username=localStorage.getItem("username");
      var id = localStorage.getItem('token')
      console.log(username)
      if(username!==null){
          console.log('aaa')
          this.inform='欢迎:'+username
            
        };
        axios({
            method:'post',
            url:'http://106.12.52.107:8081/MeledMall/user/mine',
            params:{id:id}
        }).then((data)=>{
            console.log(data.data.info)
            this.data = data.data.info.user;
        })

  }

}
</script>

<style scope="">
    .login{
        width:100%;
        height: 340px;
        background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563599389484&di=4b9456fb11451658e778b9a751e1a20d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F12%2F20160512100952_isaTm.gif);
    }
     .head{
        width: 100%;
        height: 40px;

    } 
    .lo-head{
        width:100%;
        height: 260px; 
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .touxiang{
        width:200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center
    }
    .tu{
        width:150px;
        height: 150px;
        background:url(../assets/1.jpg) no-repeat ;
        background-size: cover;
        border-radius:50%;
        display: flex;
        
    }
    .anniu{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-around;
    }
    .van-icon{
        font-size: 30px;
    }
    
</style>
