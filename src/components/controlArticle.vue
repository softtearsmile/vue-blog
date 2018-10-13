<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>文章标题</th>
        <th>评论数</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in articleList" :key="index">
        <th>{{item.title}}</th>
        <th>{{item.commentNum}}</th>
        <th>
          <mu-button @click="del(item._id)" color="error">删除</mu-button>
        </th>
      </tr>
      </tbody>
    </table>
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
        openSimple: false,  //弹窗的显示和隐藏
        openMsg: '',  //弹窗信息
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
                  console.log(res.data)
                  if (res.data.status) {
                    this.openSimple = true
                    this.openMsg = res.data.msg
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
                  }
                });
            }
          });

      },
      closeSimpleDialog() {
        this.openSimple = false
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
  table {
    width: 375px;
    border: 1px solid black;
    border-collapse: collapse;
  }

  table th {
    width: 100px;
    height: 50px;
    border: 1px solid #000;
    text-align: center;
  }
</style>
