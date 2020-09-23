<template>
  <div class="layout">
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Header from "@/components/common/Header"

export default {
  components: {
    Header,
  }
}
</script>
<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background-color: var(--bg);
}
</style>