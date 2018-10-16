<template>
  <div id="wrap">
    <mu-sub-header>文章列表</mu-sub-header>
    <mu-list textline="three-line" v-for="item in articleList" :key="item._id">

      <mu-list-item @click="Goto(item._id)" avatar="" :ripple="true" button>
        <mu-list-item-action>
          <mu-avatar>
            <img :src="item.author.avatar">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>
            {{item.title}}
          </mu-list-item-title>
          <mu-list-item-sub-title>
            <span style="color: rgba(0, 0, 0, .87)">
              {{item.author.username}} 发表于 ：{{item.created}}
               </span>
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>

    </mu-list>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        articleList : []
      }
    },
    created() {
      //获取文章列表
      this.$ajax.get('/')
        .then(res => {
          // console.log(res.data.articleList)
          res.data.articleList.forEach((item,index)=>{
            item.created = new Date(item.created).toLocaleString()
          })
          this.articleList = res.data.articleList
        });
      //刷新session
      this.$ajax.get('user')
        .then(res => {
          // console.log(res.data.session)
          this.$store.commit('conSession', res.data.session)
        });
    },
    methods:{
      Goto(num) {
        // console.log(num)
        this.$router.push({name:'articleDetails',query:{id:num}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }


</style>
