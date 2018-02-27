<script>
    import modelSelect from '../model-select';
    const options = [
    	{ value: 'all', label: '全部' },
    	{ value: 'ONGOING', label: '在租' },
    	{ value: 'EXPIRED', label: '逾期' },
    	{ value: 'IDLE', label: '空置' },
    	{ value: 'CLOSED', label: '关闭' }
    ];
    export default modelSelect(options, { placeholder: '房源状态' });
</script>
<style scoped>
	.select>div>input{
		height: 35px;
	}
</style>
