 <template>
  <div> 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">เพิ่มรายการจอง</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/reserve">เเสดงรายการจอง</nuxt-link>
              </li>
              <li class="breadcrumb-item active">เพิ่มรายการจองใหม่</li>
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
        <ReserveForm @reserveData="onSubmitted" :zone="loadZoneData"/>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
 
  </div>
</template>

<script>
import ReserveForm from "@/components/pages/reserve/ReserveForm";
import axios from 'axios'


export default {
    layout:"adminLayout",
    components:{
        ReserveForm
    },
    methods:{
        onSubmitted(reserve){ 
            $('#loading-modal').modal('show'); 
            this.$store.dispatch("addReserve", reserve)
            .then(()=>{
              setTimeout(() => {
                this.$router.push("/admin/reserve");
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
    },
    fetch({ store, params }) {  
      if (!store.state.zoneData || store.state.zoneData.length==0) { 
        return store.dispatch('initZone');
      }
    },
    computed:{ 
      loadZoneData(){ 
        var data = [];
        if(this.$store.getters.getAllZone){
          data = this.$store.getters.getAllZone;
        }
        return data;   
      }
    }
}
</script>