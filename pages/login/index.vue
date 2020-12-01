<template>
  <div class="hold-transition login-page"> 
    <div class="login-box">
      <div class="login-logo">
        <a href="../../index2.html"><b>ผู้ดูเเลระบบ</b></a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">ล็อกอินเพื่อจัดการข้อมูล</p>

          <form @submit="login"> 
            <div class="input-group mb-3">
              <label v-if="!this.$auth.loggedIn && initial" class="col-form-label" style="color:red;" for="inputError"><i class="far fa-times-circle"></i> ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง</label>
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
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label for="remember"> จดจำรหัสผ่าน </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">
                  เข้าสู่ระบบ
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


<script>
export default {
  data() {
    debugger;
    const parameters = this.$route.query;
    return {
      err_message:parameters?parameters.error_message:"",
      username: '',
      password: '',
      initial:false
    };
  },
  methods: {
    async login(e) { 
      e.preventDefault();
      this.initial = true;
      const payload = {
        username: this.username,
        password: this.password
      };
      try {
        await this.$auth.loginWith('local', {
          data: payload
        });
        this.$router.push('/admin/news');
      } catch (e) { 
        this.$router.push('/login');
      }
    }
  }
};
</script>