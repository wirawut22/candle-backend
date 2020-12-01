<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="pushmenu"
          href="#"
        ><i class="fas fa-bars" /></a>
      </li> 
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
          <i class="far fa-user"></i> {{user?user.name:""}}
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="left: inherit; right: 0px;">
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media"> 
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  ผู้ใช้งาน : {{user?user.name:""}}
                  <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">อีเมล์ : {{user?user.email:""}}</p> 
              </div>
            </div>
            <!-- Message End -->
          </a> 
          <div class="dropdown-divider"></div> 
        </div>
      </li> 
      <li class="nav-item"> 
        <a class="nav-link" @click="logout"> 
          <i class="fas fa-sign-out-alt" title="ออกจากระบบ"/>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<style scoped>
  .nav-link{
    cursor:pointer;
  }
</style>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login');
    }
  }
};
</script>
