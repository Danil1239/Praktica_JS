<template>
   <div>
        <link rel="stylesheet" id="webcolor" v-bind:href="chooseWebcolor == 'color2' ? './color2.css' : './color1.css'">
        <div align='left'>
            <input type="radio"  value="color1" name="color" v-on:click="takeWebcolor('color1')">Светлая
                   <input type="radio"  value="color2" name="color" v-on:click="takeWebcolor('color2')">Темная
        </div>
        <p></p>
		<table border="1" cellpadding="5" cellspacing="3">
			<tr>
				<th>Photo</th>
				<th>Name</th>
				<th>Group</th>
				<th>Mark</th>
				<th>PR is Done</th>
			</tr>
			<tr v-for="stud in students" v-bind:key="stud._id">
				<td><img v-bind:src="stud.photo" width="50px"></td>
                <td><router-link v-bind:to="'/student-info/'+stud._id"></router-link></td>
				<td v-bind:style="stud.name.indexOf(search)>-1 && search.length >0 ? 'background-color:#CA2C2C' : 'background-color:#fff'">{{stud.name}}</td>
				<td>{{stud.group}}</td>
				<td>{{stud.mark}}</td>
				<td><input type="checkbox" v-bind:checked="stud.isDonePr"></td>
				<td><a href="#" v-on:click="deleteStudent(stud._id)">Видалити</a></td>
				<td><button v-on:click="getData(stud._id,stud.name,stud.group,stud.isDonePr)"><img src="components/pencil.jpg" width="30px"></button></td>
			</tr>
		</table>
            <br>Введіть потрібне прізвище<input v-model="search">
            <p></p>
            <br><h5> Количество студентов: {{studentsCount}} </h5>
			<br><h3>Add Student</h3>
			<br>Input Name: <input v-model="name">
			<br>Input Group: <input v-model="group">
			<br>Pr is Done: <input type="checkbox" v-model="isDonePr">
			<br><button v-on:click="addStudent">Add student</button>

			<br><h3>Update Student</h3>
			<br>Input Name: <input v-model="name1">
			<br>Input Group: <input v-model="group1">
			<br>Pr is Done: <input type="checkbox" v-model="isDonePr1">
			<br><button v-on:click="updateStudent(studId)">Update student</button>   

			
<h2>Converter</h2> 
             
            <br>Enter amount: <input type="number" value="100" v-model="start_value"> 
            <br>Convert from (choose ONE) 
            <table> 
                <tr> 
                    <th>RUB</th> 
                    <th>USD</th> 
                    <th>EUR</th> 
                </tr> 
                <tr> 
                    <td><input type="checkbox" value="RUR" v-model="start_ccy_r"></td> 
                    <td><input type="checkbox" value="USD" v-model="start_ccy_u"></td> 
                    <td><input type="checkbox" value="EUR" v-model="start_ccy_e"></td> 
                </tr> 
            </table>{{start_ccy}} 
            to (choose ONE) 
            <table> 
                <tr> 
                    <th>RUB</th> 
                    <th>USD</th> 
                    <th>EUR</th> 
                </tr> 
                <tr> 
                    <td><input type="checkbox" value="RUR" v-model="end_ccy_r"></td> 
                    <td><input type="checkbox" value="USD" v-model="end_ccy_u"></td> 
                    <td><input type="checkbox" value="EUR" v-model="end_ccy_e"></td> 
                </tr> 
            </table> 
            <button v-on:click="convert">Convert</button> 
            <br>{{result}}{{end_value | Round}}{{end_ccy}}

   </div>
</template>

<script>

    import Vue from 'vue'
	import axios from 'axios'
    import VueAxios from 'vue-axios';
 
   export default {
     data: function() {
          return{
			  name:"",
			  group:"",
			  isDonePr: false,
			  name1:"",
			  group1:"",
			  isDonePr1: false,
			  studId: 0,
         students: [],
         currency:[],
         search:'',
		  start_ccy:"",
            start_ccy_r:false,
            start_ccy_u:false,
            start_ccy_e:false,
            end_ccy:"",
            end_ccy_r:false,
            end_ccy_u:false,
            end_ccy_e:false,
            sell:0,
            buy:0,
            start_value:0,
            end_value:0,
            result:"",
           
		 }
	 },	 
     mounted: function(){
      axios.get("http://46.101.212.195:3000/students").then((response) => {
           console.log(response.data)
           this.students = response.data;
             this.$store.commit('setCount', this.students.length);
         
        })
		axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response) => {
           console.log(response.data)
           this.currency = response.data;
        })
     },
     computed: {
        studentsCount () {
            return this.$store.getters.getCount
        },
         chooseWebcolor () {
    return this.$store.getters.getWebcolor
        },
         getCurrentUser() {
            return this.$store.getters.getUser
        }
        },
     filters: {
          Round: function(value){
          return value.toFixed(2);

      }
      },
     methods: {
       takeWebcolor: function(webcolor) {
            this.$store.commit('setWebcolor', webcolor)
        },
	  addStudent: function(){
		  Vue.axios.post("http://46.101.212.195:3000/students", {
              photo: "https://robohash.org/"+this.name,
			  name: this.name,
			  group: this.group,
			  IsDonePr: this.IsDonePr
		  })
		  .then((response) => {
           console.log(response.data)
           this.students.push(response.data)
            this.$store.commit('setCount', this.students.length);  
		   })
	  },
	   deleteStudent: function(id){
		    Vue.axios.delete("http://46.101.212.195:3000/students/"+id, {
		  })
		 .then((response) => {
            this.students =  this.students.filter(elem => elem._id!=id)
             this.$store.commit('setCount', this.students.length);  
         })
           
	  },
	  updateStudent: function(id){
		    Vue.axios.put("http://46.101.212.195:3000/students/"+this.studId, {
				name: this.name1,
			  group: this.group1,
			  IsDonePr: this.IsDonePr1
		  })
		 
		   
		   axios.get("http://46.101.212.195:3000/students").then((response) => {
           this.students = response.data;
		   })
	  },
	  getData: function(id,name,group,isDonePr){
		  this.studId = id;
		  this.name1 = name;
		  this.group1 = group;
		  this.isDonePr1 = isDonePr;
	  },
     
	  convert:function(){ 
            if(this.start_ccy_e==true) this.start_ccy = "EUR" 
            else if (this.start_ccy_u==true) this.start_ccy = "USD" 
            else if (this.start_ccy_r==true) this.start_ccy = "RUR" 
            else return false; 
 
            if(this.end_ccy_e==true) this.end_ccy = "EUR" 
            else if (this.end_ccy_u==true) this.end_ccy = "USD" 
            else if (this.end_ccy_r==true) this.end_ccy = "RUR" 
            else return false; 
 
            for(let i=0; i<this.currency.length; i++){ 
                if (this.currency[i].ccy==this.start_ccy) 
                        this.sell=this.currency[i].sale; 
                if (this.currency[i].ccy==this.end_ccy) 
                        this.buy=this.currency[i].buy; 
            } 
            this.end_value=(this.start_value*this.sell)/this.buy; 
            this.result = this.start_value + " " + this.start_ccy + " --> "; 
             
        }
     }
   }
</script>
<style scoped>

</style>