/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('has populated URLs', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).toBeGreaterThan(0);
      }
    });

    it('has populated names', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).toBeGreaterThan(0);
      }
    });
  });

  describe('The menu', function() {

    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    it('toggles visibility when the menu icon is clicked', function() {
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);

      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('loads at least one entry in the feed', function(done) {
      expect($('.entry').length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    var before;
    beforeEach(function(done) {
      loadFeed(0, function() {
        before = $('.feed').html();
        loadFeed(1, done);
      });
    });

    it('should change the contents of the feed', function(done) {
      expect($('.feed').html()).not.toBe(before);
      done();
    });
  });
}());
