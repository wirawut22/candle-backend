<template>
	<div class="section tabbar_menu">
	   <div class="container">
	      <div class="row">
		      <div class="col-md-12" style="padding:0px;">
			     <div class="tab_menu">
				    <ul> 
					   <li class="tab active" id="tab-home" @click="activeTab('tab-home')"><nuxt-link to="/"><span class="icon"><i class="fas fa-home"></i></span>หน้าเเรก</nuxt-link></li>
					   <li class="tab" id="tab-news" @click="activeTab('tab-news')"><nuxt-link to="/news"><span class="icon"><i class="far fa-newspaper"></i></span>ข่าวสาร</nuxt-link></li>
					   <li class="tab" id="tab-reserve" style="margin-right: -5px;" @click="activeTab('tab-reserve')"><nuxt-link to="/reserve"><span class="icon"><i class="fas fa-book-open"></i></span>จองที่นั่ง</nuxt-link></li>
                       <li class="tab" :id="`tab-${item.id}`" style="margin-left: 5px;" @click="activeTab(`tab-${item.id}`)" v-for="(item, index) in placeGroupList" :key="item.id" v-bind:index="index">
						   <nuxt-link :to="`${item.context_path}/${item.id}`"  class="nav-link">
						   	<span class="icon">
								<i :class="item.icon"></i>
							</span>
							{{item.topic}}
						   </nuxt-link>
						</li> 
                    </ul>
				 </div>
			  </div>
		  </div>
	   </div>
	</div>
</template>

<style scoped>
	.tab_menu ul{
		text-align: center;
	}

	.tab_menu ul li {
		display: inline-grid;
		width: 120px;
		float: none;
		padding: 15px 5px; 
		justify-content: center;
		cursor: pointer;
	}

	.tab_menu ul li.active {
		display: inline-grid;
		width: 120px;
		float: none;
		padding: 15px 0; 
		justify-content: center;
		background: #002147; 
		border-radius: 8px;
	}

	.tab_menu ul li:hover, .tab_menu ul li:focus {
		display: inline-grid;
		width: 120px;
		float: none;
		padding: 15px 0; 
		justify-content: center;
		background: #002147; 
		border-radius: 8px;
		color: #ffffff !important;
		cursor: pointer;
	}

	.tab_menu ul li a:hover{
		color: #ffffff !important;
	}

	.tab_menu ul li.active a { 
		color:#ffffff !important;
	}

	.tab_menu ul {
		width: 950px;
		margin: auto;
		padding: 10px;
	}

	.nav-link{
		padding:0px !important;
	}

	.tabbar_menu .container .row div{
        background-color: #fff !important;
	} 


</style>

<script>
export default {
	mounted(){ 
		const getter = this.$store.getters; 
		const activeTab = getter.getTabActive;
		$(".tab_menu ul li").removeClass("active");
		$(".tab_menu ul li#"+activeTab).addClass("active"); 
	},
	props:{ 
      placeGroupList:{
          type:Array,
          required:false
      }
	},
	methods:{
		activeTab(tab){ 
			this.$store.dispatch("activeTab", tab)
		}
	}
}
</script>


