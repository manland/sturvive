var dependencies = [
	'main'
];

define(dependencies, function() {

	describe('in main', function() {


		beforeEach(function() {
		});

		it('should have a window.alert function', function () {
			expect(window.alert).toBeDefined();
		});

	});

});