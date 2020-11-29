<template>
  <div class="row reserve">
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">เพิ่มรายการจองใหม่</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form id="reserveForm" @submit.prevent="onSubmit" @reset="onReset" role="form">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="zone_id">โซน</label>  
                  <select v-model="form.zone_id" name="zone_id" id="zone_id" class="form-control">
                        <option value="">กรุณาเลือก</option> 
                        <option v-for="item in zone" :value="item.id" :key="item.id">{{item.topic}}</option> 
                  </select>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="title">คำนำหน้า</label>  
                  <select v-model="form.title" name="title" id="title" class="form-control">
                    <option value="">กรุณาเลือก</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option> 
                  </select>
                </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="first_name">ชื่อ</label>
                  <input type="text" v-model="form.first_name" class="form-control" name="first_name" id="first_name" autocomplete="off" />
                </div> 
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="last_name">นามสกุล</label>
                  <input type="text" v-model="form.last_name" class="form-control" name="last_name" id="last_name" autocomplete="off" />
                </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="mobile">เบอร์มือถือ</label>
                  <input type="text" v-model="form.mobile" class="form-control" name="mobile" id="mobile" maxlength="10" autocomplete="off" />
                </div> 
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="amount">จำนวนที่นั่ง</label>
                  <input type="number" v-model="form.amount" class="form-control" name="amount" id="amount" min="0" max="1000" step="1" autocomplete="off" />
                </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="status">สถานะ</label>  
                  <select v-model="form.status" name="status" id="status" class="form-control">
                      <option value="P">กำลังดำเนินการ</option>
                      <option value="A">อนุมัติ</option>
                      <option value="I">ไม่อนุมัติ</option>
                  </select>
                </div>
              </div> 
            </div>

          </div>
          <!-- /.card-body -->

          <div class="card-footer text-center">
            <button type="submit" class="btn btn-secondary">บันทึก</button>
            <button type="reset" class="btn btn-default">ล้างข้อมูล</button>
          </div>
        </form>
      </div>
      <!-- /.card -->
    </div> 
  </div>
</template>

<style scoped> 

</style>

<script>    
 
export default {
   data(){  
      return{ 
          form:this.reserve?
          {
              ...this.reserve
          }
          :
          {
              zone_id:"",
              title:"", 
              first_name:"",
              last_name:"",
              mobile:"",
              amount:"0",
              status:"A",
          }
      }

    },
    mounted: function(){    

      $('#reserveForm').validate({
          rules: {
            zone_id: {
              required: true 
            },
            title: {
              required: true
            },
            first_name: {
              required: true
            },
            last_name: {
              required: true
            },
            mobile: {
              required: true,
              maxlength: 10,
              minlength: 10,
              digits: true
            } 
          },
          messages: {
            zone_id: {
              required: "กรุณาเลือกโซน"
            }, 
            title: {
              required: "กรุณาเลือกคำนำหน้า"
            },
            first_name: {
              required: "กรุณาระบุชื่อ"
            },
            last_name: {
              required: "กรุณาระบุนามสกุล"
            },
            mobile: {
              required: "กรุณาระบุเบอร์มือถือ",
              maxlength: "ขนาดเบอร์มือถือต้อง 10 หลักเท่านั้น",
              minlength: "ขนาดเบอร์มือถือต้อง 10 หลักเท่านั้น",
              digits: "จำนวนที่นั่งต้องเป็นตัวเลขเท่านั้น"
            } 
          },
          errorElement: 'span',
          errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
          },
          highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
          },
          unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
          },
          ignore: ".note-editor *"
        });
 
    },  
    props:{
      reserve:{
          type:Object,
          required:false
      },
      zone:{
          type:Array,
          required:false
      }
    },
    methods:{   
      onSubmit(evt){    
          if($("#reserveForm").valid()){
            this.$emit('reserveData', this.form); 
          }else{
            console.log("validate is failed");
          }
      },
      onReset(evt){ 
        evt.preventDefault(); 
        this.form.zone_id="";
        this.form.title=""; 
        this.form.first_name="";
        this.form.last_name="";
        this.form.mobile="";
        this.form.amount="0";
        this.form.status="A";
      }
    }
}

</script>

