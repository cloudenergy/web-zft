<script>
    const TYPE_SOLE = 'sole';
    const TYPE_SHARE = 'share';
    const TYPE_ENTIRE = 'entire';

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
                        <el-option value={TYPE_SOLE} label="整租" />
                        <el-option value={TYPE_SHARE} label="合租" />
                        <el-option value={TYPE_ENTIRE} label="整栋" />
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
