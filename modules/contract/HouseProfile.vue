<template>
    <div class="house-profile">
        <el-row>
            <el-col :span="24">
                <el-form-item prop="property.house" :rules="[
      						{ required: true, message: '请选择房源', trigger: 'blur' }
    					]">
                    <div class="select-with-label el-input-group">

                        <span class="el-input-group__prepend">承租房源</span>
                        <el-select v-model="property.houseType" class="house-type" :disabled="property.disabled">
                            <el-option label="整租" value="SOLE"></el-option>
                            <el-option label="合租" value="SHARE"></el-option>
                            <el-option label="整幢" value="ENTIRE"></el-option>
                        </el-select>
                        <el-autocomplete class="inline-input prepend-label" v-model="property.house" :fetch-suggestions="querySearch" placeholder="搜索房源编号、小区名称等关键字"
                            :trigger-on-focus="false" @select="handleSelect" :disabled="property.disabled">
                        </el-autocomplete>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import _ from 'lodash'
    import fp from 'lodash/fp'

    export default {
        props: {
            property: {
                required: true
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId;
            }
        },
        methods: {
            translate(res) {
                return {
                    value: `${res.locationName} ${res.building}幢 ${res.unit}单元 ${res.roomNumber} ${res.roomName}`,
                    id: res.id,
                    houseId: res.houseId
                }
            },
            filterFreeRoom(room) {
                return room.status === 'IDLE'
            },
            handleSelect(item) {
                this.property.roomId = item.id
                this.$emit('roomChange', item.houseId)
            },
            querySearch(q, cb) {
                const projectId = this.projectId;
                this.$model('rooms').query({
                        houseFormat: this.property.houseType,
                        q,
                        size: 100
                    }, {
                        projectId
                    })
                    .then(data => {
                        const rooms = _.get(data, 'data', []);
                        const displayRooms = fp.map(this.translate)(rooms)
                        cb(displayRooms);
                    })
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