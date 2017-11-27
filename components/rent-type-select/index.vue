<script>
    export default {
    	render() {
    		return (
    			<el-form-item label="方式">
    				<el-select
    					on-input={val => {
    						this.model = val;
    						this.$emit('input', val);
    					}}
    					value={this.model}
    				>
    					{this.all ? <el-option value="" label="全部" /> : ''}
    					<el-option value="1" label="整租" />
    					<el-option value="2" label="合租" />
    					<el-option value="3" label="整栋" />
    				</el-select>
    			</el-form-item>
    		);
    	},
    	data() {
    		return {
    			model: this.value
    		};
    	},
    	props: {
    		value: [String, Number],
    		all: {
    			type: Boolean,
    			default: false
    		}
    	}
    };
</script>
