var app = {};

app.Todo = Backbone.Model.extend({
	defaults: {
		title: "titre",
		completed: false
	}
});

app.TodoList = Backbone.Collection.extend({
	model: app.Todo,
	url: "/todos",
	localstorage: new Backbone.LocalStorage('backbone-todo')
});

app.todoList = new app.TodoList();

app.TodoView = Backbone.View.extend({
	tagName: 'li',
	template: _.template( $('#item-template').html() ),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

app.AppView = Backbone.View.extend({
	el: '#todoapp',
	initialize: function () {
        this.input = this.$('#new-todo');
        app.todoList.on('add', this.addAll, this);
        app.todoList.on('reset', this.addAll, this);
        app.todoList.fetch(); // Loads list from local storage
      },
      events: {
        'keypress #new-todo': 'createTodoOnEnter',
        'click .btn': 'ajouter'
      },
      ajouter: function(){
      	var a = $('#new-todo').val();
      	$('#todo-list').append(a);
      },
      createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
          return;
        }
        app.todoList.create(this.newAttributes());
        this.input.val(''); // clean input box
      },
      addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#todo-list').html(''); // clean the todo list
        app.todoList.each(this.addOne, this);
      },
      newAttributes: function(){
        return {
          title: this.input.val().trim(),
          completed: false
        }
      }
});

app.appView = new app.AppView();