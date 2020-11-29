 <template>
  <div> 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">เพิ่มสถานที่</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/place">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/place">เเสดงสถานที่</nuxt-link>
              </li>
              <li class="breadcrumb-item active">เพิ่มสถานที่ใหม่</li>
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
        <PlaceForm @placeData="onSubmitted" :placeGroup="loadGroupData"/>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
 
  </div>
</template>

<script>
import PlaceForm from "@/components/pages/place/PlaceForm";
import axios from 'axios'


export default {
    layout:"adminLayout",
    components:{
        PlaceForm
    },
    fetch({ store, params }) { 
      if (!store.state.placeGroupData || store.state.placeGroupData.length==0) { 
        return store.dispatch('initPlaceGroup');
      }
    },
    computed:{ 
      loadGroupData(){    
        var data = [];
        if(this.$store.getters.getAllPlaceGroup){
          data = this.$store.getters.getAllPlaceGroup;
        }
        return data;   
      }
    },
    methods:{
        onSubmitted(place){ 
            $('#loading-modal').modal('show'); 
            this.$store.dispatch("addPlace", place)
            .then(()=>{
              setTimeout(() => {
                this.$router.push("/admin/place");
                $('#loading-modal').modal('hide');
                toastr.info('บันทึกข้อมูลเรียบร้อยเเล้ว');
              }, 1500); 
            })
            .catch(error => { 
              $('#loading-modal').modal('hide');
              toastr.error('ไม่สามารถบันทึกข้อมูลได้');
              console.log('error ' , error);
            });
        } 
    }
}
</script>