<template>
    <div class="inner_page">
        <!-- Start header -->
        <header class="top-header" style="margin-top: 50px;">
            <TabBar :placeGroupList="placeGroupList" />
        </header>  
        <div class="section">
            <div class="container">

                <div class="row">
                    <div class="col-md-12 mt-5">
                        <div class="full">
                            <div class="row">
                                <div class="heading_main text_align_left">
                                    <h2><span>ร้านอาหาร</span></h2>
                                </div>
                            </div> 
                        </div>
                    </div> 
                </div>

                <div v-if="placeList.length>0">
                    

                    <div v-for="(item, index) in placeList" :key="item.id" v-bind:index="index">
                        <div v-if="index < 100">  
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="full float-right_img mt-4">
                                            <img sizes="(min-width: 768px) 60vw, 95vw" class="img-responsive lazyload" :data-src="item.image[0]" :data-srcset="item.image[0].srcSet" @error="$event.target.src='/base/images/lazy.jpg'">
                                        </div>
                                    </div>
                                    <div class="col-md-8 layout_padding_3"> 
                                        <div class="heading_main text_align_left">
                                            <h4>{{ item.topic }}</h4>
                                        </div>
                                        <div class="full blog_img_popular mb-2">  
                                            <p style="text-align: left"><i class="fas fa-at" title="ที่อยู่"></i> {{ item.address }}</p>
                                            <p style="text-align: left">
                                                <i class="fas fa-map-marker-alt" title="ระยะทาง"></i> {{ item.distance }} {{ item.distance_unit }}
                                            </p>
                                            <p class="normal_form text-left"> 
                                                <a :href="`http://maps.google.com/maps?q=${item.latitude},${item.longtitude}`" target="_blank"><i class="fas fa-location-arrow"></i> เส้นทาง</a> 
                                                <!-- <a :href="`https://www.google.co.th/maps/search/${ item.topic}`" target="_blank"><i class="fas fa-location-arrow"></i> เส้นทาง</a>  -->
                                                <!-- <nuxt-link :to="{path: '/map/'+item.id, query: { latitude:item.latitude, longtitude:item.longtitude}}" target="_blank"><i class="fas fa-location-arrow"></i> เส้นทาง</nuxt-link>  -->
                                            </p>
                                            <p class="normal_form text-left">
                                                <nuxt-link :to="`/place/${item.id}`"><i class="fas fa-eye"></i> รายละเอียด</nuxt-link>
                                            </p> 
                                        </div> 
                                        
                                    </div>
                                </div> 
                        </div>
                    </div>

                </div>

                <div v-else>
                    <div class="row">
                        <div class="col-md-12" style="margin-bottom: 65px;">
                            <div class="full text-center mt-4 mb-4">
                                ไม่พบรายการ
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
    .tab_menu { 
        margin-top: 0px !important; 
    }

    .section{
        background-color: #eeeeee;
    }

    .blog_img_popular{
        text-align: center;
    }

    .blog_img_popular img{
        width: auto;
    }

    .layout_padding_3 {
        padding-top: 18px;
        padding-bottom: 18px;
    }

    .hvr-radial-out{
        margin-top: 0px;
    }

    .mt-4, .my-4 {
        margin-top: 1.5rem!important;
        margin-bottom: 1.5rem!important;
    }
 
</style>

<script>

import axios from 'axios'
import TabBar from "@/components/pages/base/TabBar";
import Footer from "@/components/pages/base/Footer";
import About from "@/components/pages/base/About";
import CopyRight from "@/components/pages/base/CopyRight"; 

export default {
    layout: "coreLayout",
    components:{
        TabBar,
        Footer, 
        CopyRight
    },
    mounted(){ 
        this.$nextTick(() => { 
            $('#loading-modal').modal('show');
            setTimeout(() => $('#loading-modal').modal('hide'), 1500)
        })
    }, 
    asyncData(context){
        return axios.get("https://service.candlesfest.com/api/api/place/find/group_id/"+context.params.id+"/13.744950999999999/100.5622064")
        .then(res=>{  
            return {
                placeList:res.data.place_list 
            }
        })
        .catch(e=>context.error(e));
    }, 
    computed: { 
        placeGroupList() { 
            var data = [];
            if (this.$store.getters.getAllPlaceGroup) {
                data = this.$store.getters.getAllPlaceGroup;
            }
            return data;
        }
    }
}
</script>