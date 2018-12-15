<template>
    <div id="app">
        {{msg}}11111222332233333332
        {{dat}}
        <router-view/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: "welcome Panda!",
            dat: Object.assign({}, {a: 4}, {b: 5})
        }
    }
}
</script>
<style lang="scss" scoped>
.panda {
    color: blueviolet;
}
</style>
