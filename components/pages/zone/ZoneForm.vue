<template>
  <div class="row zone">
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">เพิ่มโซนใหม่</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form id="zoneForm" @submit.prevent="onSubmit" @reset="onReset" role="form">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="topic">ชื่อโซน</label>
                  <input type="text" v-model="form.topic" class="form-control" name="topic" id="topic" autocomplete="off" />
                </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="amount">จำนวนที่นั่ง</label>
                  <input type="number" v-model="form.amount" name="amount" id="amount" min="0" max="1000" step="1" class="form-control" autocomplete="off"/>
                </div>  
              </div>  
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="status">สถานะ</label>  
                  <select v-model="form.status" name="status" id="status" class="form-control">
                        <option value="A">เปิดใช้งาน</option>
                        <option value="I">ปิดใช้งาน</option>
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
          form:this.zone?
          {
              ...this.zone
          }
          :
          {
              topic:"",
              amount:"0", 
              status:"A" 
          }
      }

    },
    mounted: function(){    

      $('#zoneForm').validate({
          rules: {
            topic: {
              required: true 
            },
            amount: {
              required: true,
              digits: true
            } 
          },
          messages: {
            topic: {
              required: "กรุณากรอกหัวข้อ"
            }, 
            amount: {
              required: "กรุณาระบุจำนวนที่นั่ง",
              digits: "จำนวนที่นั่งต้องเป็นตัวเลขเท่านั้น"
            },
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

      $(".textarea").summernote({ height: 500, focus: false });
    },  
    props:{
      zone:{
          type:Object,
          required:false
      } 
    },
    methods:{   
      onSubmit(evt){    
          if($("#zoneForm").valid()){
            this.$emit('zoneData', this.form); 
          }else{
            console.log("validate is failed");
          }
      },
      onReset(evt){ 
        evt.preventDefault();
        this.form.topic="";
        this.form.amount="0"; 
        this.form.status="A";
      }
    }
}

</script>

