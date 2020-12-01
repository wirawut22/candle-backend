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
                                    <h2><span>ข่าวสาร</span></h2>
                                </div>
                            </div> 
                        </div>
                    </div> 
                </div>

                <div v-for="(item, index) in newsList" :key="item.id" v-bind:index="index">
                    <div v-if="index < 100">  
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="full float-right_img mt-4">
                                    <img class="img-responsive lazyload" :data-src="item.image[0]" :data-srcset="item.image[0].srcSet">
                                    </div>
                                </div>
                                <div class="col-md-8 layout_padding_3">
                                    <div class="full">
                                    <div class="heading_main text_align_left">
                                        <h4>{{ item.topic }}</h4>
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
                                    <div class="full"> 
                                            <p class="normal_form text-left">
                                                <nuxt-link :to="`/news/${item.id}`"><i class="fas fa-eye"></i> รายละเอียด</nuxt-link>
                                            </p> 
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
    computed: {
        newsList() {
            var data = [];
            if (this.$store.getters.getAllNews) {
                data = this.$store.getters.getAllNews;
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
    }
}
</script>