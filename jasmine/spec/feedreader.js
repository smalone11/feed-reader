// feedreader.js

$(function() {
    /* The first suite tests to make sure the defined RSS feeds
     * stored in allFeeds have a name and url.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test makes sure each feed in allFeeds has a url
         * associated with it and is not empty.
         */
        it('URLs are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* This test makes sure each feed in allFeeds has a name
         * associated with it and is not empty.
         */
        it('names are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    /* The second test suite makes sure the menu is hidden
     * when the site starts up and that the hamburger button
     * works properly.
     */
    describe("The menu", function () {
        /* This test makes sure the menu is hidden at startup.
         */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test suite makes sure that the menu displays and hides
         * when the hamburger button is clicked on.
         */
        describe('icon', function () {
            /* Triggers the on click function before that has been created in
             * app.js before each test.
             */
            beforeEach(function () {
                $('.menu-icon-link').trigger('click');
            });

            /* Checks that the menu displays when the hamburger icon is
             * clicked on and the menu was hidden.
             */
            it('is clicked and displays', function () {
                expect($('body').hasClass('menu-hidden')).toBeFalsy();
            });

            /* Checks that the menu hides when the hamburger icon is
             * clicked on and the menu was displayed.
             */
            it('is clicked and hides', function () {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });

    /* The third test suite makes sure that the feed being loaded
     * has at least one entry to display.
     */
    describe("Initial Entries", function () {
        /* Waits until the initial feed is loaded before running the
         * test.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* Checks that the feed being loaded has one or moe entries.
         */
        it('has at least one entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* The fourth test suite makes sure that when a new feed has
     * been loaded that the entries displayed have actually changed.
     */
    describe("New Feed Selection", function () {
        /* Before the test is run the html in the feed <div> is saved
         * in the variable feedEntries.
         */
        var feedEntries;

        beforeEach(function () {
            feedEntries = $('.feed').html();
        });

        /* This test loads a different feed from the startup and compares
         * the html in the feed <div> to the one saved in feedEntries. The
         * test passes if they are different.
         */
        it('is loaded and entries change', function (done) {
            loadFeed(1, function() {
                expect($('.feed').html()).not.toEqual(feedEntries);
                done();
            });
        });
    });
}());
