<template>
    <div> 
        <NewsPost :post="newsPost"/> 
    </div>
    
</template>
<script>
import NewsPost from '@/components/pages/news/NewsPost'
import axios from 'axios'
export default {
    layout:"coreLayout",
    components:{
        NewsPost
    },
    mounted(){
        this.$nextTick(() => { 
            $('#loading-modal').modal('show');
            setTimeout(() => $('#loading-modal').modal('hide'), 1500)
        })
    },
    asyncData(context){ 
        return axios.get("https://service.candlesfest.com/api/api/news/find/id/"+context.params.id)
        .then(res=>{    
            return {
                newsPost:res.data.news 
            }
        })
        .catch(e=>context.error(e));
    }
}
</script>