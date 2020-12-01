 <template>
  <div> 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">แก้ไขโซน</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/zone">เเสดงโซน</nuxt-link>
              </li>
              <li class="breadcrumb-item active">แก้ไขโซน</li>
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
        <ZoneForm @zoneData="onSubmitted" :zone="zonePost"/>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
 
  </div>
</template>

<script>
import ZoneForm from "@/components/pages/zone/ZoneForm";
import axios from 'axios'


export default {
    layout:"adminLayout",
    components:{
        ZoneForm
    },
    asyncData(context){ 
        return axios.get("https://service.candlesfest.com/api/zone/find/id/"+context.params.id)
        //return axios.get("https://service.candlesfest.com/api/zone/find/id/"+context.params.id)
            .then(res=>{ 
                return {
                    zonePost:{
                        ...res.data.zone
                    }
                }
            }
        ).catch(e=>context.error(e));
    },
    methods:{
        onSubmitted(zone){
            $('#loading-modal').modal('show'); 
            this.$store.dispatch("editZone", zone)
            .then(()=>{
              setTimeout(() => {
                this.$router.push("/admin/zone");
                $('#loading-modal').modal('hide');
                toastr.info('แก้ไขข้อมูลเรียบร้อยเเล้ว');
              }, 1500); 
            })
            .catch(error => { 
              $('#loading-modal').modal('hide');
              toastr.error('ไม่สามารถเเก้ไขข้อมูลได้'); 
              console.log('error ' , error);
            });
        } 
    }
}
</script>