<template>
    <button @click="change"></button>
</template>

<script>
    import fp from 'lodash/fp'
    import _ from 'lodash'
    export default {
        data() {
            return {
                list: {
                    OTHER2: [{                    
                        type: 'OTHER2',
                        price: 100                
                    }],
                    ELECTRIC:[{
                        type: 'ELECTRIC',
                        price: 4
                    }],
                },
                list2:''
            }
        },
        methods: {
            change(){
                this.list2=_(this.list).mapValues((v)=>_.get(v,'[0]',{})).value()
                console.log(this.list2)
            }
        }
    };
</script>

<style>

</style>