<template>
  <div> 
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">ข่าวสารทั้งหมด</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="col-12 float-left clearfix">
              <nuxt-link to="/admin/news/create" class="btn btn-info btn-sm"><i class="fas fa-plus"></i> เพิ่มข่าวสาร</nuxt-link>
            </div>
          </div>
          <div class="card-body" style="padding-top:0px;">  
            <div class="col-12 table-container">
              <table id="news-table" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="text-center" style="width: 5%">ลำดับ</th>
                    <th class="text-left" style="width: 40%">หัวข้อ</th>
                    <th class="text-left" style="width: 10%">ผู้เขียน</th> 
                    <th class="text-center" style="width: 20%">วันที่บันทึก</th>
                    <th class="text-center" style="width: 25% !important">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in news"
                    :key="item.id"
                    v-bind:index="index"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.topic.length>100 ? item.topic.slice(0,100)+"..." : item.topic }}</td>
                    <td class="text-left">
                      {{ item.author ? item.author : "" }}
                    </td> 
                    <td class="text-center">{{item.update_dttm | moment}}</td>
                    <td class="project-actions text-center">
                      <nuxt-link :to="{ path: 'news/'+item.id}" class="btn btn-info btn-sm">
                        <i class="fas fa-pencil-alt"></i>
                        แก้ไข
                      </nuxt-link>
                      <a v-on:click="alertDeleteNews(item.id)" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                        ลบ
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>

    
    <div class="modal fade" id="modal-delete-news">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">ข้อความเเจ้งเตือน</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>ต้องการลบรายการใช่หรือไม่ ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-info" v-on:click="confirmDeleteNews(id)">ตกลง</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">ยกเลิก</button> 
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

  </div>
</template>

<script>
import moment from "moment"; 

export default { 
  data(){  
    return{ 
      id:""
    }  
  },
  mounted: function () {
    $("#news-table").DataTable({    
      paging: true,
      lengthChange: false,
      searching: true,
      ordering: false,
      info: true,
      autoWidth: true,
      responsive: true, 
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      language: { 
        info: "เเสดง _START_ ถึง _END_ ของ _TOTAL_ รายการ",
        infoEmpty: "แสดง 0 ถึง 0 ของ 0 รายการ", 
        lengthMenu: "เเสดง _MENU_ รายการ",
        loadingRecords: "กำลังโหลด...",
        processing: "ประมวลผล...",
        search: "ค้นหา:", 
        emptyTable: "ไม่พบข้อมูล",
        paginate: {
          previous: "ก่อนหน้า",
          next: "ถัดไป",
          first: "เเรกสุด",
          last: "สุดท้าย",   
          infoEmpty: "ไม่พบข้อมูล", 
        }
      } 

    });
  },
  methods: {
    moment: function () {
      return moment();
    },
    alertDeleteNews(id){ 
      this.id = id;
      $('#modal-delete-news').modal("show"); 
    },
    confirmDeleteNews(id){ 
      $('#modal-delete-news').modal("hide");
      this.$emit('deleteData', id);
    }
  },
  props: {
    news: {
      type: Array,
      required: true,
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  } 
};
</script>