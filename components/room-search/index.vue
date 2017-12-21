<script>
    import modelSelect from '../model-select';

    const area = [
    	{ value: 1, label: '全部' },
    	{ value: 2, label: '公区' },
    	{ value: 3, label: '房间' }
    ];

    export default modelSelect(area, { placeholder: '区域' });
</script>