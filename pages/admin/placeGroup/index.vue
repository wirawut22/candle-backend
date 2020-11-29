<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">กลุ่มสถานที่</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item active">เเสดงกลุ่มสถานที่</li>
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
        <PlaceGroupList :placeGroup="loadData" @deleteData="onDeleted" />
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import PlaceGroupList from "@/components/pages/placeGroup/PlaceGroupList";
import axios from "axios";

export default {
  layout: "adminLayout", 
  components: {
    PlaceGroupList,
  },
  mounted() { 
    this.$nextTick(() => {
      $('#loading-modal').modal('show');
      setTimeout(() => $('#loading-modal').modal('hide'), 1500)
    })
  },
  fetch({ store, params }) {   
    if (!store.state.placeGroupData || store.state.placeGroupData.length==0) {  
      return store.dispatch('initPlaceGroup');
    }
  },
  computed: {
    loadData() { 
      var data = [];
      if(this.$store.getters.getAllPlaceGroup){
        data = this.$store.getters.getAllPlaceGroup;
      }
      return data;  
    },
  },
  methods: {
    onDeleted(id) {  
      $('#loading-modal').modal('show'); 
      this.$store.dispatch("deletePlaceGroup", id)
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
    },
  },
};
</script>
