<script>
    import modelSelect from '../model-select';
    const options = [
    	{ value: 'all', label: '全部' },
    	{ value: 'artificial', label: '人工' },
    	{ value: 'automatic', label: '自动' },
    ];
    export default modelSelect(options, { placeholder: '操作方式' });
</script>
