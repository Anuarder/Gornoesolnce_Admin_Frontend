<template>
    <v-content>
        <v-container>
            <div class="gs-container">
                <div class="links">
                    <h3>Панель администратора</h3>
                    <div class="cards mt-5">
                        <router-link to="/apartments">
                            <div class="card"> 
                                <div>
                                    <img class="card-img" src="../assets/cards/apartments.png">
                                    <h3 class="card-title mt-5">Квартиры</h3>
                                </div>
                            </div>
                        </router-link>
                        <a href="https://mail.gornoesolnce.kz" target="_blank">
                            <div class="card"> 
                                <div>
                                    <img class="card-img" src="../assets/cards/mail.png">
                                    <h3 class="card-title mt-5">Почта</h3>
                                </div>
                            </div>
                        </a>
                        <router-link to="/personal">
                            <div class="card"> 
                                <div>
                                    <img class="card-img" src="../assets/cards/personal.png">
                                    <h3 class="card-title mt-5">Сотрудники</h3>
                                </div>
                            </div>
                        </router-link>
                        <router-link to="/requests">
                            <div class="card"> 
                                <div>
                                    <img class="card-img" src="../assets/cards/requests.png">
                                    <h3 class="card-title mt-5">Заявки</h3>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div class="new-requests" v-if="newRequests.length !== 0">
                    <h3 class="mb-4">Недавние заявки</h3>
                    <request-card 
                        class="mt-4"
                        v-for="request in newRequests"
                        :key="request._id"
                        :request="request"
                        @updateRequest="getLastRequests">
                    </request-card>

                    <div class="rqr-btn">
                        <v-btn 
                            class="text-none ma-0" 
                            color="#009688" 
                            dark 
                            to="/requests"
                            large>
                            Все заявки
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-container>
    </v-content>
</template>
<script>
import RequestCard from '@/components/RequestCard'
import RequestServices from '@/services/Requests'
export default {
    components: {
        RequestCard
    },
    data(){
        return{
            newRequests: []
        }
    },
    created(){
        this.getLastRequests();
    },
    methods:{
        async getLastRequests(){
            try{
                let response = await RequestServices.getLastRequests();
                if(response.data.requests){
                    this.newRequests = response.data.requests;
                }else{
                    throw "Ошибка при получении"
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
.rqr-btn{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.cards{
    display: flex;
    justify-content: space-around;
}
.card{
    cursor: pointer;
    background-color: #fff;
    color: #000;
    width: 222px;
    height: 255px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
}
.card:hover{
    box-shadow: 0 6px 10px rgba(0, 0, 0, .25);
}
.new-requests{
    margin-top: 80px;
}

@media screen and (max-width: 1024px){
    .card{
        width: 170px;
    }
}
@media screen and (max-width: 766px){
    .cards{
        flex-direction: column;
        align-items: center;
    }
    .card{
        margin-top: 10px;
        width: 300px;
    }
}
</style>
