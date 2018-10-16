<template>
  <div style="width: 100%">
    <!--按钮-->
    <mu-appbar style="width: 100%;position: fixed;top: 0" color="primary" >
      <mu-button icon slot="left" @click="">
        <mu-icon value="" ></mu-icon><!--chevron_left-->
      </mu-button>
      微笑的个人博客
      <mu-button @click="publish" flat slot="right">发表文章</mu-button>
    </mu-appbar>
    <!--弹窗-->
    <mu-dialog title="" width="360" :open.sync="openSimple">
      <p>请先登入</p>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    name: "hdNav",
    data() {
      return{
        openSimple: false,  //提示弹窗的显示和隐藏
      }
    },
    computed: {
      session() {
        return this.$store.state.session
      }
    },
    methods:{
      prev() { //返回上一页
        this.$router.go(-1)
      },
      closeSimpleDialog() {
        this.openSimple = false
      },
      publish() {
        // console.log(this.session)
        if (this.session) {
          this.openSimple = true
        }else {
          this.$router.push({name:'publishArticle'})
        }
      }
    }
  }
</script>

<style scoped>

</style>
