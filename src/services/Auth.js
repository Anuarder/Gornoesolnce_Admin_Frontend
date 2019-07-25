import Api from '@/services/Api'

export default {
    login(value) {
        return Api().post('/login', value)
    }
}