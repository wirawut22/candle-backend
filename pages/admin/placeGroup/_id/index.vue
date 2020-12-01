 <template>
  <div> 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">แก้ไขกลุ่มสถานที่</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/placeGroup">เเสดงกลุ่มสถานที่</nuxt-link>
              </li>
              <li class="breadcrumb-item active">แก้ไขกลุ่มสถานที่</li>
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
        <PlaceGroupForm @placeGroupData="onSubmitted" :placeGroup="placeGroupPost"/>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
 
  </div>
</template>

<script>
import PlaceGroupForm from "@/components/pages/placeGroup/PlaceGroupForm";
import axios from 'axios'


export default {
    layout:"adminLayout",
    components:{
        PlaceGroupForm
    },
    asyncData(context){ 
        return axios.get("https://service.candlesfest.com/api/placeGroup/find/id/"+context.params.id)
            .then(res=>{ 
                return {
                    placeGroupPost:{
                        ...res.data.place_group
                    }
                }
            }
        ).catch(e=>context.error(e));
    },
    methods:{
        onSubmitted(placeGroup){   
            $('#loading-modal').modal('show'); 
            this.$store.dispatch("editPlaceGroup", placeGroup)
            .then(()=>{
              setTimeout(() => {
                this.$router.push("/admin/placeGroup");
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