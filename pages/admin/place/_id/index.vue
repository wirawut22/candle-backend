 <template>
  <div> 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">แก้ไขสถานที่</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/place">เเสดงสถานที่</nuxt-link>
              </li>
              <li class="breadcrumb-item active">แก้ไขสถานที่</li>
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
        <PlaceForm @placeData="onSubmitted" :place="placePost" :placeGroup="loadGroupData"/>
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
    asyncData(context){ 
      debugger; 
        return axios.get("https://service.candlesfest.com/api/place/find/id/"+context.params.id)
            .then(res=>{ 
              debugger;
                return { 
                    placePost:{
                        ...res.data.place
                    }
                }
            }
        ).catch(e=>context.error(e));
    },
    fetch({ store, params }) { 
      debugger;
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
            this.$store.dispatch("editPlace", place)
            .then(()=>{
              setTimeout(() => {
                this.$router.push("/admin/place");
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