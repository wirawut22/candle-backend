<template>
  <div class="inner_page">
    <!-- Start header -->
    <header class="top-header" style="margin-top: 50px">
      <TabBar :placeGroupList="placeGroupList" />
    </header>

      <div class="modal fade" id="modal-mobile-checking" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">ข้อความเเจ้งเตือน</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>กรุณากรอกเบอร์มือถือที่ต้องการตรวจสอบสถานะ</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">ตกลง</button> 
            </div>
          </div> 
        </div> 
      </div>

      <div class="modal fade" id="modal-seat-checking" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">ข้อความเเจ้งเตือน</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>จำนวนที่นั่งต้องมากกว่า 0</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">ตกลง</button> 
            </div>
          </div> 
        </div> 
      </div>

      <div id="toastsContainerTopRight" class="toasts-top-right fixed" style="display: none;">
        <div class="toast bg-info fade show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="mr-auto">ข้อความแจ้งเตือน</strong><small></small>
            <button data-dismiss="toast" type="button" class="ml-2 mb-1 close" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="toast-body">
            {{modal_text}}
          </div>
        </div> 
      </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mt-5">
            <div class="full">
              <div class="row">
                <div class="heading_main text_align_left">
                  <h2><span>ตรวจสอบสถานะ</span></h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="container pt-3 pb-3">
            <div class="row">
              <div class="newsletter_form col-md-4">
                <form id="checkReserveForm" @submit.prevent="onSubmitCheckReserve" role="form">    
                  <div class="form-group">
                    <label for="mobile">เบอร์โทร : </label>
                    <input type="number" placeholder="กรอกเบอร์โทร" name="mobile" id="mobile_checking" autocomplete="off" /> 
                  </div> 
                  <div class="form-group mb-5"> 
                    <button type="submit"><i class="fas fa-user-check"></i> ตรวจสอบสถานะ</button> 
                  </div> 
                </form> 
              </div>
              <div class="col-md-8 mt-2">
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <div class="card-header">
                          <h3 class="card-title">รายละเอียด</h3>
                        </div> 
                          <div class="card-body table-responsive p-0" style="height: 185px;">
                            <table id="reserve-detail-table" class="table table-head-fixed text-nowrap">
                              <thead>
                                <tr>
                                  <th class="text-center">ลำดับ</th> 
                                  <th class="text-left">ชื่อ-นามสกุล</th>  
                                  <th class="text-center">เบอร์โทร</th>
                                  <th class="text-center">โซน</th>
                                  <th class="text-center">จำนวน</th>
                                  <th class="text-center">สถานะ</th> 
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, index) in $store.state.reserveCheckingData" :key="item.id" v-bind:index="index">
                                  <td class="text-center">{{index+1}}</td>
                                  <td class="text-left">{{ item.title ? item.title : "" }}&nbsp;{{ item.first_name ? item.first_name : "" }}&nbsp;{{ item.last_name ? item.last_name : "" }}</td>
                                  <td class="text-center">{{ item.mobile ? item.mobile : "" }}</td>
                                  <td class="text-center">{{ item.zone ? item.zone : "" }}</td>
                                  <td class="text-center">{{ item.reserved ? item.reserved : "0" }}</td>
                                  <td class="text-center">
                                    <span v-if="item.status=='P'">
                                      <b style="color:#007bff;">กำลังดำเนินการ</b>
                                    </span>
                                    <span v-if="item.status=='A'">
                                      <b style="color:#17a2b8;">อนุมัติ</b>
                                    </span>
                                    <span v-if="item.status=='I'">
                                      <b style="color:#dc3545;">ไม่อนุมัติ</b>
                                    </span>
                                  </td>
                                </tr> 
                              </tbody>
                              <tbody>
                                <tr v-if="$store.state.reserveCheckingData.length==0">
                                  <td colspan="6" class="text-center">ไม่พบข้อมูลการจอง</td>
                                </tr>
                              </tbody>
                            </table>
                          </div> 
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>     
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
              <hr>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mt-3">
            <div class="full">
              <div class="row">
                <div class="heading_main text_align_left">
                  <h2><span>จองที่นั่ง</span></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="container pt-3 pb-3">
            <div class="row">
            <div class="newsletter_form col-md-4">
              <form id="reserveForm" @submit.prevent="onSubmitReserve" role="form"> 
 
                 <div class="form-group">
                  <div class="col-md-12"> 
                        <div class="reserved"></div> : จองเเล้ว
                        <div class="empty"></div> : ที่นั่งว่าง
                  </div>
                </div>

                  <div class="form-group">
                    <label for="zone_id">โซน : </label> 
                    <select v-model="form.zone_id" id="zone_id" name="zone_id">
                        <option value="">กรุณาเลือก</option>
                        <option v-for="item in zoneList" :value="item.id" :key="item.id">{{item.topic}}</option> 
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="title">คำนำหน้า : </label>
                    <select v-model="form.title" id="title" name="title">
                        <option value="">กรุณาเลือก</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="first_name">ชื่อ : </label>
                    <input type="text" v-model="form.first_name" placeholder="กรอกชื่อ" name="first_name" id="first_name" autocomplete="off" />
                  </div>
                  <div class="form-group">
                    <label for="last_name">นามสกุล : </label>
                    <input type="text" v-model="form.last_name" placeholder="กรอกนามสกุล" name="last_name" id="last_name" autocomplete="off" />
                  </div> 
                  <div class="form-group">
                    <label for="mobile">เบอร์โทร : </label>
                    <input type="number" v-model="form.mobile" placeholder="กรอกเบอร์โทร" name="mobile" id="mobile" autocomplete="off" /> 
                  </div>
                  <div class="form-group">
                    <label for="amount">จำนวนที่นั่ง : </label>
                    <input type="number" v-model="form.amount" placeholder="ระบุจำนวนที่นั่ง" name="amount" id="amount" autocomplete="off" /> 
                  </div> 

                <div class="form-group mb-5"> 
                  <button type="submit"><i class="fas fa-chalkboard-teacher"></i> ยืนยันการจอง</button> 
                </div>


              </form>

            </div>  
              <div class="col-md-8 mt-2 d-flex flex-wrap">  
                <div class="d-flex flex-wrap w-50" style="" v-for="(item, index) in zoneList" :key="item.id" v-bind:index="index"> 
                  <input type="hidden" :id="`empty_seat-zone-${item.id}`" :value="item.empty_seat" />
                  <div class="col-md-12 zone-topic" v-if="item.empty_seat>0">โซน {{item.topic}} (ว่าง {{item.empty_seat}} คน)</div>
                  <div class="col-md-12 zone-topic red" v-if="item.empty_seat==0">โซน {{item.topic}} (เต็ม)</div>
                  <div class="card card-body w-10" v-for="n in item.amount" :key="n"> 
                    <div class="reserved mr-1" v-if="n<=item.booked"></div>
                    <div class="empty mr-1" v-else></div>  
                  </div>  
                </div> 

              </div> 
            </div> 
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <CopyRight />
  </div>
</template>

<style scoped>

/* desktops */
@media (min-width: 1900px) {
    .flex-wrap {
        -ms-flex-wrap: wrap!important;
        flex-wrap: wrap!important;
        width: 100%;
    }

    .w-10 {
        -webkit-box-flex: 0;
            -ms-flex: 0 0 10% !important;
                flex: 0 0 10% !important;
        max-width: 10%;
      }
      
    .w-50 {
        border: 2px solid #002147;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 45% !important;
                flex: 0 0 45% !important;
        max-width: 45%; 
        margin: 3px auto;
    }
}

@media (min-width: 1190px) and (max-width: 1900px) {

    .flex-wrap {
        -ms-flex-wrap: wrap!important;
        flex-wrap: wrap!important;
        width: 100%;
    }

    .w-10 {
        -webkit-box-flex: 0;
            -ms-flex: 0 0 10% !important;
                flex: 0 0 10% !important;
        max-width: 10%;
      }
      
    .w-50 {
        border: 2px solid #002147;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 45% !important;
                flex: 0 0 45% !important;
        max-width: 45%; 
        margin: 3px auto;
    }
 }


/* only small desktops */
/* tablets */
 @media (min-width: 992px) and (max-width: 1190px) {

    .flex-wrap {
        -ms-flex-wrap: wrap!important;
        flex-wrap: wrap!important;
        width: 100%;
    }

    .w-10 {
        -webkit-box-flex: 0;
            -ms-flex: 0 0 10% !important;
                flex: 0 0 10% !important;
        max-width: 10%;
      }
      
    .w-50 {
        border: 2px solid #002147;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 45% !important;
                flex: 0 0 45% !important;
        max-width: 45%; 
        margin: 3px auto;
    }
 }

/* only small desktops */
/* tablets */
 @media (min-width: 992px) and (max-width: 1190px) {

    .flex-wrap {
        -ms-flex-wrap: wrap!important;
        flex-wrap: wrap!important;
        width: 100%;
    }

    .w-10 {
        -webkit-box-flex: 0;
            -ms-flex: 0 0 10% !important;
                flex: 0 0 10% !important;
        max-width: 10%;
      }
      
    .w-50 {
        border: 2px solid #002147;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 45% !important;
                flex: 0 0 45% !important;
        max-width: 45%; 
        margin: 3px auto;
    }
 }

 /* mobile or only mobile */
 @media (max-width: 767px) {

    .flex-wrap {
        -ms-flex-wrap: wrap!important;
        flex-wrap: wrap!important;
        width: 100%;
    }

    .w-10 {
        -webkit-box-flex: 0;
            -ms-flex: 0 0 10% !important;
                flex: 0 0 10% !important;
        max-width: 10%;
      }
      
    .w-50 {
        border: 2px solid #002147;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 100% !important;
                flex: 0 0 100% !important;
        max-width: 100%; 
        margin: 3px auto;
    }
 }
 



.zone-topic{
  font-weight: bold;
  text-align:center;
  background: #002147;
  color: #ffffff;
}

.card-body { 
    padding: 5px;
    border-radius: 0px;
}

.card {
    box-shadow: none;
    margin-bottom: 0px;
}
 
.reserved{
  margin: auto;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  box-shadow: inset 0px 3px 7px 0px rgba(0, 0, 0, 0.3), 0px 1px 0px 0px rgba(255, 255, 255, 0.8);
  background: red;
}

.empty{
  margin: auto;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  box-shadow: inset 0px 3px 7px 0px rgba(0, 0, 0, 0.3), 0px 1px 0px 0px rgba(255, 255, 255, 0.8);
  background-color: white;
}

hr{
    border: 4px solid #002147;
    border-radius: 0px;
}

#reserve-detail-table{
  font-size: 14px;
}

.toast-header {
    background: #002147 !important;
    color: #fff;
    border: #ffffff 1px solid;
}

.toast-body{
    background: #002147 !important;
    color: #fff;
    border: #ffffff 1px solid;
}

#modal-mobile-checking .modal-header,#modal-seat-checking .modal-header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: start;
    align-items: flex-start;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.75rem 0.75rem;
    border-bottom: 1px solid #e9ecef;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
}

#modal-mobile-checking .modal-footer,#modal-seat-checking .modal-footer {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: end;
    justify-content: flex-end;
    padding: 5px 10px;  
    border-bottom-right-radius: .3rem;
    border-bottom-left-radius: .3rem;
    border-top: 1px solid #ccc;
    background: #eee;
    padding: 0.5rem 1rem;
}

#modal-mobile-checking .btn,#modal-seat-checking .btn {
    padding: .175rem .75rem;
    background: #e0af14;
    color: #fff;
}
  
.newsletter_form select{
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    width: 100%;
}

.modal-footer button:hover{
  color: #ffffff;
  background: #000000;
}

.tab_menu {
  margin-top: 0px !important;
}

.section {
  background-color: #eeeeee;
}

.blog_img_popular {
  text-align: center;
}

.blog_img_popular img {
  width: auto;
}

.layout_padding_3 {
  padding-top: 18px;
  padding-bottom: 18px;
}

.hvr-radial-out {
  margin-top: 0px;
}

.mt-4,
.my-4 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.screen {
  width: 100%;
  height: 20px;
  background: #002147;
  color: #fff;
  line-height: 20px;
  font-size: 15px;
}

.smallBox::before {
  content: ".";
  width: 15px;
  height: 15px;
  float: left;
  margin-right: 10px;
  margin-top: 5px;
}
.greenBox::before {
  content: "";
  background: Green;
}
.redBox::before {
  content: "";
  background: Red;
}
.emptyBox::before {
  box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, 0.3),
    0px 1px 0px 0px rgba(255, 255, 255, 0.8);
  background-color: #ccc;
}

.seats {
  border: 1px solid red;
  background: yellow;
}

.seatsBlock {
  width: 100%;
}

.seatGap {
  width: 40px;
}

.seatVGap {
  height: 30px;
}

table {
  text-align: center;
}

.Displaytable {
  text-align: center;
}
.Displaytable td,
.Displaytable th {
  border: 1px solid;
  text-align: left;
}

textarea {
  border: none;
  background: transparent;
}

input[type="checkbox"] {
  width: 0px;
  margin-right: 18px;
}

input[type="checkbox"]{
    cursor: pointer;
}

input[type="checkbox"]:before {
  content: "";
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, 0.3),
    0px 1px 0px 0px rgba(255, 255, 255, 0.8);
  background-color: #ccc;
}

input[type="checkbox"]:checked:before {
  background-color: Green;
  font-size: 15px;
}

.red {
  background: red;
}

.green {
  background: green;
}

.normal {
  background: #ccc;
}

.newsletter_form select{
  margin-bottom: 0px;
}

</style>

<script>
import axios from "axios";
import TabBar from "@/components/pages/base/TabBar";
import Footer from "@/components/pages/base/Footer";
import About from "@/components/pages/base/About";
import CopyRight from "@/components/pages/base/CopyRight";

export default {
  layout: "coreLayout",
  components: {
    TabBar,
    Footer,
    CopyRight,
  },
     data(){   
      return{ 
        modal_text: "",
        form: {  
          zone_id:"",
          title:"",
          first_name:"",
          last_name:"",
          mobile:"",
          amount:0  
        }  
      }

  },
  mounted() {
  
    this.$nextTick(() => {
      $("#loading-modal").modal("show");
      setTimeout(() => $("#loading-modal").modal("hide"), 2000);
    });

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
              required: true
            },
            amount: {
              required: true,
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
              required: "กรุณากรอกชื่อ" 
            },
            last_name: {
              required: "กรุณากรอกนามสกุล" 
            },
            mobile: {
              required: "กรุณากรอกเบอร์โทรศัพท์" 
            },
            amount: {
              required: "กรุณาระบุจำนวนที่นั่ง",
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
  asyncData(context) {
    // return axios.get("https://service.candlesfest.com/api/place/find/group_id/"+context.params.id+"/13.744950999999999/100.5622064")
    // .then(res=>{
    //     return {
    //         placeList:res.data.place_list
    //     }
    // })
    // .catch(e=>context.error(e));
  },
  computed: {
    placeGroupList() {
      var data = [];
      if (this.$store.getters.getAllPlaceGroup) {
        data = this.$store.getters.getAllPlaceGroup;
      }
      return data;
    },
    zoneList(){
      var data = [];
      if(this.$store.getters.getAllZone){
        data = this.$store.getters.getAllZone;
      }
      return data;   
    }
  },
  methods:{
    onSubmitReserve(evt){

        this.form.status = "P";
        const reserve = this.form;  
         

        const seat = $() 
          if($("#reserveForm").valid()){
            debugger;
            //const empty_seat = $("#empty_seat-zone-"+reserve.zone_id).val();
            const empty_seat = document.getElementById("empty_seat-zone-"+reserve.zone_id).value;
            const amount_selected = reserve.amount?parseInt(reserve.amount):0;
            const empty_seat_selected = empty_seat?parseInt(empty_seat):0;    
            debugger;
            if(reserve.amount<=0 || !reserve.amount){
              $("#modal-seat-checking").modal("show"); 
            }else if(amount_selected>empty_seat_selected){
              toastr.error('ที่นั่งไม่พอสำหรับการจอง กรุณาตรวจสอบจำนวนที่นั่งที่ต้องการจองใหม่อีกครั้ง');
            }else{

                $('#loading-modal').modal('show'); 

                  this.$store.dispatch("addReserve", reserve)
                  .then(()=>{
                    setTimeout(() => {  
                      $('#loading-modal').modal('hide'); 
                      toastr.success('ดำเนินการจองเรียบร้อยเเล้ว รอเจ้าหน้าที่ติดต่อกลับ');
                      this.form.zone_id="";
                      this.form.title=""; 
                      this.form.first_name=""; 
                      this.form.last_name="";
                      this.form.mobile="";
                      this.form.amount=0; 
                    }, 1500); 
                  })
                  .catch(error => {  
                    setTimeout(() => { 
                      $('#loading-modal').modal('hide'); 
                      toastr.error('ไม่สามารถดำเนินการจองได้ กรุณาติดต่อเจ้าหน้าที่');
                    }, 1500);  
                  });
                }
            }else{ 
                console.log("validate is failed");  
            }  
 
    },
    onSubmitCheckReserve(evt){
      const mobile = $("#checkReserveForm #mobile_checking").val();
      if(!mobile){
        $("#modal-mobile-checking").modal("show"); 
      }else{
        $('#loading-modal').modal('show');  
        this.$store.dispatch("checkReserve", mobile)
        .then(()=>{
          setTimeout(() => {  
            $('#loading-modal').modal('hide');  
          }, 1500); 
        })
        .catch(error => {  
          setTimeout(() => { 
            $('#loading-modal').modal('hide'); 
          }, 1500);  
        });
      }

    }
  }
};
</script>