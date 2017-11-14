import Vue from 'vue';
import Modal from './modal';

export default {
	open(component) {
		const propsData = {
			programmatic: true,
			component
		};

		const ModalComponent = Vue.extend(Modal);
		return new ModalComponent({
			el: document.createElement('div'),
			propsData
		});
	}
};
