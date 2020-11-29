<template>
  <div> 
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">สถานที่ทั้งหมด</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="col-12 float-left clearfix">
              <nuxt-link to="/admin/place/create" class="btn btn-info btn-sm"><i class="fas fa-plus"></i> เพิ่มสถานที่</nuxt-link>
            </div>
          </div>
          <div class="card-body" style="padding-top:0px;">  
            <div class="col-12 table-container">
              <table id="place-table" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="text-center" style="width: 5%">ลำดับ</th>
                    <th class="text-left" style="width: 10%">กลุ่มสถานที่</th>
                    <th class="text-left" style="width: 10%">ชื่อสถานที่</th>
                    <th class="text-left" style="width: 15%">ที่อยู่</th>
                    <th class="text-left" style="width: 10%">ลติจูด</th>
                    <th class="text-left" style="width: 10%">ลองติจูด</th>
                    <th class="text-left" style="width: 12%">ผู้เขียน</th> 
                    <th class="text-center" style="width: 13%">วันที่บันทึก</th>
                    <th class="text-center" style="width: 20% !important">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in place"
                    :key="item.id"
                    v-bind:index="index"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-left">
                      {{ item.place_group.group_topic ? item.place_group.group_topic : "" }}
                    </td>
                    <td class="text-left">{{ item.topic.length>65 ? item.topic.slice(0,65)+"..." : item.topic }}</td>
                    <td class="text-left">
                      {{ item.address ? item.address : "" }}
                    </td>
                    <td class="text-left">
                      {{ item.latitude ? item.latitude : "" }}
                    </td>
                    <td class="text-left">
                      {{ item.longtitude ? item.longtitude : "" }}
                    </td>
                    <td class="text-left">
                      {{ item.author ? item.author : "" }}
                    </td> 
                    <td class="text-center">{{item.update_dttm | moment}}</td>
                    <td class="project-actions text-center">
                      <nuxt-link :to="{ path: 'place/'+item.id}" class="btn btn-info btn-sm">
                        <i class="fas fa-pencil-alt"></i>
                        แก้ไข
                      </nuxt-link>
                      <a v-on:click="alertDeletePlace(item.id)" class="btn btn-danger btn-sm">
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

    
    <div class="modal fade" id="modal-delete-place">
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
              <button type="button" class="btn btn-info" v-on:click="confirmDeletePlace(id)">ตกลง</button>
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
    $("#place-table").DataTable({   
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
    alertDeletePlace(id){ 
      this.id = id;
      $('#modal-delete-place').modal("show"); 
    },
    confirmDeletePlace(id){ 
      $('#modal-delete-place').modal("hide");
      this.$emit('deleteData', id);
    }
  },
  props: {
    place: {
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