<template>
    <v-content>
        <v-container>
            <div v-if="isRequest" class="text-xs-center">
                <h1 class="display-2">Загрузка...</h1>
            </div>
            <div v-else>
                <div v-if="requests.length !== 0">
                    <request-card 
                        class="mt-4"
                        v-for="request in requests"
                        :key="request._id"
                        :request="request"
                        @updateRequest="getRequests">
                    </request-card>
                </div>
                <div v-else>
                    <h1 class="text-xs-center">Заявки отсутствуют</h1>
                </div>
            </div>
        </v-container>
    </v-content>
</template>
<script>
import RequestServices from '@/services/Requests'
import RequestCard from '@/components/RequestCard'
export default {
    components: {
        RequestCard
    },
    data(){
        return {
            requests: [],
            isRequest: true,
        }
    },
    created(){
        this.getRequests();
    },
    methods: {
        async getRequests(){
            try{
                this.isRequest = true;
                let response = await RequestServices.getRequests();
                this.requests = response.data.requests;
                this.isRequest = false;
            }catch(err){
                console.log(err);
            }
        },
    }
}
</script>
