// Describe a feature
describe('Becoming Awesome', function(){
        it('should start out not very awesome', function(){
                var awesomeStatus = element(by.id('awesomeStatus'));
                expect(awesomeStatus.getText()).toContain('I am not awesome');
        });
});
