<template>
  <v-container>
    <div class="">
        <div class="search-wrapper panel-heading col-sm-12">
            <div class="content-button">
              <v-btn class="btn" v-on:click="searchPost" color="success">
                <i class="fas fa-search"></i> | Search</v-btn>
              <span><v-btn v-on:click="sortedArray" color="primary" class="asc">
                <i class="fas fa-sort-alpha-down"></i> | Sort</v-btn></span>
              <span><v-btn v-on:click="sortedArray" color="error" class="desc">
                <i class="fas fa-sort-alpha-down-alt"></i> | Sort</v-btn></span>
              <span class="excel"><v-btn v-on:click="exportExcel" color="success">
                <i class="fas fa-file-excel"></i> | Excel</v-btn></span>
              <span class="print"><v-btn v-on:click="exportPrint" color="info">
                <i class="fas fa-print"></i> | Print</v-btn></span>
              <span><v-btn v-on:click="exportCSV" color="success">
                <i class="fas fa-file-csv"></i> | CSV</v-btn></span>
              <span class="pdf"><v-btn v-on:click="exportPDF" color="warning">
                <i class="fas fa-file-pdf"></i> | PDF</v-btn></span>
            </div>
            <input class="form-control" type="text" placeholder="Search" />
        </div>                        
    </div>
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{this.$route.params.message}}
    </v-alert>
    <v-row no-gutters id="printMe" class="page">
      <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card class="pa-1" :to="{name: 'post', params: {id: post._id}}">
          <v-img height="250" v-bind:src="`/${post.image}`"></v-img>
          <v-btn class="ml-4 mt-3 category" small outlined color="indigo">
            {{post.category}}
          </v-btn>
          <v-card-title class="headline">
            {{post.title}}
          </v-card-title>
          <v-card-text class="py-0">
            <p class="line-clamp">{{post.content}}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
@import '../css/main.css';
</style>
<script>
import API from '../api'
import XLSX from 'xlsx'
  export default {
    name: 'Home',
    isSort: true,
    data(){
      return {
        posts: [],
      }
    },
    async created(){
      this.posts = await API.getAllPost();
    },
    methods: {
        searchPost: function () {
          var inputValue = document.querySelector('.form-control');
          if(inputValue.value){
            this.posts = this.posts.filter(post => {
              return post.title.toLowerCase().includes(inputValue.value.toLowerCase())
            })
          }
        },
        sortedArray: function () {
          this.isSort = !this.isSort;
          if(this.isSort){
            document.querySelector('.asc').style.display = 'none'
            document.querySelector('.desc').style.display = 'inline-block'
            function compare(a, b) {
              if (a.title < b.title)
                return -1;
            }
            return this.posts.sort(compare);
          }
          else{
            document.querySelector('.asc').style.display = 'inline-block'
            document.querySelector('.desc').style.display = 'none'
            function compare(a, b) {
              if (a.title > b.title)
                return -1;
            }
            return this.posts.sort(compare);
          }
        },
        exportExcel: function(){
          const post = this.posts.map(item => {
            return {
              ID: item._id,
              Title: item.title,
              Content: item.content,
              Category: item.category,
              Image: item.image,
            }
          });
          var postWS = XLSX.utils.json_to_sheet(post) 
          var wb = XLSX.utils.book_new() // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, postWS, post);
          // export Excel file
          XLSX.writeFile(wb, 'MevnStackEXCEL.xlsx') 
        },
        exportPrint: function(){
          var printMe = document.querySelector('#printMe');
          window.print(printMe);
        },
        exportCSV: function(){
          var universalBOM = "\uFEFF";
           //define the heading for each row of the data  
          const post = this.posts.map(item => {
            return [
              [`
              <b>ID:</b> ${item._id} <br /> 
              <b>Title:</b> ${item.title} <br /> 
              <b>Content:</b> ${item.content} <br /> 
              <b>Category:</b> ${item.category} <br />
              <b>Image:</b> ${item.image}`]
            ]
          });
          var csv = '<h4 style="text-align:center">MEVN STACK POST CSV. <a href="/">Về trang chủ</a></h4><br />';  
            
          //merge the data with CSV  
          post.forEach(function(row) {  
                  csv += row.join(' \n ');  
                  csv += "<br /><b style='color:red'>➡️➡️➡️➡️➡️➡️</b><br />";  
          });  
        
          //display the created CSV data on the web browser   
          document.write(csv);  
          var hiddenElement = document.createElement('a');  
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(universalBOM+csv)
          hiddenElement.target = '_blank';  
          //provide the name for the CSV file to be downloaded  
          hiddenElement.download = 'MevnStackCSV.csv';  
          hiddenElement.click();  
        },
        exportPDF: function() {
          var doc = new jsPDF('l', 'mm', [300, 300]);
          var printMe = document.getElementById("printMe")
          let pdfName = 'MevnStackPDF';
          doc.canvas.height = 72 * 11;
          doc.canvas.width = 72 * 8.5;
          var width= printMe.style.width;
          var height = printMe.style.height;
          doc.setFont("times");
          html2canvas(printMe).then(canvas => {
              var image = canvas.toDataURL('image/png');
              doc.addImage(image, 'JPEG', 15, 15, width,height);
              doc.save(pdfName + '.pdf');
          });
        },
    }
  }
</script>
