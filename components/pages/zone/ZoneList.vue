<template>
  <div> 
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">โซนทั้งหมด</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="col-12 float-left clearfix">
              <nuxt-link to="/admin/zone/create" class="btn btn-info btn-sm"><i class="fas fa-plus"></i> เพิ่มโซน</nuxt-link> 
            </div> 
          </div> 
          <div class="card-body" style="padding-top:0px;">  
            <div class="col-12 table-container">
              <table id="zone-table" class="table table-bordered table-hover">
                <thead>
                  <tr> 
                    <th class="text-center" style="width: 5%">ลำดับ</th>
                    <th class="text-left" style="width: 10%">ชื่อโซน</th>
                    <th class="text-left" style="width: 10%">จำนวน(คน)</th>
                    <th class="text-left" style="width: 10%">จองเเล้ว(คน)</th>
                    <th class="text-left" style="width: 10%">ว่าง(คน)</th>
                    <th class="text-center" style="width: 15%">สถานะ</th> 
                    <th class="text-center" style="width: 15%">วันที่แก้ไข</th>
                    <th class="text-center" style="width: 25% !important">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in zone"
                    :key="item.id"
                    v-bind:index="index"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.topic.length>65 ? item.topic.slice(0,65)+"..." : item.topic }}</td>
                    <td class="text-left">
                      {{ item.amount ? item.amount : "0" }}
                    </td>
                    <td class="text-left">
                      {{ item.booked ? item.booked : "0" }}
                    </td> 
                    <td class="text-left">
                      {{ item.empty_seat ? item.empty_seat : "0" }}
                    </td> 
                    <td class="text-center">
                      <span v-if="item.status=='A'">
                        <b style="color:#17a2b8;">เปิดใช้งาน</b>
                      </span>
                      <span v-else>
                        <b style="color:#dc3545;">ปิดใช้งาน</b>
                      </span> 
                    </td>  
                    <td class="text-center">{{item.update_dttm | moment}}</td>
                    <td class="project-actions text-center">
                      <nuxt-link :to="{ path: 'zone/'+item.id}" class="btn btn-info btn-sm">
                        <i class="fas fa-pencil-alt"></i>
                        แก้ไข
                      </nuxt-link>
                      <a v-on:click="alertDeleteZone(item.id)" class="btn btn-danger btn-sm">
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

    
    <div class="modal fade" id="modal-delete-zone">
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
              <button type="button" class="btn btn-info" v-on:click="confirmDeleteZone(id)">ตกลง</button>
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
    var table = $("#zone-table").DataTable({
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
        emptyTable: "ไม่พบข้อมูล",
        search: "ค้นหา:", 
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
    alertDeleteZone(id){ 
      this.id = id; 
      $('#modal-delete-zone').modal("show"); 
    },
    confirmDeleteZone(id){  
      $('#modal-delete-zone').modal("hide");
      this.$emit('deleteData', id);
    } 
  },
  props: {
    zone: {
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