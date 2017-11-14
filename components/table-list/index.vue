<template>
    <table class="el-table">
        <thead>
        <tr>
            <Cell v-for="item in captions" :text="item.text" :attr="item.attr" :key="item.key"/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in rows">
            <Cell v-for="col in captions" :text="item[col.key]" :key="col.key"/>
        </tr>
        </tbody>
    </table>
</template>

<script>
const Cell = {
    name: 'Cell',
    props: {
        text: {required: true},
        attr: Object
    },
    render() {
        const attr = JSON.stringify(this.attr);
        return attr ? (
            <td {...JSON.parse(attr)} > {this.text }</td>
        ): (
            <td> {this.text} </td>
        );
    }
};

export default {
    props: {
        columns: Array,
        rows: Array
    },
    components: {
        Cell
    },
    data() {
        return {
            captions: []
        };
    },
    created() {
        this.captions = this.columns;
    }
};
</script>

<style lang="less" scoped>
    table {
        margin: 20px auto;
        width: 100%;
    }

    thead td {
        color: @dark;
    }

    table td {
        border: 1px solid @light;
        border-collapse: collapse;
        padding: 16px 10px;
    }
</style>