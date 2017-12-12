<script>
    import modelSelect from '../model-select';
    const options = [
    	{ value: 'all', label: '全部' },
    	{ value: 'lease', label: '租约' },
    	{ value: 'bookkeeping', label: '记账' },
    	{ value: 'refunds', label: '退款' }
    ];
    export default modelSelect(options);
</script>
