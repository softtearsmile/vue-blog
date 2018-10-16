<template>
  <div id="box">
    <!--文章内容-->
    <div class="articleTitle">
      <h2>{{article.title}}</h2>
      <p>作者：{{author.username}} 发表于 ：{{article.created}}</p>
    </div>
    <mu-divider></mu-divider>
    <div class="content" v-html="article.content"></div>
    <fieldset>
      <legend>评论</legend>
    </fieldset>
    <!--文章评论-->
    <!--评论区-->
    <div class="comment">
      <mu-text-field v-model="comcontent" placeholder="评论内容" multi-line :rows="5"
      ></mu-text-field>
      <div>
        <mu-button color="secondary" @click="comment">回复</mu-button>
        <mu-button color="info" @click="clear">清空</mu-button>
      </div>
    </div>
    <fieldset></fieldset>
    <!--评论列表-->
    <ul class="commentList" >
      <li v-for="item in commentList" :key="item._id">
        <!--评论者头像、名称、发表时期-->
        <div class="commentUser">
          <div class="commentImg">
            <img :src="item.from.avatar" style="width: 100%;height: 100%">
          </div>
          <p style="font-size: 20px;color: deepskyblue">{{item.from.username}}</p>
          <p>{{item.created}}</p>
        </div>
        <!--评论内容-->
        <div v-html="item.content"></div>
      </li>
    </ul>
    <!--提示框-->
    <mu-dialog title="" width="360" :open.sync="openSimple">
      <p style="text-align: left">{{openMsg}}</p>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    name: "articleDetails",
    data() {
      return {
        data: {},  //文章数据
        article: {},  //文章包装内容
        author: '',  //作者
        commentList: {},  //评论列表
        comcontent: '',  //评论内容
        commentUser:'',
        openSimple: false,  //提示弹窗的显示和隐藏
        openMsg: '' ,//提示内容
        a:{
          b:{
            c:'d'
          }
        }
      }
    },
    methods: {
      comment() {
        if (this.comcontent) {
          this.$ajax.post('comment/publish', {
            content: this.comcontent,
            article: this.$route.query.id
          })
            .then(res => {
              // console.log(res.data)
              if (res.data.status) {
                this.openSimple = true
                this.openMsg = res.data.msg
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              } else {
                this.openSimple = true
                this.openMsg = res.data.msg
              }
            });

        } else {
          this.openSimple = true
          this.openMsg = '评论内容不能为空'
        }

      },

      clear() {
        this.comcontent = ''
      },
      closeSimpleDialog() {
        this.openSimple = false
      }
    },
    mounted() {
      // console.log(this.$route.query.id)
      this.$ajax.get('article/detail?id=' + this.$route.query.id)
        .then(res => {
          // console.log(res.data)
          // 文章
          // 对文章数据简单处理
          res.data.article.created=new Date(res.data.article.created).toLocaleString()
          res.data.article.content='<p>'+res.data.article.content+'</p>'
          res.data.article.content=res.data.article.content.split(/\n/g).join('</p><p>')

          this.article = res.data.article
          this.author = res.data.article.author

          // 评论
          // 对评论的换行简易处理
          res.data.comment.forEach((item,index)=>{
            item.created=new Date(item.created).toLocaleString()
            item.content='<p>'+item.content+'</p>'
            item.content=item.content.split(/\n/g).join('</p><p>')
          })

          this.commentList = res.data.comment
          this.commentUser = res.data.comment[0].from
        });
    }
  }
</script>

<style scoped>
  #box {
    padding: 0 1rem;
  }

  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .articleTitle p,h2 {
    text-align: center;
  }

  .content {
    margin-top: 10px;
  }

  .comment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  fieldset {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    border-width: 1px 0 0;
    border-color: black;
    font-size: 20px;
  }

  .commentImg{
    position: absolute;
    top: 5px;
    left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
  .commentList li{
    position: relative;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
  }

  .commentUser p{
    margin: 0;
    padding-left: 60px;
    text-align: left;
  }
</style>
