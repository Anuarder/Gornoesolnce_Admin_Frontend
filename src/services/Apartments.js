import Api from '@/services/Api'

export default {
    getApartments(){
        return Api().get('/getApartments');
    },
    soldApartment(payload){
        return Api().put('/soldApartment', payload);
    }
}