let location;

export function draggable(node, data) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handle_dragstart(e) {
		e.dataTransfer.setData('text/plain', state);
	}

	node.addEventListener('dragstart', handle_dragstart);

	return {
		update(data) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', handle_dragstart);
		}
	};
}

export function dropzone(node, options) {
	let state = {
		dropEffect: 'move',
		dragover_class: 'droppable',
		...options
	};

	function handle_dragenter(e) {
		e.target.classList.add(state.dragover_class);
	}

	function handle_dragleave(e) {
		e.target.classList.remove(state.dragover_class);
	}

	function handle_dragover(e, loc) {
		e.preventDefault();
		location = loc;
		e.dataTransfer.dropEffect = state.dropEffect;
		console.log(location);
	}

	function handle_drop(e) {
		e.preventDefault();
		const data = e.dataTransfer.getData('text/plain');
		e.target.classList.remove(state.dragover_class);
		state.on_dropzone(data, e);
		console.log(e.target.parentNode.parentNode);
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);
}
