<template>
    <div class="house-profile">
        <el-row>
            <el-col :span="24">
                <el-form-item
                        prop="property.house"
                        :rules="[
      						{ required: true, message: '请选择房源', trigger: 'blur' }
    					]">
                    <div class="select-with-label el-input-group">

                        <span class="el-input-group__prepend">承租房源</span>
                        <el-select v-model="property.houseType" class="house-type">
                            <el-option label="全部" value="1"></el-option>
                            <el-option label="整租" value="2"></el-option>
                            <el-option label="合租" value="3"></el-option>
                            <el-option label="独栋" value="4"></el-option>
                        </el-select>
                        <el-autocomplete
                                class="inline-input prepend-label"
                                v-model="property.house"
                                :fetch-suggestions="querySearch"
                                placeholder="搜索房源编号、小区名称等关键字"
                                :trigger-on-focus="false"
                                @select="handleSelect">
                        </el-autocomplete>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	export default {
		props: {
			property: {
				required: true
			}
		},
		methods: {
			handleSelect(item) {
				console.log(item);
				return {};
			},
			querySearch(queryString, cb) {
				cb([
					{value: "房子1"},
					{value: "房子2"}
				]);
			}
		}
	}
</script>

<style lang="less" scoped>
    .house-type {
        width: 85px;
    }

    .inline-input {
        width: 100%;
        margin-left: 0;
    }

    .select-with-label {
        display: inline-table;
        .el-input__inner {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        .inline-input {
            display: table-cell;
            .el-input__inner {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
        }
    }
    .el-row {
        margin-top: 18px;
    }
</style>
<style lang="less">
    .select-with-label {
        .house-type .el-input__inner {
            border-radius: 0;
        }
        .inline-input .el-input__inner {
            border-left: none;
        }
    }
    .house-profile .el-form-item--mini .el-form-item__error {
        padding-left: 190px;
    }
</style>
