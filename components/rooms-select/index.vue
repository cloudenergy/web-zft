<script>
    import modelSelect from '../model-select';

    const rooms = [
        { value: 0, label: '全部' },
    	{ value: 1, label: '一室' },
    	{ value: 2, label: '两室' },
    	{ value: 3, label: '三室' },
    	{ value: 4, label: '四室' }
    ];

    export default modelSelect(rooms, { placeholder: '房型' });
</script>