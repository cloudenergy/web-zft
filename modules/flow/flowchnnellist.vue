<template>
	<el-table :data="channelFlows" stripe>
		<el-table-column prop="timespan" label="日期" width="150">
		</el-table-column>
		<el-table-column prop="mountha" label="现金">
			<template slot-scope="scope">
                <div>
                    {{price(valueOf('channels.cash')(scope.row))}}
                </div>
            </template>
		</el-table-column>
		<el-table-column prop="mounthb" label="支付宝">
			<template slot-scope="scope">
                <div>
                  {{price(valueOf('channels.alipay')(scope.row))}}
                </div>
            </template>
		</el-table-column>
		<el-table-column prop="mounthc" label="微信">
			<template slot-scope="scope">
                <div>
                  {{price(valueOf('channels.wx')(scope.row))}}
                </div>
            </template>
		</el-table-column>
		<el-table-column prop="mounthd" label="微信公众号">
		</el-table-column>
		<el-table-column prop="mounthe" label="总计">
		</el-table-column>
	</el-table>
</template>

<script>
  import fp from 'lodash/fp'
	export default {
		props:{
			channelFlows:{
				type:Array
			}
		},
		data() {
			return {

			}
		},
		methods:{
			price(val) {
				return (val/100).toFixed(2)
			},
      valueOf(field) {
        return fp.getOr(0)(field)
      },
		},
		mounted() {

		}
	}
</script>
