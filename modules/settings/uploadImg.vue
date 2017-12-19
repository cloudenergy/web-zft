<template>
 <el-dialog
  :title="title"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">


  <el-upload
  class="upload-demo"
  drag
  :action="action"
  :multiple='multiple'>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>


  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="close">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    props:{
            isShow:Boolean,
            title:String,
            action:String,
            multiple:Boolean
        },
	data() {
		return {
			dialogVisible: ''
		};
	},
	components: {},
	methods: {
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
        },
        close(){
this.dialogVisible=false;
// this.isShow=false;
        }
    },
    created(){
        this.dialogVisible=this.isShow;
        // this.isShow='';
    }
};
</script>

<style>

</style>
