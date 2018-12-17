<template>
  <div class="panda">
    <div class="sas">{{msg}}</div>
    <div class="box"
         @click="clickBox">ewkkkjo
      <div>32</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      msg: 'This is main'
    };
  },
  methods: {
    clickBox() {
      console.log('feijoi');
    }
  }
};
</script>
<style lang="scss" scoped>
.panda {
  color: blueviolet;
  display: flex;
  font-size: 46px;
  justify-content: center;
  .sas {
    color: hotpink;
    width: 100px;
    height: 100px;
  }
}
</style>
