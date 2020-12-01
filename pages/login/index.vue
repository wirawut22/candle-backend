<template>
  <div class="hold-transition login-page"> 
    <div id="loading-login-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered justify-content-center" role="document">
            <span class="fas fa-cog fa-spin fa-3x"></span>
        </div>
    </div> 

    <div class="login-box">
      <!-- <div class="login-logo">
        <b>ผู้ดูเเลระบบ</b>
      </div> -->
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">ล็อกอินเพื่อจัดการข้อมูล</p>

          <form @submit="login"> 
            <div class="input-group mb-3">
              <label v-if="message=='invalid'" class="col-form-label" style="color:red;" for="inputError"><i class="far fa-times-circle"></i> ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง</label>
            </div>
            <div class="input-group mb-3">
              <input type="text" v-model="username" class="form-control" placeholder="ชื่อผู้ใช้งาน" />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" v-model="password" class="form-control" placeholder="รหัสผ่าน" />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label for="remember"> จดจำรหัสผ่าน </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-5">
                <button type="submit" class="btn btn-info btn-block">
                  <i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
 

          <p class="mb-1">
            <a href="forgot-password.html">ลืมรหัสผ่าน</a>
          </p> 
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </div>
</template>

<style scoped>
  #loading-login-modal .fa, #loading-login-modal .fas { 
    color: #ffffff;
  }
</style>


<script>
export default {
  layout: "coreLayout",
  data() {  
    debugger;
    return {
      message:"",
      username: '',
      password: '' 
    };
  }, 
  methods: {
    async login(e) { 
      e.preventDefault();

      $('#loading-modal').modal('show');  
      
      const payload = {
        username: this.username,
        password: this.password
      };
      try {
        await this.$auth.loginWith('local', {
          data: payload
        });
        $('#loading-modal').modal('hide') 
        this.message = 'valid';
        this.$router.push('/admin/news'); 
      } catch (e) { 
        $('#loading-modal').modal('hide')
        this.message = 'invalid';
        //this.$router.push('/login');
      }
    }
  }
};
</script>