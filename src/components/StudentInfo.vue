<template>
<div>
   <link rel="stylesheet" id="webcolor" v-bind:href="chooseWebcolor == 'color2' ? './color2.css' : './color1.css'">
        <div align='left'>
            <input type="radio"  value="color1" name="color" v-on:click="takeWebcolor('color1')">Светлая
                   <input type="radio"  value="color2" name="color" v-on:click="takeWebcolor('color2')">Темная
        </div>
    <br>{{student.name}}
    <br>{{student.group}}
    <br><img v-bind:src="student.photo">
</div>
</template>
<script>
import Vue from 'vue'


export default {
    props: {
           id: '',
       },
data : function(){
    return{
        student: {},
    };
},
mounted: function(){
Vue.axios.get("http://46.101.212.195:3000/students/"+this.id).then((response) => {
           console.log(response.data)
           this.student = response.data;
        })
},
computed: {
  studentsCount () {
    return this.$store.getters.getCount
  },
  chooseWebcolor () {
    return this.$store.getters.getWebcolor
  }
},
methods: {
      takeWebcolor: function(webcolor) {
            this.$store.commit('setWebcolor', webcolor)
        },

}
}
</script>