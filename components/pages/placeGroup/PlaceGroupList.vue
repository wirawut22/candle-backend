<template>
  <div> 
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">กลุ่มสถานที่ทั้งหมด</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="col-12 float-left clearfix">
              <nuxt-link to="/admin/placeGroup/create" class="btn btn-info btn-sm"><i class="fas fa-plus"></i> เพิ่มกลุ่มสถานที่</nuxt-link>
            </div>
          </div>
          <div class="card-body" style="padding-top:0px;">  
            <div class="col-12 table-container">
              <table id="placeGroup-table" class="table table-bordered table-hover">
                <thead>
                  <tr> 
                    <th class="text-center" style="width: 10%">ลำดับ</th>
                    <th class="text-left" style="width: 15%">กลุ่มสถานที่</th> 
                    <th class="text-left" style="width: 15%">ไอคอน</th> 
                    <th class="text-left" style="width: 15%">context path</th> 
                    <th class="text-center" style="width: 20%">วันที่แก้ไข</th>
                    <th class="text-center" style="width: 25% !important">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in placeGroup"
                    :key="item.id"
                    v-bind:index="index"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.topic.length>65 ? item.topic.slice(0,65)+"..." : item.topic }}</td>  
                    <td class="text-left">{{ item.icon? item.icon : ""}}</td>  
                    <td class="text-left">{{ item.context_path? item.context_path : ""}}</td>  
                    <td class="text-center">{{item.update_dttm | moment}}</td>
                    <td class="project-actions text-center">
                      <nuxt-link :to="{ path: 'placeGroup/'+item.id}" class="btn btn-info btn-sm">
                        <i class="fas fa-pencil-alt"></i>
                        แก้ไข
                      </nuxt-link>
                      <a v-on:click="alertDeletePlaceGroup(item.id)" class="btn btn-danger btn-sm">
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

    
    <div class="modal fade" id="modal-delete-placeGroup">
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
              <button type="button" class="btn btn-info" v-on:click="confirmDeletePlaceGroup(id)">ตกลง</button>
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
    $("#placeGroup-table").DataTable({ 
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
    alertDeletePlaceGroup(id){ 
      this.id = id; 
      $('#modal-delete-placeGroup').modal("show"); 
    },
    confirmDeletePlaceGroup(id){  
      $('#modal-delete-placeGroup').modal("hide");
      this.$emit('deleteData', id);
    }
  },
  props: {
    placeGroup: {
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