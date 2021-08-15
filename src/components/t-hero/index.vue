<template>
  <div class="hero-img"/>
</template>

<script>
export default {
  name: "THero"
}
</script>

<style scoped lang="scss">
  .hero-img {
    background-image: url('../../assets/hero.jpg');
    height: calc(100% - 50px);
    min-height: 550px;
    max-height: 700px;
    mask-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0) 10%, rgba(0,0,0,0.75) 50%);

  &::after {
     content: '';
     @apply absolute top-0 left-0 right-0 bottom-0
   }

  @apply absolute bottom-0 left-0 w-full bg-cover bg-center bg-indigo-900 z-0
  }

  .hero-img-light {
    @apply from-transparent to-gray-200
  }

  .hero-img-dark {
    @apply from-transparent to-gray-800
  }
</style>
