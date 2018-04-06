;
(function (Vue) {
	const todos = JSON.parse(window.localStorage.getItem('todos') || '[]');
	Vue.directive('focus', {
		inserted: function (el) {
			el.focus();
		}
	});
	Vue.directive('editing-focus', {

		update(el, bool) {
			if (bool) {
				el.parentElement.parentElement.getElementsByClassName("edit")[0].focus();
			}
		}
	});
	window.hello = new Vue({
		el: '#my',
		data: {
			todos,
			currentItem: '',
			activeState: 'all',
		},
		computed: {
			allActive: {
				get: function () {
					return this.todos.every(item => item.state);
				},
				set: function (val) {
					this.todos.forEach(item=>item.state = val);

				}
			},
			leftCount: function () {
				return this.todos.filter(item => {
					return !item.state
				}).length;
			},
			filterTodos: function () {
				switch (this.activeState) {
					case 'active':
						return this.todos.filter(item => {
							return !item.state;
						});
						break;
					case 'completed':
						return this.todos.filter(item => {
							return item.state;
						});
						break;
					default:
						return this.todos;
				}
			}
		},

		watch: {
			todos: {
				handler: function (newTodos, oldTodos) {
					window.localStorage.setItem('todos', JSON.stringify(newTodos));
				},
				deep: true
			}
		},
		methods: {
			addTodo(event) {
				let da = event.target;
				let id = 0;
				if (this.todos.length != 0) {
					id = this.todos[this.todos.length - 1].id + 1
				} else {
					id = 1;
				}
				if (da.value != "") {
					let obj = {
						id: id,
						name: da.value,
						state: false
					};
					this.todos.push(obj);
					da.value = "";
				}
			},
			del(delindex) {
				this.todos.splice(delindex, 1);
			},
			clearCom() {

				// var tods = this.todos.filter((item, index) => {
				// 	return !item.state;
				// });
				// this.todos = tods;
				for (let i = this.todos.length - 1; i >= 0; i--) {
					if (this.todos[i].state) {
						this.todos.splice(i, 1);
					}
				}


			},
			save(index, event) {
				let value = event.target.value;
				if (value.length == 0) {
					this,
					todos.splice(index, 1);
				}
				else {
					this.todos[index].name = value;
					this.currentItem = '';
				}

			}
		}
	});
	window.onhashchange = function () {
		let hash = this.window.location.hash;
		hash = hash.substring(2) || 'all';
		window.hello.activeState = hash;

	}
})(Vue)
