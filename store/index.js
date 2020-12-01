import Vuex from "vuex"
import axios from "axios"

const createStore=()=>{
    return new Vuex.Store({
        state:{
            //ข้อมูล
            newsData:[],
            placeData:[],
            placeGroupData:[],
            zoneData:[],
            reserveData:[],
            reserveCheckingData:[],
            activeTab:'tab-home'
            //showModal: false
        },
        mutations:{
            //จัดการข้อมูลใน state 
            // toggleModal (state) { 
            //     state.showModal = !state.showModal
            // },
            setActiveTabState(state,activeTab){
                debugger;
                state.activeTab=activeTab;
            },
            setNewsState(state,news){  
                state.newsData=news;
            },
            addNewsState(state,createNews){  
                state.newsData.push(createNews);
            },
            editNewsState(state,editNews){  
                const newsIndex = state.newsData.findIndex(
                    news=>news.id === parseInt(editNews.id)
                ); 
                console.log("newsIndex = "+ newsIndex);
                state.newsData[newsIndex]=editNews
            },
            deleteNewsState(state, id){    
                console.log("06");
                const newsIndex=state.newsData.findIndex(
                    news=>news.id === parseInt(id)
                ); 
                console.log("newsIndex = "+ newsIndex);
                state.newsData.splice(newsIndex, 1);
            }, 
            setZoneState(state,zone){   
                state.zoneData=zone;
            },
            addZoneState(state,createZone){  
                state.zoneData.push(createZone);
            },
            editZoneState(state,editZone){   
                const zoneIndex = state.zoneData.findIndex(
                    zone=>zone.id === parseInt(editZone.id)
                );  
                console.log("zoneIndex = "+ zoneIndex);
                state.zoneData[zoneIndex]=editZone
            },
            deleteZoneState(state, id){   
                const zoneIndex=state.zoneData.findIndex(
                    zone=>zone.id === parseInt(id)
                ); 
                console.log("zoneIndex = "+ zoneIndex);
                state.zoneData.splice(zoneIndex, 1);
            },
            setPlaceGroupState(state,placeGroup){  
                state.placeGroupData=placeGroup;
            },
            addPlaceGroupState(state,createPlaceGroup){  
                state.placeGroupData.push(createPlaceGroup);
            },
            editPlaceGroupState(state,editPlaceGroup){  
                const placeGroupIndex = state.placeGroupData.findIndex(
                    placeGroup=>placeGroup.id === parseInt(editPlaceGroup.id)
                ); 
                console.log("placeGroupIndex = "+ placeGroupIndex);
                state.placeGroupData[placeGroupIndex]=editPlaceGroup
            },
            deletePlaceGroupState(state, id){   
                const placeGroupIndex=state.placeGroupData.findIndex(
                    placeGroup=>placeGroup.id === parseInt(id)
                ); 
                console.log("placeGroupIndex = "+ placeGroupIndex);
                state.placeGroupData.splice(placeGroupIndex, 1);
            },
            setPlaceState(state,place){  
                state.placeData=place;
            },
            setPlaceOrderState(state,placeOrder){  
                state.placeOrderData=placeOrder;
            }, 
            addPlaceState(state,createPlace){  
                state.placeData.push(createPlace);
            },
            editPlaceState(state,editPlace){  
                const placeIndex = state.placeData.findIndex(
                    place=>place.id === parseInt(editPlace.id)
                ); 
                console.log("placeIndex = "+ placeIndex);
                state.placeData[placeIndex]=editPlace
            },
            deletePlaceState(state, id){    
                const placeIndex=state.placeData.findIndex(
                    place=>place.id === parseInt(id)
                ); 
                console.log("placeIndex = "+ placeIndex);
                state.placeData.splice(placeIndex, 1);
            },
            setReserveState(state,reserve){   
                state.reserveData=reserve;
            },
            checkReserveState(state,reserve){   
                debugger;
                state.reserveCheckingData=reserve;
            }, 
            addReserveState(state,createReserve){  
                debugger;
                state.reserveData.push(createReserve);
            },
            editReserveState(state,editReserve){ 
                const reserveIndex = state.reserveData.findIndex(
                    reserve=>reserve.id === parseInt(editReserve.id)
                ); 
                console.log("reserveIndex = "+ reserveIndex);
                state.reserveData[reserveIndex]=editReserve
            },
            deleteReserveState(state, id){   
                const reserveIndex=state.reserveData.findIndex(
                    reserve=>reserve.id === parseInt(id)
                ); 
                console.log("reserveIndex = "+ reserveIndex);
                state.reserveData.splice(reserveIndex, 1);
            }
        },
        actions:{
            //ทำงานร่วมกับ backend เรียกใช้ผ่าน component
            async nuxtServerInit(vuexContext){  
                await vuexContext.dispatch('initNews');
                await vuexContext.dispatch('initPlaceOrder');
                await vuexContext.dispatch('initPlaceGroup');
                await vuexContext.dispatch('initZone'); 
            },
            async activeTab(vuexContext,tab){
                debugger;
                vuexContext.commit("setActiveTabState", tab);
            },
            async initNews(vuexContext){   
                return axios
                .get("https://service.candlesfest.com/api/news/find/all")
                .then(res=>{    
                    vuexContext.commit("setNewsState", res.data.news_list);
                }).catch(e=>context.error(e));
            },
            async addNews(vuexContext,news){
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch   
                const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
                const createNews={...news} 
                var fullPathStr = "";//อาจจะเก็บเป็น filename หรือ fullpath จริงๆ        
                let formData = new FormData();  
                formData.append('topic', createNews.topic); 
                formData.append('description1', createNews.description1); 
                formData.append('description2', createNews.description2); 
                //formData.append('image', createNews.image); 
                formData.append('author', createNews.author); 

                for( var index = 0; index < createNews.image.length; index++ ){ 
                    formData.append('images[' + index + ']', createNews.image[index]);//ส่งไฟล์ไป
                    if(index==0){
                        fullPathStr = "https://service.candlesfest.com/api/news/"+createNews.image[index].name;
                    }else{
                        fullPathStr = fullPathStr + "," + "https://service.candlesfest.com/api/news/" +createNews.image[index].name;//สร้าง path ขึ้นมาไว้ set state
                    }
                }  

                createNews.image = fullPathStr; 
                return await axios.post("https://service.candlesfest.com/api/news/create", 
                formData, headers
                ).then(res=>{   
                    //setTimeout(() => {
                        //$('#loading-modal').modal('hide');
                        const data = res.data;
                        if(data){ 
                            if(res.data.status_code==200){ 
                                //toastr.info('บันทึกข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("addNewsState",{...createNews,id:res.data.news.id});
                            }else{ 
                                //toastr.error('ไม่สามารถบันทึกข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => { 
                    console.log('error ' , error);
                });
            },
            async editNews(vuexContext,news){ 
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch 
                const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
                const editNews={...news}  
                var fullPathStr = "";//อาจจะเก็บเป็น filename หรือ fullpath จริงๆ        
                let formData = new FormData();
                formData.append('topic', editNews.topic);
                formData.append('description1', editNews.description1); 
                formData.append('description2', editNews.description2); 
                //formData.append('image', createNews.image);
                formData.append('author', editNews.author);  
                for(var index = 0; index < editNews.image.length; index++){ 
                    formData.append('images[' + index + ']', editNews.image[index]);//ส่งไฟล์ไป
                    if(index==0){
                        fullPathStr = "https://service.candlesfest.com/api/news/"+editNews.image[index].name;
                    }else{
                        fullPathStr = fullPathStr + "," + "https://service.candlesfest.com/api/news/" +editNews.image[index].name;//สร้าง path ขึ้นมาไว้ set state
                    }
                }   

                if(fullPathStr && editNews.newImage){
                    editNews.image = editNews.newImage+","+fullPathStr;
                }else if(fullPathStr && !editNews.newImage){
                    editNews.image = fullPathStr;
                }else if(!fullPathStr && editNews.newImage){
                    editNews.image = editNews.newImage;
                }else{
                    editNews.image = "";
                } 

                formData.append('newImage', editNews.image); 
                return await axios.put("https://service.candlesfest.com/api/news/update/"+editNews.id, 
                formData, headers
                ).then(res=>{ 
                    //setTimeout(() => {
                        //$('#loading-modal').modal('hide');
                        const data = res.data; 
                        if(data){ 
                            if(res.data.status_code==200){ 
                                //toastr.info('แก้ไขข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("editNewsState",{...data.news});
                            }else{ 
                                //toastr.error('ไม่สามารถแก้ไขข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async deleteNews(vuexContext,id){
                console.log("03");
                return await axios.delete("https://service.candlesfest.com/api/news/delete/"+id
                ).then(res=>{
                    console.log("04");
                    //setTimeout(() => {   
                        console.log("id = "+res.data.id);
                        if(res.data.status_code==200){  
                            //$('#loading-modal').modal('hide'); 
                            //toastr.info('ลบข้อมูลเรียบร้อยเเล้ว');
                            vuexContext.commit("deleteNewsState",res.data.id);
                        }else{ 
                            //$('#loading-modal').modal('hide'); 
                            //toastr.error('ไม่สามารถลบข้อมูลได้');
                            console.log(res.data.message); 
                        }
                    //}, 1000);

                })
                .catch(error => {
                    console.log("05");
                    console.log('error ' , error);
                });
            }, 
            async initZone(vuexContext){ 
                return axios
                .get("https://service.candlesfest.com/api/zone/find/all/active") 
                .then(res=>{  
                    vuexContext.commit("setZoneState", res.data.zone_list);
                }).catch(e=>context.error(e));
            },
            async addZone(vuexContext,zone){
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch  
                const createZone={...zone} 
                var fullPathStr = "";//อาจจะเก็บเป็น filename หรือ fullpath จริงๆ   
                return await axios.post("https://service.candlesfest.com/api/zone/create", 
                createZone
                ).then(res=>{  
                    //setTimeout(() => { 
                        //$('#loading-modal').modal('hide');
                        const data = res.data;
                        if(data){ 
                            if(res.data.status_code==200){ 
                                //toastr.info('บันทึกข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("addZoneState",{...createZone,id:res.data.zone.id});
                            }else{ 
                                //toastr.error('ไม่สามารถบันทึกข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async editZone(vuexContext,zone){
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch  
                const editZone={...zone}     
                return await axios.put("https://service.candlesfest.com/api/zone/update/"+editZone.id, 
                editZone
                ).then(res=>{ 
                    //setTimeout(() => {
                        //$('#loading-modal').modal('hide'); 
                        const data = res.data;  
                        if(data){  
                            if(res.data.status_code==200){ 
                                //info('แก้ไขข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("editZoneState",{...data.zone});
                            }else{ 
                                //toastr.error('ไม่สามารถแก้ไขข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async deleteZone(vuexContext,id){  
                return await axios.delete("https://service.candlesfest.com/api/zone/delete/"+id
                ).then(res=>{
                    //setTimeout(() => {   
                        console.log("id = "+res.data.id);
                        if(res.data.status_code==200){  
                            //$('#loading-modal').modal('hide'); 
                            //toastr.info('ลบข้อมูลเรียบร้อยเเล้ว');
                            vuexContext.commit("deleteZoneState",res.data.id);
                        }else{ 
                            //$('#loading-modal').modal('hide'); 
                            //toastr.error('ไม่สามารถลบข้อมูลได้');
                            console.log(res.data.message); 
                        }
                    //}, 1000);

                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async initPlaceGroup(vuexContext){ 
                return axios
                .get("https://service.candlesfest.com/api/placeGroup/find/all")
                .then(res=>{  
                    vuexContext.commit("setPlaceGroupState", res.data.place_group_list);
                }).catch(e=>context.error(e));
            },
            async addPlaceGroup(vuexContext,placeGroup){
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch  
                const createPlaceGroup={...placeGroup} 
                var fullPathStr = "";//อาจจะเก็บเป็น filename หรือ fullpath จริงๆ   
                return await axios.post("https://service.candlesfest.com/api/placeGroup/create", 
                createPlaceGroup
                ).then(res=>{  
                    //setTimeout(() => { 
                        //$('#loading-modal').modal('hide');
                        const data = res.data;
                        if(data){ 
                            if(res.data.status_code==200){ 
                                //toastr.info('บันทึกข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("addPlaceGroupState",{...createPlaceGroup,id:res.data.place_group.id});
                            }else{ 
                                //toastr.error('ไม่สามารถบันทึกข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async editPlaceGroup(vuexContext,placeGroup){ 
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch  
                const editPlaceGroup={...placeGroup}     
                return await axios.put("https://service.candlesfest.com/api/placeGroup/update/"+editPlaceGroup.id, 
                editPlaceGroup
                ).then(res=>{ 
                    //setTimeout(() => {
                        //$('#loading-modal').modal('hide'); 
                        const data = res.data;  
                        if(data){ 
                            if(res.data.status_code==200){ 
                                //toastr.info('แก้ไขข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("editPlaceGroupState",{...data.place_group});
                            }else{ 
                                //toastr.error('ไม่สามารถแก้ไขข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async deletePlaceGroup(vuexContext,id){ 
                return await axios.delete("https://service.candlesfest.com/api/placeGroup/delete/"+id
                ).then(res=>{
                    //setTimeout(() => {   
                        console.log("id = "+res.data.id);
                        if(res.data.status_code==200){  
                            //$('#loading-modal').modal('hide'); 
                            //toastr.info('ลบข้อมูลเรียบร้อยเเล้ว');
                            vuexContext.commit("deletePlaceGroupState",res.data.id);
                        }else{ 
                            //$('#loading-modal').modal('hide'); 
                            //toastr.error('ไม่สามารถลบข้อมูลได้');
                            console.log(res.data.message); 
                        }
                    //}, 1000);

                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async initPlace(vuexContext){    
                return axios
                .get("https://service.candlesfest.com/api/place/find/all")
                .then(res=>{    
                    vuexContext.commit("setPlaceState", res.data.place_list);
                }).catch(e=>context.error(e));
            },
            async initPlaceOrder(vuexContext){   
                return axios
                .get("https://service.candlesfest.com/api/place/find/all/13.744950999999999/100.5622064")
                .then(res=>{    
                    vuexContext.commit("setPlaceOrderState", res.data.place_list);
                }).catch(e=>context.error(e));
            },
            async addPlace(vuexContext,place){
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch  
                const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
                const createPlace={...place} 
                var fullPathStr = "";//อาจจะเก็บเป็น filename หรือ fullpath จริงๆ        
                let formData = new FormData();  
                formData.append('group_id', createPlace.group_id); 
                formData.append('topic', createPlace.topic); 
                formData.append('address', createPlace.address); 
                formData.append('description1', createPlace.description1); 
                formData.append('description2', createPlace.description2); 
                formData.append('latitude', createPlace.latitude); 
                formData.append('longtitude', createPlace.longtitude); 
                //formData.append('image', createPlace.image); 
                formData.append('author', createPlace.author); 

                for( var index = 0; index < createPlace.image.length; index++ ){ 
                    formData.append('images[' + index + ']', createPlace.image[index]);//ส่งไฟล์ไป
                    if(index==0){
                        fullPathStr = "https://service.candlesfest.com/api/place/"+createPlace.image[index].name;
                    }else{
                        fullPathStr = fullPathStr + "," + "https://service.candlesfest.com/api/place/" +createPlace.image[index].name;//สร้าง path ขึ้นมาไว้ set state
                    }
                }  

                createPlace.image = fullPathStr; 
                return await axios.post("https://service.candlesfest.com/api/place/create", 
                formData, headers
                ).then(res=>{  
                    //setTimeout(() => {
                        //$('#loading-modal').modal('hide');
                        const data = res.data;
                        if(data){  
                            if(res.data.status_code==200){ 
                                //toastr.info('บันทึกข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("addPlaceState",res.data.place);
                            }else{ 
                                //toastr.error('ไม่สามารถบันทึกข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async editPlace(vuexContext,place){ 
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch 
                const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
                const editPlace={...place}  
                var fullPathStr = "";//อาจจะเก็บเป็น filename หรือ fullpath จริงๆ        
                let formData = new FormData();
                formData.append('group_id', editPlace.group_id); 
                formData.append('topic', editPlace.topic);
                formData.append('address', editPlace.address);
                formData.append('description1', editPlace.description1); 
                formData.append('description2', editPlace.description2); 
                formData.append('latitude', editPlace.latitude); 
                formData.append('longtitude', editPlace.longtitude); 
                //formData.append('image', editPlace.image);
                formData.append('author', editPlace.author); 

                for(var index = 0; index < editPlace.image.length; index++){ 
                    formData.append('images[' + index + ']', editPlace.image[index]);//ส่งไฟล์ไป
                    if(index==0){
                        fullPathStr = "https://service.candlesfest.com/api/place/"+editPlace.image[index].name;
                    }else{
                        fullPathStr = fullPathStr + "," + "https://service.candlesfest.com/api/place/" +editPlace.image[index].name;//สร้าง path ขึ้นมาไว้ set state
                    }
                }  
         
                if(fullPathStr && editPlace.newImage){
                    editPlace.image = editPlace.newImage+","+fullPathStr;
                }else if(fullPathStr && !editPlace.newImage){
                    editPlace.image = fullPathStr;
                }else if(!fullPathStr && editPlace.newImage){
                    editPlace.image = editPlace.newImage;
                }else{
                    editPlace.image = "";
                } 
                formData.append('newImage', editPlace.image);
                    
                return await axios.put("https://service.candlesfest.com/api/place/update/"+editPlace.id, 
                formData, headers
                ).then(res=>{ 
                    //setTimeout(() => {
                        //$('#loading-modal').modal('hide'); 
                        const data = res.data; 
                        if(data){ 
                            if(res.data.status_code==200){  
                                //toastr.info('แก้ไขข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("editPlaceState",{...data.place});
                            }else{ 
                                //toastr.error('ไม่สามารถแก้ไขข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async deletePlace(vuexContext,id){
                return await axios.delete("https://service.candlesfest.com/api/place/delete/"+id
                ).then(res=>{
                    //setTimeout(() => {   
                        console.log("id = "+res.data.id);
                        if(res.data.status_code==200){  
                            //$('#loading-modal').modal('hide'); 
                            //toastr.info('ลบข้อมูลเรียบร้อยเเล้ว');
                            vuexContext.commit("deletePlaceState",res.data.id);
                        }else{ 
                            //$('#loading-modal').modal('hide'); 
                            //toastr.error('ไม่สามารถลบข้อมูลได้');
                            console.log(res.data.message); 
                        }
                    //}, 1000);

                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async initReserve(vuexContext){ 
                return axios
                .get("https://service.candlesfest.com/api/reserve/find/all")
                .then(res=>{   
                    vuexContext.commit("setReserveState", res.data.reserve_list);
                }).catch(e=>context.error(e));
            },
            async addReserve(vuexContext,reserve){
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch  
                debugger;
                const createReserve={...reserve} 
                var fullPathStr = "";//อาจจะเก็บเป็น filename หรือ fullpath จริงๆ   
                return await axios.post("https://service.candlesfest.com/api/reserve/create", 
                createReserve
                ).then(res=>{  
                    //setTimeout(() => { 
                        //$('#loading-modal').modal('hide');
                        const data = res.data;
                        debugger;
                        if(data){  
                            if(res.data.status_code==200){ 
                                //toastr.info('บันทึกข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("addReserveState",res.data.reserve);
                            }else{ 
                                //toastr.error('ไม่สามารถบันทึกข้อมูลได้');
                                debugger;
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async checkReserve(vuexContext, mobile){
                return axios
                .get("https://service.candlesfest.com/api/zone/find/reserve/"+mobile)
                .then(res=>{
                    debugger;
                    var reserve_list = res.data.reserve_list;
                    vuexContext.commit("checkReserveState",reserve_list);
                    console.log(res.data.reserve_list);
                }).catch(e=>context.error(e));
            },
            async editReserve(vuexContext,reserve){ 
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch  
                const editReserve={...reserve}     
                return await axios.put("https://service.candlesfest.com/api/reserve/update/"+editReserve.id, 
                editReserve
                ).then(res=>{ 
                    //setTimeout(() => {
                        //$('#loading-modal').modal('hide'); 
                        const data = res.data;  
                        if(data){ 
                            if(res.data.status_code==200){ 
                                //toastr.info('แก้ไขข้อมูลเรียบร้อยเเล้ว');
                                vuexContext.commit("editReserveState",{...data.reserve});
                            }else{ 
                                //toastr.error('ไม่สามารถแก้ไขข้อมูลได้');
                                console.log(res.data.message); 
                            }
                            
                        } 
                    //}, 1000);
                })
                .catch(error => {
                    console.log('error ' , error);
                });
            },
            async deleteReserve(vuexContext,id){ 
                return await axios.delete("https://service.candlesfest.com/api/reserve/delete/"+id
                ).then(res=>{
                    //setTimeout(() => {    
                        console.log("id = "+res.data.id);
                        if(res.data.status_code==200){  
                            //$('#loading-modal').modal('hide'); 
                            //toastr.info('ลบข้อมูลเรียบร้อยเเล้ว');
                            vuexContext.commit("deleteReserveState",res.data.id);
                        }else{ 
                            //$('#loading-modal').modal('hide'); 
                            //toastr.error('ไม่สามารถลบข้อมูลได้');
                            console.log(res.data.message); 
                        }
                    //}, 1000);

                })
                .catch(error => {
                    console.log('error ' , error);
                });
            }
        },
        getters:{
            //นำ state ไปใช้งาน 
            // showModal: state => {
            //     return state.showModal
            // },
            getTabActive(state){
                return state.activeTab;
            },
            getAllNews(state){
                return state.newsData;
            }, 
            getAllReserve(state){
                return state.zoneData;
            }, 
            getAllPlaceGroup(state){
                return state.placeGroupData;
            }, 
            getAllPlace(state){
                return state.placeData;
            },  
            getAllPlaceOrder(state){
                return state.placeOrderData;
            },  
            getAllReserve(state){
                return state.reserveData;
            },
            getAllReserveChecking(state){
                return state.reserveCheckingData;
            },
            getAllZone(state){
                return state.zoneData;
            }
        }
    });
};

export default createStore