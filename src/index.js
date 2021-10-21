import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

new Vue({
     el: '#app',
     data: {
         students: [],
         student: {},
         
         search:''
     },	 
     mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response) => {
            console.log(response.data);
            this.students = response.data;
        })
         this.students = students;
     },
     methods: {
        deleteStudent(studId) {
            this.students = this.students.filter(elem => {
                return elem.id != studId;
            });
        },
        addStudent() {
            this.student.id = this.students.length+1;
            this.students.push(this.student);
        }
     },
  
 });