<template>
    <v-content>
        <v-container>
            <div class="toolbar">
            <div class="logo">
                <router-link to="/home"><img src="../assets/logo.png"></router-link>
            </div>
            <div class="actions">
                <v-btn flat>{{getDate}}</v-btn>
                <v-btn dark color="#009688" @click="logout">
                    <span class="mr-2">Выйти</span>
                    <v-icon>input</v-icon>
                </v-btn>
            </div>
        </div>
        </v-container>
        <transition 
            name="fade"
            mode="out-in">
            <router-view></router-view>
        </transition>
    </v-content>
</template>
<script>
export default {
    data(){
        return{
            date: new Date()
        }
    },
    computed: {
        getDate(){
            let date = {
                day: this.date.getDate() < 10 ? `0${this.date.getDate()}` : this.date.getDate(),
                mounth: (this.date.getUTCMonth() + 1) < 10 ? `0${this.date.getUTCMonth() + 1}` : this.date.getUTCMonth() + 1,
                year: this.date.getUTCFullYear()
            }
            return `${date.day}.${(date.mounth)}.${date.year}`;
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
}
</script>
<style scoped>
.toolbar{
    display: flex;
    justify-content: space-between;
}
.logo img{
    width: 80px;
}
</style>
