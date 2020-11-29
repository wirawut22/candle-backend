 <template>
  <div> 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">เพิ่มข่าวสาร</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">หน้าแรก</nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/admin/news">เเสดงข่าวสาร</nuxt-link>
              </li>
              <li class="breadcrumb-item active">เพิ่มข่าวสารใหม่</li>
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
        <NewsForm @newsData="onSubmitted"/>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
 
  </div>
</template>

<script>
import NewsForm from "@/components/pages/news/NewsForm";
import axios from 'axios'


export default {
    layout:"adminLayout",
    components:{
        NewsForm
    },
    methods:{
        onSubmitted(news){
            $('#loading-modal').modal('show');  
            this.$store.dispatch("addNews", news)
            .then(()=>{
              setTimeout(() => {
                this.$router.push("/admin/news");
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