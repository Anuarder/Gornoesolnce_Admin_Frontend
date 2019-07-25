<template>
    <v-container class="content">
        <div class="login-content">
            <h1 class="text-xs-center display-1 font-weight-light top-text">
                Админ панель
                <div class="subheading">
                    <a href="https://gornoesolnce.kz/">https://gornoesolnce.kz/</a>
                </div>
            </h1>
            <div class="login-form">
                <v-form class="mt-3 mb-3" @submit.prevent>
                    <v-alert
                        v-model="alertDialog"
                        outline
                        class="mb-3"
                        color="#fd5b4d"
                        dismissible>
                        {{alert_message}}
                    </v-alert>
                    <v-text-field
                        solo
                        class="input-field"
                        placeholder="Имя пользователя"
                        v-model="user.name">
                    </v-text-field>
                    <v-text-field
                        solo
                        class="input-field"
                        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        placeholder="Пароль"
                        v-model="user.password">
                    </v-text-field>
                    <div class="login-btn">
                        <v-btn
                            @click="login()"
                            type="submit"
                            dark
                            large
                            color="#009688"
                            class="elevation-8 text-none ml-3"
                            :loading="performingRequest">
                            Войти
                        </v-btn>
                    </div>
            </v-form>
            </div>
        </div>
    </v-container>
</template>
<script>
import AuthServices from '@/services/Auth'
export default {
    data(){
        return{
            user:{
                name: '',
                password: ''
            },
            showPassword: false,
            performingRequest: false,
            alert_message: '',
            alertDialog: false,
        }
    },
    methods:{
        async login(){
            try{
                this.performingRequest = true;
                let response = await AuthServices.login({
                    name: this.user.name,
                    password: this.user.password
                });
                if(response.data.token){
                    this.performingRequest = false;
                    let payload = {
                        user: response.data.user,
                        token: response.data.token
                    }
                    this.$store.dispatch('login', payload);
                    this.$router.push('/home');
                }else{
                    this.performingRequest = false;
                    this.alert_message = response.data.error;
                    this.alertDialog = true;
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
<style>
.auth-btn{
    background-image: linear-gradient(to right top, #f87140, #fb6646, #fd5b4d, #ff4f55, #ff435e);
    border-radius: 2rem;
}
.login-btn{
    display: flex;
    justify-content: center;
}
.error-alert{
    border-radius: 1rem;
    font-weight: 900;
    padding: .8rem;
}
.login-form{
    display: flex;
    justify-content: center;
}
.content{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-content{
    height: 300px;
}
</style>