<script>
    import modelSelect from '../model-select';
    const options = [
    	{ value: 'all', label: '全部' },
    	{ value: 'waiting', label: '正在处理' },
    	{ value: 'error', label: '处理失败' },
    	{ value: 'success', label: '成功' }
    ];
    export default modelSelect(options);
</script>