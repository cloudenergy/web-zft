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
            <el-button type="secondary" @click="exportData()">导 出</el-button>
        </div>
    </div>
</template>

<script>
import XLSX from 'xlsx';
import fp from 'lodash/fp';
const HEADER_1 = ['仪表ID',	'所属公寓', '备注信息',	'驱动编号']
const BODY_DEMO_1 = ['001234567890','古鸽公寓',',实际导入请删除这一行', 1]
const HEADER_2 = ['驱动编码','驱动名称','驱动说明']
const BODY_DEMO_2 = [[1,'YTL/Electric/YTL-BUSvA.1.02.js','WIFI表控制驱动'],
                    [2, 'HaiXing/Electric/Q-GDW-2013.js', '单相控制电表']]
const DB_KEY= ['deviceId', 'name', 'memo','driver']

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
			if (!fp.isEqual(fp.head(content), HEADER_1)) {
				this.$message.error('列名错误，请下载使用模版重新导入。');
				this.fileList = [];
				this.devices = [];
				return [];
			}
			return fp.drop(1)(content);
		},
		request(event) {
			this.readContent(event).then(this.validate)
				.then(c => {
					this.$set(this, 'devices', fp.map(
            fp.pipe(
              fp.zipObject(DB_KEY),
              fp.update('driver', driverIdToName)
            ),
            c));
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
    exportData() {
      const DB_HEADER_MAP = fp.zipObject(DB_KEY, HEADER_1)
      const wb = XLSX.utils.book_new();
      this.$model('devices').query({mode: 'ALL'}, {projectId: this.projectId})
        .then(fp.map(fp.pipe(
          fp.pick(DB_KEY),
          fp.update('driver', driverNameToId),
          fp.mapKeys((key)=>DB_HEADER_MAP[key]),
        )))
        .then(fp.curryRight(XLSX.utils.json_to_sheet.bind(XLSX.utils))({header: HEADER_1}))
        .then(worksheet=>{
          XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1")
          let worksheet2 = XLSX.utils.aoa_to_sheet([HEADER_2].concat(BODY_DEMO_2))
          XLSX.utils.book_append_sheet(wb, worksheet2, '驱动列表');
        })
        .then(()=>XLSX.writeFile(wb, "仪表导出.xlsx"))
    },
		downloadTemplate() {
			const worksheet = XLSX.utils.aoa_to_sheet(HEADER_1, BODY_DEMO_1)
			const wb = XLSX.utils.book_new()
			XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1")
      const worksheet2 = XLSX.utils.aoa_to_sheet([HEADER_2].concat(BODY_DEMO_2))
      XLSX.utils.book_append_sheet(wb, worksheet2, '驱动列表')
			XLSX.writeFile(wb, "仪表导入模板.xlsx")
		},
		closeDialog() {
			this.$modal.$emit('dismiss');
		},
	}
};

function driverNameToId(name) {
  return fp.find(x=>x[1]==name, BODY_DEMO_2)[0]
}

function driverIdToName(id) {
  return fp.find(x=>x[0]==id, BODY_DEMO_2)[1]
}
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
