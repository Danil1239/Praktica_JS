<template>
<div>
    <br>{{student.name}}
    <br>{{student.group}}
    <br><img v-bind:src="student.photo">
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'

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
axios.get("http://46.101.212.195:3000/students/"+this.id).then((response) => {
           console.log(response.data)
           this.student = response.data;
        })
},
// computed: {
//   studentsCount () {
//     return this.$store.getters.getCount
//   }
// }

}
</script>