<template>
  <div id="box">
    <h2>{{data.title}}</h2>
    <p>作者：{{author.username}} 发表于 ：{{new Date(data.created).toLocaleString()}}</p>
    <mu-divider></mu-divider>
    <div id="content" v-for="(item,index) in content" :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "articleDetails",
    data() {
      return {
        data: {},
        content:'',
        author:''
      }
    },
    created() {
      // console.log(this.$route.query.id)
      this.$ajax.get('/')
        .then(res => {
          // console.log(res.data.articleList[this.$route.query.id])
          // console.log(res.data.articleList[this.$route.query.id].content.split(/\n/g))
          this.data = res.data.articleList[this.$route.query.id]
          this.content = res.data.articleList[this.$route.query.id].content.split(/\n/g)
          this.author = res.data.articleList[this.$route.query.id].author
        });
    }
  }
</script>

<style scoped>
  #box {
    padding: 0 1rem;
  }

  h2, p {
    text-align: center;
  }

  #content{
    margin-top: 10px;
  }
</style>
