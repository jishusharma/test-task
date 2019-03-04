let assert = require('assert');
var  MainPage  = require('./pageObjects/mainPage.js').MainPage;
const puppeteer = require('puppeteer');


describe('Search Scenarios', async () => {
    var main;
    var searchPageResult;
    before("Prepare", async () => {
        main = new MainPage();

    });
    it('Website search for not existing', async () => {
        await main.open();
        await main.showSearchInput();
        await main.typeToSearchInput("NFLFake");


        searchPageResult = await main.proceedToResultPage();
        var message = await searchPageResult.getEmptyListMessage(3000);
        assert(message.length > 0);
        var count = await searchPageResult.getArticlesCount(0);
        assert(count == 0);
        main.close();

    }).timeout(0);

    it('Website search for existing', async () => {
        await main.open();
        await main.showSearchInput();
        await main.typeToSearchInput("NFL");


        searchPageResult = await main.proceedToResultPage();
        var message = await searchPageResult.getEmptyListMessage(3000);
        assert(message.length == 0);
        var count = await searchPageResult.getArticlesCount(0);
        assert(count > 0);
        main.close();
    }).timeout(0);


});