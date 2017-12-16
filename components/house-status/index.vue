<script>
    import modelSelect from '../model-select';
    const options = [
    	{ value: 'all', label: '全部' },
    	{ value: 'lease', label: '在租' },
    	{ value: 'due', label: '逾期' },
    	{ value: 'idle', label: '空置' },
    	{ value: 'closed', label: '关闭' }
    ];
    export default modelSelect(options, { placeholder: '房源状态' });
</script>