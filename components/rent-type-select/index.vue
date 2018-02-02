<script>
    import { mapState } from 'vuex';

    export default {
    	computed: {
    		...mapState({
    			houseTypes: state => state.houseTypes
    		})
    	},
    	render() {
    		return (
					<el-select
						style="width:145px"
    					on-input={val => {
    						this.model = val;
    						this.$emit('input', val);
    					}}
    					value={this.model}
    				>
    					{this.all ? <el-option value="" label="全部" /> : ''}
    					{Object.keys(this.houseTypes).map(key => {
    						return (
    							<el-option
    								value={this.houseTypes[key][0]}
    								label={this.houseTypes[key][1]}
    							/>
    						);
    					})}
    				</el-select>
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
