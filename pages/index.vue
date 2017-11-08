<template>
    <div id="app">
        <MessageList :messages="messages"/>
    </div>
</template>
<script>
    import MessageList from '../components/MessageList'
    export default {
        created () {
//            this.$model.home()
//                .then(data => {
//                    console.log("data: ", data);
//                });
        },
      data () {
          return {
            messages: ['Hey John', 'Howdy Paco']
          }
      },
      components: {
        MessageList
      }
    }
</script>
<style lang="less" scoped>
    div {
        font-size: 14pt;
    }
</style>