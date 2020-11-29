<template>
  <!-- Main Sidebar Container -->
  <aside
    class="main-sidebar sidebar-light-cyan elevation-4">

    <!-- Sidebar -->
    <div class="sidebar"> 
      <!-- Brand Logo -->
      <a href="/admin/news" class="brand-link">
        <img
          src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: .8"
        >
        <span class="brand-text font-weight-light">ผู้ดูเเลระบบ</span>
      </a>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
          >
          <li class="nav-item">
            <nuxt-link to="/admin/news" class="nav-link">
              <i class="nav-icon far fa-list-alt" />
              <p>
                ข่าวสาร
              </p>
            </nuxt-link>
          </li>
            <li class="nav-item">
            <nuxt-link to="/admin/placeGroup" class="nav-link">
              <i class="nav-icon fas fa-object-group" />
              <p>
                กลุ่มสถานที่
              </p>
            </nuxt-link>
            </li>
            <li class="nav-item">
            <nuxt-link to="/admin/place" class="nav-link">
              <i class="nav-icon far fa-paper-plane" />
              <p>
                สถานที่
              </p>
            </nuxt-link>
            </li>
            <li class="nav-item">
            <nuxt-link to="/admin/zone" class="nav-link">
              <i class="nav-icon fas fa-th" />
              <p>
                โซน
              </p>
            </nuxt-link>
            </li>
            <li class="nav-item">
            <nuxt-link to="/admin/reserve" class="nav-link">
              <i class="nav-icon fas fa-marker" />
              <p>
                รายการจอง
              </p>
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {

}
</script>

<style scoped>
  .nuxt-link-active{
    background-color: rgba(0,0,0,.1);
    color: #212529;
  }
  .nuxt-link-active p{ 
    font-weight: bold;
  }
</style>
