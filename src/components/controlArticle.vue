<template>
  <div>
    <ul class="th">
      <li>文章标题</li>
      <li>评论数</li>
      <li>操作</li>
    </ul>
    <ul class="th" v-for="(item,index) in articleList" :key="index">
      <li>{{item.title}}</li>
      <li>{{item.commentNum}}</li>
      <li>
        <mu-button @click="openAlertDialog(item._id)" color="error">删除</mu-button>
      </li>
    </ul>

    <!--警告对话窗-->
    <mu-dialog title="是否继续操作?" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false"
               :open.sync="openAlert">
      <mu-button slot="actions" flat color="primary" @click="confirm">是</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">否</mu-button>
    </mu-dialog>

    <!--提示对话窗-->
    <mu-dialog title="" width="360" :open.sync="openSimple">
      <p>{{openMsg}}</p>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    name: "controlArticle",
    data() {
      return {
        articleList : [],
        openAlert: false,  //警告弹窗显示和隐藏
        openSimple: false,  //提示弹窗的显示和隐藏
        openMsg: '',  //弹窗信息
        data:'',
      }
    },
    computed: {
      session() {
        this.$store.state.session
      }
    },
    methods: {
      del(uid) {
        this.$ajax.get('user')
          .then(res => {
            // console.log(res.data.session)
            //重新验证登入
            if (res.data.session) {
              this.openSimple = true
              this.openMsg = '请重新登入'
              setTimeout(() => {
                this.$router.push({name: 'personal'})
              }, 2000)
            } else {
              // console.log(this.session)
              // console.log(uid)
              this.$ajax.delete('article/delete?uid='+uid)
                .then(res => {
                  // console.log(res.data)
                  if (res.data.status) {
                    this.openSimple = true
                    this.openMsg = res.data.msg
                    setTimeout(() => {
                      window.location.reload()
                    }, 1000)
                  }
                });
            }
          });

      },
      closeSimpleDialog() {
        this.openSimple = false
      },
      openAlertDialog(data) {
        this.data = data
        this.openAlert = true;
      },
      closeAlertDialog() {
        this.openAlert = false;
      },
      confirm() {
        this.openAlert = false;
        this.del(this.data)
      }
    },
    created() {
      //获取当前用户文章
      this.$ajax.get('user/articles')
        .then(res => {
          // console.log(res.data.articleList)
          this.articleList = res.data.articleList
        })
    }
  }
</script>

<style scoped>
  .th {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    width: 375px;
    justify-content: space-around;
  }

  .th li {
    width: 300px;
    height: 50px;
    border: 1px solid black;
    text-align: center;
    line-height: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
