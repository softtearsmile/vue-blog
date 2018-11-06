<template>
  <div id="box">
    <!--用户登入界面-->
    <div id="login" v-if="session">
      <mu-container>
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
          <mu-form-item label="用户名" help-text="请输入:中文、英文、数字、符号( _ ),长度2-6" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" help-text="请输入:英文、数字、符号( _ . # @ ? ),长度3-10" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="primary" @click="login">登入</mu-button>
            <mu-button @click="reg">注册</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
    <!--个人中心-->
    <div id="personal" v-else>
      <div id="img">
        <img v-lazy="face" width="100%" height="100%">
      </div>
      <h3>{{username}}</h3>
      <mu-container>
        <div id="polBtn">
          <mu-button @click="show4 = !show4">菜单</mu-button>
          <mu-button @click="logout" style="margin-left: 1rem ">退出</mu-button>
        </div>
        <mu-flex class="mu-transition-row">
          <mu-scale-transition v-if="role===666">
            <mu-button :to="{name:'controlUser'}" class="mu-transition-box mu-primary-color mu-inverse" v-show="show4">
              用户管理
            </mu-button>
          </mu-scale-transition>
          <mu-scale-transition>
            <mu-button :to="{name:'controlArticle'}" class="mu-transition-box mu-primary-color mu-inverse"
                       v-show="show4">
              文章管理
            </mu-button>
          </mu-scale-transition>
        </mu-flex>
        <mu-flex class="mu-transition-row">
          <mu-scale-transition>
            <mu-button :to="{name:'controlComment'}" class="mu-transition-box mu-primary-color mu-inverse"
                       v-show="show4">
              评论管理
            </mu-button>
          </mu-scale-transition>
          <mu-scale-transition>
            <!--:to="{name:'upUserFace'}"-->
            <mu-button @click="upfile" class="mu-transition-box mu-primary-color mu-inverse" v-show="show4">
              头像上传
              <input accept="image/*" type="file" name="file" id="ipt" style="display: none">
            </mu-button>
          </mu-scale-transition>
        </mu-flex>
      </mu-container>
    </div>
    <!--弹窗-->
    <mu-dialog title="" width="360" :open.sync="openSimple">
      <p>{{openMsg}}</p>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    name: "personal",
    methods: {
      login() {  //登入
        this.$refs.form.validate().then((result) => {
          // console.log('form valid: ', result)
          if (result) {
            this.$ajax.post('user/login', {
              username: this.$refs.form.$el[0].value,
              password: this.$refs.form.$el[1].value
            })
              .then(res => {
                // console.log(res.data)
                setTimeout(() => { //定时刷新页面
                  window.location.reload()
                }, 1000)

                if (res.data.status) {
                  this.openSimple = true  //弹窗显示
                  this.openMsg = res.data.msg  //返回的文本

                } else {
                  this.openSimple = true
                  this.openMsg = res.data.msg
                }
              });
          }
        });
      },
      logout() {  //退出

        this.$ajax.get('user/logout')
          .then(res => {
            // console.log(res.data.session)
            //恢复登入状态初始值
            this.$store.commit('conSession', res.data.session)
            this.$store.commit('conUid', res.data.uid)
            this.$store.commit('conUsername', res.data.username)
            this.$store.commit('conRole', res.data.role)
          });
      },
      reg() {  //注册
        this.$refs.form.validate().then((result) => {
          if (result) {
            this.$ajax.post('user/reg', {
              username: this.$refs.form.$el[0].value,
              password: this.$refs.form.$el[1].value
            })
              .then(res => {
                if (res.data.status) {
                  this.openSimple = true
                  this.openMsg = res.data.msg
                } else {
                  this.openSimple = true
                  this.openMsg = res.data.msg
                }
              });
          }
        })
      },
      closeSimpleDialog() {
        this.openSimple = false
      },
      upfile() {  //图片上传
        let ipt = document.getElementById('ipt')
        ipt.onchange = () => {
          let formData = new FormData
          if (ipt.files[0].size<61704) {
            formData.append('file', ipt.files[0],ipt.files[0].name)
            let config = {headers: {'Content-Type': 'multipart/form-data'}}

            this.$ajax.post('upload', formData, config)
              .then(res => {
                // console.log(res)
                this.openSimple = true
                this.openMsg = res.data.msg
                setTimeout(function () {
                  window.location.reload()
                },1000)
              });
          }else {
            this.openSimple = true
            this.openMsg = '请上传小于60KB的图片'
          }
        };
        ipt.click()
      }
    },
    data() {
      return {
        usernameRules: [ //表单输入
          {validate: (val) => /^[\w|\u4e00-\u9fa5]{2,6}$/.test(val),
            message: '用户名错误'
          }
        ],
        passwordRules: [
          {validate: (val) => /^([\w|\.|#|@|,|\?|\$]){3,10}$/.test(val),
            message: '密码错误'
          }
        ],
        validateForm: {
          username: '',
          password: '',
          isAgree: false
        },
        openSimple: false,  //弹窗的显示和隐藏
        openMsg: '',  //弹窗信息
        show4: true,
        face:'',
      }
    },
    computed: {
      session() {
        return this.$store.state.session
      },
      uid() {
        return this.$store.state.uid
      },
      username() {
        return this.$store.state.username
      },
      role() {
        return this.$store.state.role
      },

    },
    mounted() {
      this.$ajax.get('user')
        .then(res => {
          // console.log(res.data)
          // console.log(res.data.session)
          this.face = res.data.avatar
          //更新登入状态值
          this.$store.commit('conSession', res.data.session)
          this.$store.commit('conUid', res.data.uid)
          this.$store.commit('conUsername', res.data.username)
          this.$store.commit('conRole', res.data.role)
        });
    }
  }
</script>

<style scoped>

  /*登入界面*/
  .mu-demo-form {
    width: 100%;
    max-width: 460px;
  }

  #login {
    margin: 180px 40px 0 40px;
    box-shadow: 3px 3px 3px 3px gainsboro;
  }

  /*个人中心*/
  #personal {
    padding: 40px 50px 100px 50px;
  }

  #img {
    width: 100px;
    height: 100px;
    margin: 30px auto;
    box-shadow: 3px 3px 3px 3px gainsboro;
    border-radius: 50%;
    overflow: hidden;
  }

  h3 {
    text-align: center;
  }

  .mu-transition-row {
    justify-content: space-around !important;
    text-align: center;
    margin-top: 30px;
    height: 50px;
  }

  .mu-transition-box {
    min-width: 100px;
    height: 50px;
    /*margin-right: 16px;*/
    border-radius: 4px;
    /*padding: 0 16px;*/
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #polBtn {
    text-align: center;
  }
</style>
