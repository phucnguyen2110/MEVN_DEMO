<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Chỉnh sửa bài viết</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                    <v-text-field label="Tiêu đề" v-model="post.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                    <v-text-field label="Nút liên kết" v-model="post.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                    <v-textarea label="Nội dung" v-model="post.content" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
                    <v-file-input @change="selectFile" show-size counter multiple label="Chọn hình ảnh"></v-file-input>
                    <v-img :src="`/${post.image}`" width="120"></v-img>
                    <v-btn type="submit" class="mt-3" color="green">
                        <v-icon left>mdi-update</v-icon>Cập nhật</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import API from '../api'
export default {
    data(){
        return{
            rules: [(value)=>!!value || "This filed is required"],
            post: {
                title: "",
                category: "",
                content: "",
                image: "",
            },
            image: ""
        }
    },
    async created(){
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
    },
    methods: {
        selectFile(file){
            this.image = file[0];
        },
        async updateForm(){
            Swal.fire({
                title: 'Thông báo!',
                text: 'Chức năng nhóm đang hoàn thiện',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        }
    }
}
</script>