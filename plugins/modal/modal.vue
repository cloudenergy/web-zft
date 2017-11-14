<template>
    <transition :name="animation">
        <el-dialog title="标题" :visible.sync="isActive" width="30%">
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