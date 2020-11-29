<template>
  <div>
    <div id="loading-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered justify-content-center" role="document">
            <span class="fas fa-cog fa-spin fa-3x"></span>
        </div>
    </div>  
    <NavBar />
    <SideBar />
    <nuxt class="content-wrapper" />
    <Footer />
  </div>
</template>

<script>
import NavBar from '../components/pages/layout/NavBar'
import SideBar from '../components/pages/layout/SideBar'
import Footer from '../components/pages/layout/Footer' 
export default { 
  components: {
    NavBar, SideBar, Footer
  },
  computed:{
    showModal(){  
      const isShowModal  = this.$store.state.showModal;
      return isShowModal; 
    }
  }
 
}

</script>

 