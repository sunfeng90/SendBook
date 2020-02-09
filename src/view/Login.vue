<template>
  <div class="login-body">
    <div class="login-body-container">
      <div class="course-group">
        <img class="icon-common" src="../assets/kechen.png">
        <input class="input-common" v-model="courseName" placeholder="已购课程名称">
      </div>
      <div class="user-group">
        <img class="icon-common" src="../assets/icon_10.jpg">
        <input class="input-common" v-model="userName" placeholder="学员姓名">
      </div>
      <div class="phone-group">
        <div class="send-group">
          <img class="icon-common" src="../assets/icon_12.jpg">
          <input class="phone" v-model="phone" placeholder="注册手机号">
          <button class="get-captcha" @click="send" v-if="showTime && time > 0">{{time}}S</button>
          <button class="get-captcha" @click="send" v-else>{{showTime?"重新获取":"获取验证码"}}</button>
        </div>
      </div>
      <span class="msg-tip">*此处请填写注册和讯时用的手机号</span>
      <div class="captcha-group">
        <img class="icon-common" src="../assets/icon_14.jpg">
        <input class="input-common" v-model="captcha" placeholder="请输入验证码">
      </div>
      <div class="address-group">
        <img class="icon-common" src="../assets/icon_16.png">
        <input class="input-common" v-model="address" placeholder="邮寄地址">
      </div>
      <button id="commit-btn" class="box-btn" type="button" @click="login">提交</button>
      <div class="loading" v-if="isLoading">
        <img src="../assets/loading.gif">
      </div>
      <div class="tips" v-show="showAlert">
        <div class="tips-text">
          <div class="alert-title">{{title}}</div>
          <div class="alert-text">{{content}}</div>
          <button class="alert-btn" @click="closeMsgTip">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { phoneLogin, sendSms } from "../utils/service";

export default {
  name: "Login",
  data() {
    return {
      courseName: "",
      userName: "",
      phone: "",
      captcha: "",
      address: "",
      smsToken: "",
      activityId: 50009,
      reffer: 5000009,
      isLoading: false,
      showTime: false,
      showAlert: false,
      title: "",
      content: "",
      time: 0,
      second: 60
    };
  },
  computed: {},
  methods: {
    async send() {
      //获取短信验证码
      let checkUserPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (this.phone && checkUserPhone.test(this.phone)) {
        console.log("验证通过");
      } else {
        this.msg("warn", "请输入正确的手机号");
        return false;
      }
      this.showTime = true;
      this.time = this.second;
      this.timer();
      const parm = {
        phone: this.phone,
        signature: "xnyzm",
        activityId: this.activityId,
        reffer: this.reffer
      };
      let re = await sendSms(parm);
      if (re.data && re.data.code != 1) {
        this.msg("fail", re.data.msg);
      } else {
        this.smsToken = re.data.token;
      }
    },
    async login() {
      //获取验证码后用户登录
      let captcha = this.captcha.trim();
      setTimeout(function() {
        document.activeElement.blur();
      }, 0);
      if (!captcha) {
        this.msg("warn", "验证码不能为空");
        return false;
      } else if (captcha.length !== 6) {
        this.msg("warn", "验证码必须为6位");
        return false;
      }
      if (!this.courseName) {
        this.msg("warn", "已购课程名称不能为空");
        return false;
      } else if (!this.phone) {
        this.msg("warn", "注册手机号不能为空");
        return false;
      } else if (!this.address) {
        this.msg("warn", "邮寄地址不能为空");
        return false;
      } else if (!this.userName) {
        this.msg("warn", "学员姓名不能为空");
        return false;
      } else if (!this.smsToken) {
        this.msg("warn", "必须先获取验证码，再提交数据!");
        return false;
      }
      const param = {
        courseName: this.courseName,
        phone: this.phone,
        checkCode: this.captcha,
        address: this.address,
        username: this.userName,
        token: this.smsToken,
        activityId: this.activityId,
        reffer: this.reffer
      };
      this.isLoading = true;
      let result = await phoneLogin(param); //登录
      this.isLoading = false;
      if (result.data.code != 1) {
        this.msg("fail", result.data.msg);
        return false;
      }
      this.msg("success", result.data.msg);
    },
    msg(type, content) {
      if (type === "warn") {
        this.content = content;
        this.title = "警告";
      } else if (type === "fail") {
        this.content = content;
        this.title = "抱歉，出错啦！";
      } else {
        this.content = content;
        this.title = "恭喜";
      }
      this.showAlert = true;
    },
    closeMsgTip() {
      this.showAlert = false;
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-body {
  width: 1080px;
  height: 1920px;
}

.login-body-container {
  width: 1080px;
  height: 1920px;
  background: url(../assets/bj.jpg) top center no-repeat;
  background-size: 1080px 1920px;
}

.course-group {
  position: absolute;
  width: 841px;
  left: 121px;
  top: 958px;
  border-bottom: solid 1px black;
}

.icon-common {
  width: 54px;
  height: 50px;
}

.input-common {
  position: absolute;
  width: 760px;
  height: 50px;
  padding-left: 43px;
  padding-bottom: 27px;
}

.user-group {
  position: absolute;
  width: 841px;
  left: 121px;
  top: 1116px;
  border-bottom: solid 1px black;
}

.phone-group {
  position: absolute;
  width: 841px;
  left: 121px;
  top: 1266px;
  border-bottom: solid 1px black;
}

.send-group {
  top: 1322px;
}

.phone {
  position: absolute;
  padding-left: 43px;
  padding-bottom: 27px;
  width: 508px;
  height: 50px;
}

.get-captcha {
  position: absolute;
  width: 255px;
  height: 50px;
  right: 5px;
  bottom: 15px;
  border: 10px;
  border-radius: 25px;
  background-color: rgb(249, 162, 35);
}

.captcha-group {
  position: absolute;
  width: 841px;
  left: 121px;
  top: 1424px;
  border-bottom: solid 1px black;
}

.msg-tip {
  position: absolute;
  width: auto;
  right: 121px;
  top: 1340px;
  font-size: 20px;
  color: gray;
}

.address-group {
  position: absolute;
  width: 841px;
  left: 121px;
  top: 1566px;
  border-bottom: solid 1px black;
}

.box-btn {
  position: absolute;
  width: 838px;
  height: 104px;
  left: 121px;
  top: 1691px;
  border: 2px solid;
  border-radius: 25px;
  text-align: center;
  color: #000;
  font-size: 0.32rem;
}

.loading {
  width: 1080px;
  height: 1920px;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.loading img {
  margin-top: 45%;
  margin-left: 3.11rem;
  width: 1.28rem;
  height: 1.28rem;
}

.tips {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.tips-text {
  margin: 0 auto;
  margin-top: 35%;
  width: 800px;
  height: 600px;
  background-color: rgb(255, 255, 255);
}

.alert-title {
  width: 800px;
  height: 100px;
  text-align: center;
  font-size: 60px;
  line-height: 100px;
  border-bottom: solid 1px green;
  background-color: rgb(255, 255, 255);
}

.alert-text {
  width: 800px;
  height: 400px;
  text-align: center;
  line-height: 400px;
  font-size: 40px;
  color: gray;
  background-color: rgb(255, 255, 255);
}

.alert-btn {
  color: #f9a223;
  padding-bottom: 0;
  width: 800px;
  height: 100px;
  bottom: 0;
  font-size: 60px;
  background-color: rgb(255, 255, 255);
  border-top: solid 1px gray;
}
</style>
