<template>
  <div class="row place">
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">เพิ่มสถานที่ใหม่</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form id="placeForm" @submit.prevent="onSubmit" @reset="onReset" role="form">
          <div class="card-body">
            <div class="form-group">
                <label for="status">กลุ่มสถานที่</label>  
                <select v-model="form.group_id" name="group_id" id="group_id" class="form-control">
                    <option value="">กรุณาเลือก</option>
                    <option v-for="item in placeGroup" :value="item.id" :key="item.id">{{item.topic}}</option> 
                </select>
            </div> 
            <div class="form-group">
              <label for="topic">ชื่อสถานที่</label>
              <input type="text" v-model="form.topic" class="form-control" name="topic" id="topic" autocomplete="off" />
            </div> 
            <div class="form-group">
              <label for="address">ที่อยู่</label>
              <input type="text" v-model="form.address" class="form-control" name="address" id="address" autocomplete="off" />
            </div> 
            <div class="form-group">
              <label for="topic">ลติจูด</label>
              <input type="text" v-model="form.latitude" class="form-control" name="latitude" id="latitude" autocomplete="off" />
            </div> 
            <div class="form-group">
              <label for="topic">ลองติจูด</label>
              <input type="text" v-model="form.longtitude" class="form-control" name="longtitude" id="longtitude" autocomplete="off" />
            </div> 
            <div class="form-group">
              <label for="author">ผู้เขียน</label>
              <input type="text" v-model="form.author" class="form-control" name="author" id="author" autocomplete="off" />
            </div>
            <div class="form-group">
              <label for="image">รูปภาพ</label>
              <div class="input-group" v-if="place">
                <div class="row">
                   <div class="col-12"> 
                    <div class="col-12">
                      <img v-if="!imageActive && place.image.length==0" src="/base/images/lazy.jpg" class="product-image" max-height="500"/>
                      <img v-if="!imageActive && place.image.length>0" :src="place.image[0]" class="product-image" max-height="500"/>
                      <img v-if="imageActive" :src="imageActive" class="product-image" max-height="500"/>
                    </div>
                    <div class="col-12 product-image-thumbs"  >
                       <div v-for="item in place.image" :key="item" class="product-image-thumb" v-on:click="setActiveImage(item)"><img :src="item"></div> 
                    </div>
                  </div> 
                </div>   
              </div>
              <div class="input-group" v-else>
                <div class="row">
                   <div class="col-12"> 
                    <div class="col-12">
                      <img src="/base/images/lazy.jpg" class="product-image" max-height="500"/> 
                    </div> 
                  </div> 
                </div>   
              </div>
              <div class="input-group mt-4">
                <div class="custom-file"> 
                  <input type="file" id="file" ref="file" multiple v-on:change="handleFileUpload()" placeholder="เลือกรูปภาพ" class="custom-file-input"/>
                  <label class="custom-file-label" for="image"></label>
                   <input type="text" id="newImage" name="newImage"/>
                </div>
                <div class="input-group-append">
                  <span class="input-group-text" id>อัพโหลด</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="description2">รายละเอียด(Mobile App)</label>
              <textarea v-model="form.description2" class="form-control" name="description2" id="description2" autocomplete="off" rows="5"></textarea> 
            </div>
            <div class="form-group">
              <label for="description1">รายละเอียด(Web Site)</label>
              <!-- <input type="text" class="form-control" id="description1" placeholder="กรอกรายละเอียด">-->
              <div class="pad">
                <textarea
                  v-model="form.description1"
                  class="textarea"
                  id="description1"
                  placeholder="Place some text here"
                  style="width: 100%; height: 700px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"
                ></textarea>
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

      <div class="modal fade" id="modal-validate-place">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">ข้อความเเจ้งเตือน</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>กรุณาเลือกไฟล์(นามสกุลไฟล์ต้องเป็น jpg|jpeg|png|gif เท่านั้น)</p>
            </div>
            <div class="modal-footer"> 
              <button type="button" class="btn btn-info" data-dismiss="modal">ตกลง</button> 
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

  </div>
</template>

<style scoped> 
  .product-image {
    max-width: 100%;
    max-height: 500px;
    width: auto;
    border-radius: 10px;
    padding: 5px;
    border: 1px solid #dee2e6;
    box-shadow: 0 1px 2px rgba(0,0,0,.075);
  }

  .product-image-thumb{
    cursor: pointer;
  }
</style>

<script>    
 
export default {
   data(){  
      return{  
          imageActive: "",
          form:this.place?
          { 
              ...this.place
          }
          :
          {
            group_id:"",
            topic:"",
            address:"",
            description1:"",
            description2:"",
            image:"",
            latitude:"",
            longtitude:"",
            author:"" 
          }
      }

    },
    mounted: function(){   
      //เซต image value เเยกเมื่อ page load 
      if(this.place && this.place.image){
        var imageStr = this.place.image.toString(); 
        this.setFileNameInit(imageStr.slice(0,100)+"...",imageStr); 
      }

      $('#placeForm').validate({
          rules: {
            group_id: {
              required: true 
            },
            topic: {
              required: true,
              maxlength: 500 
            },
            address:{
              required: true
            },
            latitude:{ 
              maxlength: 20,
              number: true
            },
            longtitude:{
              maxlength: 20,
              number: true
            }
          },
          messages: {
            group_id: {
              required: "กรุณากรอกเลือกกลุ่มสถานที่",
            },
            topic: {
              required: "กรุณากรอกหัวข้อ",
              maxlength: "ขนาดตัวอักษรต้องไม่เกิน 500 ตัวอักษร" 
            },
            address: {
              required: "กรุณากรอกที่อยู่"
            },
            latitude:{ 
              maxlength: "ขนาดตัวอักษรต้องไม่เกิน 20 ตัวอักษร",
              number: "ลติจูดต้องเป็นตัวเลขหรือทศนิยมเท่านั้น"
            },
            longtitude:{
              maxlength: "ขนาดตัวอักษรต้องไม่เกิน 20 ตัวอักษร",
              number: "ลติจูดต้องเป็นตัวเลขหรือทศนิยมเท่านั้น"
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
      place:{
          type:Object,
          required:false
      },
      placeGroup:{
          type:Array,
          required:false
      }
    },
    computed:{

    },
    methods:{ 
      handleFileUpload(){ 
        var fileNames = "";
        const files = this.$refs.file.files;
        for(var index=0;index<files.length;index++){  
            if(index==0){
              fileNames = fileNames + files[index].name;
            }else{
              fileNames = fileNames + "," + files[index].name;
            } 
        };  
        $(".custom-file-label").text(fileNames.slice(0,100)+"...");
      },
       setFileNameInit(image, imageFull){ 
        $(".custom-file-label").text(image);
        $("#newImage").val(imageFull);//รูปเดิม
      },
      setActiveImage(item){ 
        this.imageActive = item; 
      },
      onSubmit(evt){  
          const files = this.$refs.file.files; 
          this.form.image = files;
          this.form.description1 = $("#description1").summernote("code");
          this.form.newImage = $("#newImage").val(); 
          if($("#placeForm").valid()){//validate other
            // if(this.form.image.length==0){//validate image
            //   $("#modal-validate-place").modal("show");
            //   $("html, body").animate({ scrollTop: 0 }, "fast");
            //   return false;
            // }else{
              this.$emit('placeData', this.form); 
            //} 
          }else{
            console.log("validate is failed");
          }
      },
      onReset(evt){ 
        evt.preventDefault();
        this.form.group_id="";
        this.form.topic="";
        this.form.address="";
        this.form.description1=""; 
        this.form.description2="";
        this.form.latitude="";
        this.form.longtitude="";
        $(".custom-file-label").text("");//custom clear 
        this.form.author="";  
      }
    }
}

</script>

