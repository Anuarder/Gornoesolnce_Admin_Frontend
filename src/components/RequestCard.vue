<template>
    <div>
        <div class="subheader mb-2 pl-2">{{request.date}}</div>
        <div class="request-card elevation-1">
            <button class="delete-button" @click="deleteRequest">
                <i class="material-icons">delete</i>
            </button>
            <div class="name">
                <span class="mr-2 font-weight-regular">Клиент:</span>
                {{request.name}}
            </div>
            <div class="phone">
                <span class="mr-2 font-weight-regular">Номер телефона:</span>
                <a :href="`tel:${request.phone}`">{{request.phone}}</a>
            </div>
            <div class="status">
                <span class="mr-2 font-weight-regular">Статус:</span>
                <span class="green--text" v-if="request.status">Заявка обработана</span>
                <span class="red--text" v-else>Заявка не обработана</span>
            </div>
            <div class="personal">
                <span class="mr-2 font-weight-regular">Сотрудник:</span>
                <select v-model="request.personal" class="personal-select">
                    <option value="">Сотрудник не выбран</option>
                    <option v-for="item in personal" :key="item._id">
                        {{item.name}}
                    </option>
                </select>
            </div>
            <div class="actions mt-2">
                <v-btn 
                    v-if="request.status"
                    class="ma-0 text-none"
                    color="error"
                    @click="changeRequestStatus">
                    Отменить обработку
                </v-btn>
                <v-btn 
                    v-else
                    class="ma-0 text-none"
                    color="success"
                    @click="changeRequestStatus">
                    Обработать
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import PersonalServices from '@/services/Personal'
import RequestServices from '@/services/Requests'
export default {
    props: {
        request: Object 
    },
    data(){
        return {
            personal: []
        }
    },
    created(){
        this.getPersonal();
    },
    methods: {
        async getPersonal(){
            try{
                let response = await PersonalServices.getPersonal();
                this.personal = response.data.personal;
            }catch(err){
                console.log(err);
            }
        },
        async deleteRequest(){
            try{
                let response = await RequestServices.deleteRequest({
                    id: this.request._id
                });
                if(response.data.message){
                    alert("Заявка удаленна");
                    this.$emit('updateRequest');
                }else{
                    alert("Ошибка");
                }
            }catch(err){
                console.log(err);
            }
        },
        async changeRequestStatus(){
            try{
                if(this.request.personal === '' && !this.request.status){
                    alert('Добавьте сотрудника');
                }else{
                    let response = await RequestServices.changeRequestStatus({
                        id: this.request._id,
                        personal: this.request.personal,
                        status: !this.request.status
                    });
                    if(response.data.message){
                        if(!this.request.status){
                            alert('Заявка обработанна');
                        }else{
                            alert('Обработка отмененна');
                        }
                        this.$emit('updateRequest');
                    }else{
                        alert('Ошибка');
                    }
                }
            }catch(err){
                console.log(err);
            }
        },
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
}
.subheader{
    color: #7e7e7e;
}
.request-card{
    padding: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    justify-content: space-around;
    background-color: #fff;
    width: 100%;
    position: relative;
}
.request-card div{
    padding: 3px;
}
.delete-button{
    outline: none;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #7a7a7a;
}
.delete-button:hover{
    color: #414141;
}
.delete-button:active{
    color: #7a7a7a;
}
.request-card div{
    display: flex;
    align-items: center;
}
.personal-select{
    cursor: pointer;
    max-width: 300px;
    border: 1px solid #252525;
    padding: 5px;
}
</style>
