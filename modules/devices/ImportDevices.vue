<template>
    <div class="modal import-devices">
        <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :on-preview="preview"
                :multiple="false"
                accept="xlsx"
                :http-request="request"
        >
            <el-button slot="trigger" size="small" type="primary">select file</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="downloadTemplate">下载模版
            </el-button>
        </el-upload>
        <div>preview</div>
        <p v-for="d in devices">{{d.deviceId}} - {{d.memo}}</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog()">取 消</el-button>
            <el-button type="primary" @click="submit()">导入</el-button>
        </div>
    </div>
</template>

<script>
	import XLSX from 'xlsx';
	import fp from 'lodash/fp';

	export default {
		data() {
			return {
				devices: []
            };
		},
		created() {
			this.projectId = this.$store.state.userInfo.user.projectId;
		},
		methods: {
			submitUpload(file) {
				// this.$refs.upload.submit();
				// console.log(this.$refs.upload);
				console.log(this.$refs.upload);
			},
			preview(file) {
				console.log(file);
			},
			readContent(event) {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = e => {
						const wb = XLSX.read(e.target.result, {type: 'binary'});
						const ws = wb.Sheets[wb.SheetNames[0]];
						const content = XLSX.utils.sheet_to_json(ws, {header: 1});
						resolve(content)
					};
					reader.onerror = err => reject(err);
					reader.readAsBinaryString(event.file);
				});
			},
			validate(content) {
				const [col1, col2] = fp.head(content);
				if (!(col1 === '仪表ID' && col2 === '备注信息')) {
					this.$message.error('列名错误，请下载使用模版重新导入。');
					return [];
				}
				return fp.drop(1)(content);
			},
			translate(content) {
				return fp.map(([id, memo]) => ({
					deviceId: fp.padCharsStart('0')(12)(id), memo
				}))(content);
			},
			request(event) {
				console.log(event.file);
				this.readContent(event).then(this.validate)
					.then(c => {
						this.$set(this, 'devices', this.translate(c));
					})
			},
            submit() {
				this.$model('devices').create(this.devices, {
					projectId: this.projectId
				})
					.then(res => {
						console.log(res);
						this.closeDialog();
					}).catch(err => {
					this.$message.error(`批量创建仪表失败。${err}`);
				})

			},
			downloadTemplate() {
				this.$message.info(`暂未实现。`);
            },
			closeDialog() {
				this.$modal.$emit('dismiss');
			},
		}
	};
</script>