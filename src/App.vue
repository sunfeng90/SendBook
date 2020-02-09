<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {setStorage , getStorage} from './server/localStorage'
import { mapState,mutations } from 'vuex'
export default {
  name: 'app',
  computed: mapState(['utm_source','publicfrom']),
  created (){
  },
  methods: {
      // mapMutations(['updateUserBind', 'updateUserPaid', 'updateUserPhone'])
  }
}
</script>

<style>
html, body ,#app{
  width:100%;
  height:100%;
}

/*设置滚动条宽度*/
html::-webkit-scrollbar{
  width:0px;
  -webkit-overflow-scrolling: touch;
}
/*设置滚动条宽度*/
body::-webkit-scrollbar{
  width:0px;
  -webkit-overflow-scrolling: touch;
}
body {
    background-color: #f0eff4;
}

html, body, h1, h2, h3, h4, h5, h6, p, ul, ol, dl, dd, fieldset, textarea, pre, img {
    margin: 0;
    padding: 0;
    list-style: none;
}
input,textarea{
   margin: 0;
   padding: 0;
   background:none;  
   outline:none;  
   border:0px;  
} 
</style>
