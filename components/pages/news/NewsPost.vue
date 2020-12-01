<template>
    <div class="inner_page">
        <!-- Start header -->
        <header class="top-header" style="margin-top: 50px;">
            <TabBar :placeGroupList="placeGroupList" /> 
        </header>
 
        <!-- section -->
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 layout_padding_2 mt-3">
                        <div class="full">
                            <div class="row">
                                <div class="heading_main text_align_left">
                                    <h2><span>{{newsPost.topic}}</span></h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12" id="other-detail"> 
                                    <i class="fas fa-user" title="ผู้เขียน"></i> ผู้เขียน : {{newsPost.author}} | 
                                    <i class="fas fa-calendar-alt" title="อัพเดทล่าสุด"></i> อัพเดทล่าสุด : {{newsPost.update_dttm | moment}}
                                </div>
                            </div>
                            <div class="row mt-3 mb-3">  
                                <div class="input-group" v-if="newsPost">  
                                        <div class="col-12 text-center">
                                            <img v-if="!imageActive && newsPost.image.length==0" src="/base/images/lazy.jpg" class="product-image" max-height="500"/>
                                            <img v-if="!imageActive && newsPost.image.length>0" :src="newsPost.image[0]" class="product-image" max-height="500"/>
                                            <img v-if="imageActive" :src="imageActive" class="product-image" max-height="500"/>
                                        </div>
                                        <div class="col-12 product-image-thumbs"  >
                                            <div v-for="item in newsPost.image" :key="item" v-bind:index="index" class="product-image-thumb" v-on:click="setActiveImage(item)">
                                                <img :data-src="item" :data-srcset="item" class="img-responsive lazyload" @error="$event.target.src='/base/images/lazy.jpg'">
                                            </div> 
                                        </div>   
                                </div> 
                            </div>
                            <div class="row">
                                <div class="full view">
                                    <div v-html="newsPost.description1"></div>
                                </div> 
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <!-- end section -->
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
import moment from "moment";
import Slider from "@/components/pages/base/Slider";
import TabBar from "@/components/pages/base/TabBar";
import Footer from "@/components/pages/base/Footer";
import About from "@/components/pages/base/About";
import CopyRight from "@/components/pages/base/CopyRight"; 
import axios from 'axios' 

export default {
    layout: "coreLayout",
    components: {
        Slider,
        TabBar,
        Footer,
        About,
    CopyRight,
    }, 
    mounted(){
        this.$nextTick(() => { 
            $('#loading-modal').modal('show');
            setTimeout(() => $('#loading-modal').modal('hide'), 1500)
        })
    },
    
    data(){
        return {
            imageActive: "",
            newsActive:'active',
            newsPost:{...this.post}
        }
    },
    methods:{
        moment: function () {
            return moment();
        },
        setActiveImage(item){ 
            this.imageActive = item; 
        },
    },
    props:{
        post:{
            type:Object,
            required:false
        }
    },
    computed:{
        placeGroupList(){ 
            var data = [];
            if(this.$store.getters.getAllPlaceGroup){
                data = this.$store.getters.getAllPlaceGroup;
            }
            return data;   
        }
    },
    filters: {
        moment: function (date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
    } 
}
</script>