<template>
  <div id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">
    <!-- <div id="preloader" :class="[loadingClass]">
      <div class="loader">
        <img src="/base/images/loader.gif" alt="#" />
      </div>
    </div> -->
    <!-- end loader -->
    <!-- END LOADER -->

    <!-- Start header -->
    <header class="top-header"></header>
    <!-- End header -->
    <Slider /> 
    <TabBar :placeGroupList="placeGroupList" />

    <!-- section -->
    <div v-for="(item, index) in newsList" :key="item.id" v-bind:index="index">
      <!--เเสดง 5 รายการเท่านั้น-->
      <div v-if="index < 5">
        <div v-if="index % 2 == 0" class="section margin-top_50 silver_bg">
          <div class="container">
            <div class="row">
              <div class="col-md-6 mt-2 mb-2">
                <div class="full float-right_img mt-4">
                   <img sizes="(min-width: 768px) 60vw, 95vw" class="img-responsive lazyload" :data-src="item.image[0]" :data-srcset="item.image[0].srcSet" @error="$event.target.src='/base/images/lazy.jpg'">
                </div>
              </div>
              <div class="col-md-6 mt-2 mb-2 layout_padding_2">
                <div class="full">
                  <div class="heading_main text_align_left">
                    <h2>{{ item.topic }}</h2>
                  </div>
                  <div class="full">
                    <p>
                      {{
                        item.description2.length > 300
                          ? item.description2.slice(0, 300) + "..."
                          : item.description2
                      }}
                    </p>
                  </div>
                  <div class="full normal_form">
                    <a :href="`/news/${item.id}`" target="_blank"><i class="fas fa-eye"></i> อ่านเพิ่มเติม</a>  
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="section margin-top_50">
          <div class="container">
            <div class="row">
              <div class="col-md-6 mt-2 mb-2">
                <div class="full">
                  <div class="heading_main text_align_left">
                    <h2>{{ item.topic }}</h2>
                  </div>
                  <div class="full">
                    <p>
                      {{
                        item.description2.length > 300
                          ? item.description2.slice(0, 300) + "..."
                          : item.description2
                      }}
                    </p>
                  </div>
                  <div class="full normal_form">
                    <a :href="`/news/${item.id}`"><i class="fas fa-eye"></i> อ่านเพิ่มเติม</a>  
                  </div>
                </div>
              </div>
              <div class="col-md-6 mt-2 mb-2">
                <div class="full">
                   <img sizes="(min-width: 768px) 60vw, 95vw" class="img-responsive lazyload" :data-src="item.image[0]" :data-srcset="item.image[0].srcSet" @error="$event.target.src='/base/images/lazy.jpg'" > 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end section -->
 
    <div class="section layout_padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="full">
              <div class="heading_main text_align_center">
                <h2><span>สถานที่ </span>เเนะนำ</h2>
              </div>
            </div>
          </div>
          <div
            class="col-md-3"
            v-for="(item, index) in placeOrderList"
            :key="item.id"
            v-bind:index="index"
          >
            <div class="full blog_img_popular mb-5" v-if="index < 12">
              <!--เเสดงไม่เกิน 12 รายการ--> 
              <img id="place-advice" sizes="(min-width: 768px) 60vw, 95vw" class="img-responsive lazyload" :data-src="item.image[0]" :data-srcset="item.image[0].srcSet" @error="$event.target.src='/base/images/lazy.jpg'">
              <h4><nuxt-link :to="`/place/${item.id}`">{{ item.topic.length > 30 ? item.topic.slice(0, 30) + "..." : item.topic }}</nuxt-link></h4>
              <p style="text-align: left"><i class="fas fa-at" title="ที่อยู่"></i> {{ item.address }}</p>
              <p style="text-align: left">
                <i class="fas fa-map-marker-alt" title="ระยะทาง"></i> {{ item.distance }} {{ item.distance_unit }}
              </p>
              <p class="normal_form text-left">
                <a :href="`http://maps.google.com/maps?q=${item.latitude},${item.longtitude}`" target="_blank"><i class="fas fa-location-arrow"></i> เส้นทาง</a> 
                <!-- <a :href="`https://www.google.co.th/maps/search/${ item.topic}`" target="_blank"><i class="fas fa-location-arrow"></i> เส้นทาง</a>  -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <About />
    <Footer />
    <CopyRight />
  </div>
</template>

<style scoped>
    .tab_menu { 
        margin-top: 50px !important; 
    }

    .blog_img_popular h4 a{
      color:#095a83;
    }

    .blog_img_popular h4 a:hover{
      color:#095ABB;
    } 

    #place-advice{
      max-height: 180px;
    }
 
</style>

<script>
import Slider from "@/components/pages/base/Slider";
import TabBar from "@/components/pages/base/TabBar";
import Footer from "@/components/pages/base/Footer";
import About from "@/components/pages/base/About";
import CopyRight from "@/components/pages/base/CopyRight";
import axios from "axios";

export default {
  layout: "coreLayout",
  components: {
    Slider,
    TabBar,
    Footer,
    About,
    CopyRight,
  }, 
  data(){  
  }, 
  asyncData(context) {
    //context.store.dispatch('initPlace');
    //context.store.dispatch('initPlaceGroup'); 
  },
  computed: {
    newsList() {
      var data = [];
      if (this.$store.getters.getAllNews) {
        data = this.$store.getters.getAllNews;
      }
      return data;
    },
    placeOrderList() {
      var data = [];
      if (this.$store.getters.getAllPlaceOrder) {
        data = this.$store.getters.getAllPlaceOrder;
      }
      return data;
    },
    placeGroupList() { 
      var data = [];
      if (this.$store.getters.getAllPlaceGroup) {
        data = this.$store.getters.getAllPlaceGroup;
      }
      return data;
    }
  },  
  mounted() {   

    this.$nextTick(() => {
      $('#loading-modal').modal('show');
      setTimeout(() => $('#loading-modal').modal('hide'), 1500)
    })

    //init slider
    $("#js-main-slider")
      .pogoSlider({
        autoplay: true,
        autoplayTimeout: 5000,
        displayProgess: true,
        preserveTargetSize: true,
        targetWidth: 1000,
        targetHeight: 300,
        responsive: true,
      })
      .data("plugin_pogoSlider");
 
  } 
};
</script>
 
  
