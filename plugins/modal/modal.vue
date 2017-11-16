<template>
    <transition :name="animation">
        <el-dialog :title="title" :visible.sync="isActive">
            <component v-if="component" v-bind="props" :is="component" @close="close"></component>
        </el-dialog>
    </transition>
</template>

<script>
    import ModalMixin from './mixin';
    export default {
    	name: 'modal',
    	mixins: [ModalMixin]
    };
</script>