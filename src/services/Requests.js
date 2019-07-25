import Api from '@/services/Api'

export default {
    getRequests(){
        return Api().get('/getRequests'); 
    },
    getLastRequests(){
        return Api().get('/getLastRequests');
    },
    deleteRequest(payload){
        return Api().post('/deleteRequest', payload);
    },
    changeRequestStatus(payload){
        return Api().put('/updateRequest', payload);
    }
}