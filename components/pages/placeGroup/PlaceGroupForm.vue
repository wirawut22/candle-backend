<template>
  <div class="row placeGroup">
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">เพิ่มกลุ่มสถานที่</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form id="placeGroupForm" @submit.prevent="onSubmit" @reset="onReset" role="form">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="topic">กลุ่มสถานที่</label>
                  <input type="text" v-model="form.topic" class="form-control" name="topic" id="topic" autocomplete="off" />
                </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="description">รายละเอียด</label>
                  <input type="text" v-model="form.description" class="form-control" name="description" id="description" autocomplete="off" />
                </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="icon">ไอคอน เช่น <span>'fas fa-box'</span> <a href="https://fontawesome.com/icons?m=free" target="_blank">ค้นหาไอคอน</a></label>
                  <input type="text" v-model="form.icon" class="form-control" name="icon" id="icon" autocomplete="off" />
                </div> 
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="context_path">context path</label>
                  <input type="text" v-model="form.context_path" name="context_path" id="context_path" class="form-control" autocomplete="off"/>
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
          form:this.placeGroup?
          {
              ...this.placeGroup
          }
          :
          {
              topic:"",
              description:"",
              icon:"",
              context_path:""
              
          }
      }

    },
    mounted: function(){    

      $('#placeGroupForm').validate({
          rules: {
            topic: {
              required: true,
              maxlength: 500 
            } 
          },
          messages: {
            topic: {
              required: "กรุณากรอกกลุ่มสถานที่",
              maxlength: "ขนาดตัวอักษรต้องไม่เกิน 500 ตัวอักษร" 
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

      $(".textarea").summernote({ height: 500, focus: false });
    },  
    props:{
      placeGroup:{
          type:Object,
          required:false
      } 
    },
    methods:{   
      onSubmit(evt){    
          if($("#placeGroupForm").valid()){
            this.$emit('placeGroupData', this.form); 
          }else{
            console.log("validate is failed");
          }
      },
      onReset(evt){ 
        evt.preventDefault();
        this.form.topic="";
        this.form.description="";
        this.form.icon="";
        this.form.context_path="";
      }
    }
}

</script>

