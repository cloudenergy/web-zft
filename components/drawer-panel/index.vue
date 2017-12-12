<script>
    export default {
    	props: {
    		direction: {
    			type: String,
    			default: 'right'
    		},
    		width: {
    			type: String,
    			default: '768px'
    		},
    		open: {
    			type: Boolean,
    			default: false
    		}
    	},
    	watch: {
    		open(val) {
    			this.isActive = val;
    		}
    	},
    	data() {
    		return {
    			isActive: this.open
    		};
    	},
    	render() {
    		const contentStyle = {
    			style: {
    				width: this.width
    			}
    		};
    		const panelStyle = {
    			class: this.isActive
    				? [this.direction, 'active']
    				: [this.direction],
    			...contentStyle
    		};

    		const maskStyle = {
    			style: {
    				display: this.isActive ? 'block' : 'none'
    			}
    		};

    		return (
    			<div class="detail-panel" {...panelStyle}>
    				<div
    					class="panel-mask"
    					{...maskStyle}
    					onClick={() => {
    						this.isActive = false;
    						this.$emit('update:open', false);
    					}}
    				/>
    				<div class="panel-content" {...contentStyle}>
    					{this.$slots.default}
    				</div>
    			</div>
    		);
    	}
    };
</script>

<style lang="less" scoped>
    .detail-panel {
    	position: fixed;
    	right: -100%;
    	top: 0;
    	height: 100%;
    	z-index: 200;
    	overflow-x: hidden;
    	transition: right 0.3s ease-in;

    	.panel-mask {
    		width: 100%;
    		height: 100%;
    		background: fade(black, 40);
    		position: fixed;
    		top: 0px;
    		left: 0px;
    		z-index: 201;
    	}

    	&.active {
    		right: 0px;
    	}

    	.panel-content {
    		height: 100%;
    		width: 100%;
    		background: #fff;
    		position: relative;
    		z-index: 202;
    	}
    }
</style>

