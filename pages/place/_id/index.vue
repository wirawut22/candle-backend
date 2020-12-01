<template>
    <div> 
        <PlacePost :post="placePost"/> 
    </div>
    
</template>
<script>
import PlacePost from '@/components/pages/place/PlacePost'
import axios from 'axios'
export default {
    layout:"coreLayout",
    components:{
        PlacePost
    },
    asyncData(context){
        return axios.get("https://service.candlesfest.com/api/place/find/id/"+context.params.id+"/"+"13.744950999999999/100.5622064")
        .then(res=>{  
            return {
                placePost:res.data.place 
            }
        })
        .catch(e=>context.error(e));
    }
}
</script>