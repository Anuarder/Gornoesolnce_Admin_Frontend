import Api from '@/services/Api'

export default {
    getPersonal() {
        return Api().get('/getPersonal');
    },
    deletePersonal(payload){
        return Api().post('/deletePersonal', payload);
    },
    addNewPersonal(payload){
        return Api().post('/addNewPersonal', payload);
    }
}