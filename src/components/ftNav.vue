<template>
  <mu-container style="width:100%;mix-width: 400px;max-width: 1300px;position: fixed;bottom: 0;padding: 0">
    <mu-bottom-nav :value.sync="shift" shift>
      <mu-bottom-nav-item :to="{name:'index'}" @click="home" value="index" title="主页" icon="account_balance">
      </mu-bottom-nav-item>
      <mu-bottom-nav-item :to="{name:'personal'}" value="personal" title="个人中心" icon="account_box">
      </mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
  export default {
    name: "ftNav",
    data() {
      return {
        shift: 'index'
      }
    },
    methods: {
      home() {
      },
    },
    created() {
      this.$data.shift = this.$route.name
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
