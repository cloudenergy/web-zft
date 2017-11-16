import Vue from 'vue';
import Modal from './modal';

function mount() {
	const propsData = { programmatic: true, component };

	const ModalComponent = Vue.extend(Modal);
	return new ModalComponent({
		el: document.createElement('div'),
		propsData
	});
}

const mixins = {
	methods: {
		close() {
			this.$emit('close');
		}
	}
};

function open(opts) {
	opts.mixins = opts.mixins ? opts.mixins.concat(mixins) : [mixins];
	const instance = new Vue(opts);
	instance.$mount(document.createElement('div'));
	document.body.appendChild(instance.$el);

	return new Promise((resolve, reject) => {
		instance.$on('close', event => {
			resolve();
			instance.$destroy();
			instance.$el.remove();
		});
	});
}

export default {
	open
};
