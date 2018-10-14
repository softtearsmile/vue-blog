<template>
  <div id="box">
    <mu-container>
      <mu-text-field v-model="title" placeholder="请输入文章标题" :max-length="20"></mu-text-field>
      <br/>
      <mu-text-field v-model="content" placeholder="请输入文章内容" multi-line :rows="10"
                     :max-length="10000"></mu-text-field>
      <br/>
    </mu-container>
    <div id="btn">
      <mu-button color="primary" @click="submit">提交</mu-button>
      <mu-button @click="clear">清空</mu-button>
    </div>
    <mu-dialog title="" width="360" :open.sync="openSimple">
      <p>{{openMsg}}</p>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import keepArticle from '../tools/keepArticle'

  export default {
    name: "publish",
    data() {
      return {
        title: '',
        content: '',
        openSimple: false,  //弹窗的显示和隐藏
        openMsg: '',  //弹窗信息
      }
    },
    methods: {
      submit() {
        // console.log(this.title)
        // console.log(this.content)
        this.$ajax.post('article', {title: this.title, content: this.content})
          .then(res => {
            // console.log(res.data)
            this.openSimple = true
            this.openMsg = res.data.msg
            setTimeout(() => {
              keepArticle.delArticle()
              this.$router.push({name:'index'})
            },1000)
          });
      },
      clear() {
        this.title = this.content = ''
        keepArticle.delArticle()
      },
      closeSimpleDialog() {
        this.openSimple = false
      }
    },
    mounted() {
      //获取在sessionStorage的文章数据
      let _data = keepArticle.getArticle()
      this.title = _data.title
      this.content = _data.content
    },
    watch: {
      title(title) { //将标题存到sessionStorage
        keepArticle.addArticle({title})
      },
      content(content) { //将内容存到sessionStorage
        keepArticle.addArticle({content})
      },
    }
  }
</script>

<style scoped>
  #box {
    padding: 50px 40px 0 40px;
  }

  #btn {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
</style>
