<template>
    <div class="modal import-devices">
        <el-upload
                class="upload-xlsx"
                ref="upload"
                action=""
                :limit="1"
                accept=".xlsx"
                :http-request="request"
                :file-list="fileList"
                :on-exceed="onExceed"
        >
            <el-button slot="trigger" class="select-file" size="small" type="primary">选择文件</el-button>
            <el-button class="download-template" size="small" type="success" @click="downloadTemplate">下载模版
            </el-button>
        </el-upload>
        <!--<p v-for="d in devices">{{d.deviceId}} - {{d.memo}}</p>-->
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog()">取 消</el-button>
            <el-button type="primary" @click="submit()">导 入</el-button>
        </div>
    </div>
</template>

<script>
	import XLSX from 'xlsx';
	import fp from 'lodash/fp';
	export default {
		data() {
			return {
				devices: [],
				fileList: [],
			};
		},
		created() {
			this.projectId = this.$store.state.userInfo.user.projectId;
		},
		methods: {
			onExceed(file,) {
				this.fileList = [file.item(0)];
				this.request({file: file.item(0)});
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
					this.fileList = [];
					this.devices = [];
					return [];
				}
				return fp.drop(1)(content);
			},
			translate(content) {
				return fp.map(([id, memo='']) => ({
					deviceId: fp.padCharsStart('0')(12)(id),
					memo
				}))(content);
			},
			request(event) {
				this.readContent(event).then(this.validate)
					.then(c => {
						this.$set(this, 'devices', this.translate(c));
					}).catch(err => console.log(err));
			},
			submit() {
				if (fp.isEmpty(this.devices)) {
					this.$message.info(`请选择需要导入的仪表信息文件。`);
					return;
				}
				this.$model('devices').create(this.devices, {
					projectId: this.projectId
				})
					.then(() => {
						this.closeDialog();
					}).catch(err => {
					this.$message.error(`批量创建仪表失败。${err.message}\n${fp.get('result.message')(err)}`);
				})

			},
			downloadTemplate() {
				const worksheet = XLSX.utils.aoa_to_sheet(["仪表ID,备注信息".split(","), "001234567890,实际导入请删除这一行".split(",")]);
				const wb = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");
				XLSX.writeFile(wb, "仪表导入模板.xlsx");
			},
			closeDialog() {
				this.$modal.$emit('dismiss');
			},
		}
	};
</script>

<style lang="less" scoped>
    .dialog-footer {
        position: absolute;
        bottom: 20px;
    }

    .download-template {
        margin-left: 50px;
    }
</style>

<style lang="less">
    .new-devices .el-dialog {
        width: 370px;
        height: 200px;
    }

</style>
