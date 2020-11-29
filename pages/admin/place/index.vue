<template>
  <div> 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">สถานที่</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item active">เเสดงสถานที่</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid"> 
        <PlaceList :place="loadData"  @deleteData="onDeleted" />
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content --> 

  </div>
</template>

<script>

import PlaceList from "@/components/pages/place/PlaceList";
import axios from 'axios'   

export default {
  layout: "adminLayout",
  components: { 
    PlaceList,
  },
  mounted() {   
    this.$nextTick(() => {
      $('#loading-modal').modal('show');
      setTimeout(() => $('#loading-modal').modal('hide'), 1500)
    })
  },
  fetch({ store, params }) { 
    if (!store.state.placeData || store.state.placeData.length==0) {
      return store.dispatch('initPlace');
    }
  },
  computed:{
    loadData(){    
      var data = [];
      if(this.$store.getters.getAllPlace){
        data = this.$store.getters.getAllPlace;
      }
      return data;   
    }
    
  },
  methods:{
      onDeleted(id){   
          $('#loading-modal').modal('show'); 
          this.$store.dispatch("deletePlace", id)
          .then(()=>{ 
            setTimeout(() => {
              $('#loading-modal').modal('hide'); 
              toastr.info('ลบข้อมูลเรียบร้อยเเล้ว');
            }, 1500);  
          })
          .catch(error => {  
            $('#loading-modal').modal('้hide'); 
            toastr.error('ไม่สามารถลบข้อมูลได้');
            console.log('error ' , error);
          });
      } 
      
    }
};
 
</script>
