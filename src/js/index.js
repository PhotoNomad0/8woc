(function() {
	var ReactDOM = require('react-dom');
	var React = require('react');
	 
	var Test = require('./test');
	// var FileUpload = require('./fileupload');

	var App = {
		init: function() {
			ReactDOM.render(<Test text="Wassup" />,	document.getElementById('app'));
		},

		Test: Test
	};

	window.App = App;
})();
