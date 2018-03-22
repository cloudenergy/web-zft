<script>
    import modelSelect from '../model-select';
    const options = [{
            value: 'all',
            label: '全部'
        },
        {
            value: 'PENDING',
            label: '等待处理'
        }, {
            value: 'AUDITFAILURE',
            label: '审核失败'
        }, {
            value: 'PROCESSING',
            label: '处理中'
        }, {
            value: 'PROCESSFAILURE',
            label: '处理失败'
        }, {
            value: 'DONE',
            label: '完成'
        }
    ];
    export default modelSelect(options, {
        placeholder: '提现状态'
    });
</script>