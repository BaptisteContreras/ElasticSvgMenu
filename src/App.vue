<template>
  <div id="app">
    <elastic-svg-menu >
      <li><a href="#home"><i class="fa fa-fw fa-home"></i><span>Home</span></a></li>
      <li><a href="#favs"><i class="fa fa-fw fa-heart"></i><span>Favs</span></a></li>
      <li><a href="#files"><i class="fa fa-fw fa-file"></i><span>Files</span></a></li>
      <li><a href="#facebook"><i class="fa fa-fw fa-facebook"></i><span>Facebook</span></a></li>
    </elastic-svg-menu>
  </div>
</template>

<script>
import ElasticSvgMenu from './components/ElasticSvgMenu.vue'

export default {
  name: 'app',
  components: {
    ElasticSvgMenu
  }
}
</script>


