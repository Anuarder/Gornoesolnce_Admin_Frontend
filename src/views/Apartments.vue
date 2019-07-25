<template>
    <v-content>
        <v-container class="home">
            <div class="apartments">
                <v-data-table
                    :rows-per-page-items="rowsPerPageItems"
                    :headers="headers"
                    touched
                    :items="apartments"
                    class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td># {{ props.item.number }}</td>
                        <td>{{ props.item.area }}</td>
                        <td>{{ props.item.room }}</td>
                        <td>{{ props.item.block }}</td>
                        <td>{{ props.item.floor }}</td>
                        <td>
                            <input 
                                class="apartments-checkbox"
                                type="checkbox" 
                                v-model="props.item.isSold"
                                @click="changeApartmentState(props.item)">
                        </td>
                    </template>
                </v-data-table>
            </div>
        </v-container>
    </v-content>
</template>
<script>
import ApartmentsServices from '@/services/Apartments'
export default {
    data(){
        return{
            headers: [
            {
                text: 'Номер квартиры',
                sortable: false,
                value: 'number'
            },
            { text: 'Площадь',sortable: false, value: 'area' },
            { text: 'Кол-во комнат',sortable: false, value: 'room' },
            { text: 'Подъезд',sortable: false, value: 'block' },
            { text: 'Этаж',sortable: false, value: 'floor' },
            { text: 'Продан',sortable: false, value: 'isSold' },
            ],
            apartments: [],
            rowsPerPageItems: [10, 20, 30],
        }
    },
    created(){
        this.getApartaments();
    },
    methods:{
        async getApartaments(){
            try{
                let response = await ApartmentsServices.getApartments();
                this.apartments = response.data.apartments;
            }catch(err){
                console.log(err);
            }
        },
        async changeApartmentState(apartment){
            try{
                let response = await ApartmentsServices.soldApartment(apartment);
                if(response.data.message){
                    console.log("Обновлен");
                }else{
                    alert("Ошибка");
                }
            }catch(err){
                console.log(err);
            }
        },
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }  
}
</script>
<style scoped>
/* Checkbox */
input[type="checkbox"]{
    position: relative;
    width: 2.6rem;
    height: 1.4rem;
    -webkit-appearance: none;
    background-color: #a3a3a3;
    outline: none;
    border-radius: 1rem;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    transition: .5s;
}
input:checked[type="checkbox"]{
    background-color: #4CAF50;
}
input[type="checkbox"]:before{
    content: '';
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 1rem;
    top: 0;
    left: 0;
    transform: scale(1.1);
    transition: .2s;
    box-shadow: 0 3px 7px rgba(0, 0, 0, .2);
    background-color: #fff;
}
input:checked[type="checkbox"]:before{
    left: 1.4rem;
}
</style>
