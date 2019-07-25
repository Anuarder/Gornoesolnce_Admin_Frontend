<template>
    <v-content>
        <v-container>
            <div class="gs-container">
                <h3 class="mb-3">Сотрудники</h3>
                <v-btn 
                    @click="dialog=true" 
                    class="text-none ma-0 mb-3" 
                    color="#009688" 
                    dark>
                    Добавить сотрудника
                </v-btn>
                <v-dialog v-model="dialog" max-width="400">
                    <v-card class="personal-dialog">
                        <v-card-text>
                            <h3 class="headline mb-3">
                                Добавить сотрудника
                            </h3>
                            <v-form ref="personalForm" @submit.prevent>
                                <v-text-field
                                    v-model="name"
                                    :rules="rules"
                                    placeholder="Имя сотрудника"
                                    solo>
                                </v-text-field>
                                <v-text-field
                                    v-model="phone"
                                    :rules="rules"
                                    placeholder="Телефон сотрудника"
                                    solo>
                                </v-text-field>
                                <v-btn 
                                    @click="validate" 
                                    type="submit"
                                    class="text-none"
                                    color="#009688"
                                    dark
                                    :loading="persistendState">
                                    Добавить сотрудника
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <div 
                    class="personal-card elevation-2 mt-2" 
                    v-for="(item, i) in personal" 
                    :key="item._id">
                    <div class="personal-info">
                        <div class="mr-3">
                            <span class="mr-3">#{{i+1}}</span>
                            <span class="mr-1 font-weight-regular">Имя:</span> 
                            {{item.name}}
                        </div>
                        <div>
                             <span class="mr-1 font-weight-regular">Телефон:</span>
                             <a :href="`tel:${item.phone}`">{{item.phone}}</a>
                        </div>
                    </div>
                    <div class="delete-button">
                        <button class="delete-button" @click="deletePersonal(item)">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            </div>
        </v-container>
    </v-content>
</template>
<script>
import PersonalServices from '@/services/Personal'
export default {
    data(){
        return {
            dialog: false,
            personal: [],
            name: '',
            phone: '',
            rules: [
                v => !!v || 'Обязательное поле',
            ],
            persistendState: false
        }
    },
    created(){
        this.getPersonal();
    },
    methods: {
        validate() {
			if (this.$refs.personalForm.validate()) {
				event.preventDefault();
				this.performingRequest = true;
				this.addNewPersonal();
			} else {
				console.log('validate');
			}
		},
        async getPersonal(){
            try{
                let response = await PersonalServices.getPersonal();
                this.personal = response.data.personal;
            }catch(err){
                console.log(err);
            }
        },
        async deletePersonal(personal){
            try{
                let response = await PersonalServices.deletePersonal({
                    id: personal._id
                });
                if(response.data.message){
                    alert(`Сотрудник ${personal.name} удален`);
                    this.getPersonal();
                }else{
                    alert("Ошибка");
                }
            }catch(err){
                console.log(err);
            }
        },
        async addNewPersonal(){
            try{
                this.persistendState = true;
                let response = await PersonalServices.addNewPersonal({
                    name: this.name,
                    phone: this.phone
                });
                if(response.data.message){
                    this.persistendState = false;
                    this.dialog = false;
                    this.name = '';
                    this.phone = '';
                    alert("Сотрудник добавлен");
                    this.getPersonal();
                }else{
                    this.persistendState = false;
                    this.dialog = false;
                    this.name = '';
                    this.phone = '';
                    alert("Ошибка");
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
<style scoped>
.personal-card{
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px;
}
.personal-info{
    display: flex;
    align-items: center;
}
.personal-dialog{
    text-align: center;
}
.delete-button{
    outline: none;
    color: #7a7a7a;
}
.delete-button:hover{
    color: #414141;
}
.delete-button:active{
    color: #7a7a7a;
}
</style>
