<template>
  <div class="row news">
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">เพิ่มข่าวสารใหม่</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form id="newsForm" @submit.prevent="onSubmit" @reset="onReset" role="form">
          <div class="card-body">
            <div class="form-group">
              <label for="topic">หัวข้อ</label>
              <input type="text" v-model="form.topic" class="form-control" name="topic" id="topic" autocomplete="off" />
            </div> 
            <div class="form-group">
              <label for="author">ผู้เขียน</label>
              <input type="text" v-model="form.author" class="form-control" name="author" id="author" autocomplete="off" />
            </div>
            <div class="form-group">
              <label for="image">รูปภาพ</label>
              <div class="input-group" v-if="news">
                <div class="row">
                   <div class="col-12"> 
                    <div class="col-12">
                      <img v-if="!imageActive && news.image.length==0" src="/base/images/lazy.jpg" class="product-image" max-height="500"/>
                      <img v-if="!imageActive && news.image.length>0" :src="news.image[0]" class="product-image" max-height="500"/>
                      <img v-if="imageActive" :src="imageActive" class="product-image" max-height="500"/>
                    </div>
                    <div class="col-12 product-image-thumbs"  >
                       <div v-for="item in news.image" :key="item" v-bind:index="index" class="product-image-thumb" v-on:click="setActiveImage(item)"><img :src="item"></div> 
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
              <label for="รายละเอียด">รายละเอียด(Mobile App)</label>
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


    <div class="modal fade" id="modal-validate-news">
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
          form:this.news?
          {
              ...this.news
          }
          :
          {
              topic:"",
              description1:"",
              description2:"",
              image:"",
              author:"" 
          }
      }

    },
    computed:{ 

    },
    mounted: function(){   
      //เซต image value เเยกเมื่อ page load 
      if(this.news && this.news.image){
        var imageStr = this.news.image.toString(); 
        this.setFileNameInit(imageStr.slice(0,100)+"...", imageStr);
      } 

      $('#newsForm').validate({
          rules: {
            topic: {
              required: true,
              maxlength: 500 
            } 
          },
          messages: {
            topic: {
              required: "กรุณากรอกหัวข้อ",
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
      news:{
          type:Object,
          required:false
      } 
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
 
          if($("#newsForm").valid()){//validate other
            this.$emit('newsData', this.form); 
          }else{
            console.log("validate is failed");
          }
      },
      onReset(evt){ 
        evt.preventDefault();
        this.form.topic="";
        this.form.description1=""; 
        this.form.description2="";
        $(".custom-file-label").text("");//custom clear 
        this.form.author="";
      }
    }
}

</script>

