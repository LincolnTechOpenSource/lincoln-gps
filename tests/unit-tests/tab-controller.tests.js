// tab-controller.tests.js

describe('TabCtlr', function() {

  var controller,
    deferredLogin,
    AuthMock,
    stateMock,
    ionicModalMock,
    ionicLoadingMock;

  // Load the App Module
  beforeEach(module('lincoln-gps'));

  // TODO: Instantiate the Controller and Mocks

  describe('#doLogin', function() {

    // TODO: Call doLogin on the Controller

    it('should call login on firebase auth service', function() {
      expect(AuthMock.$signInWithEmailAndPassword).toHaveBeenCalledWith('test1', 'password1');
      expect(ionicLoadingMock.show).toHaveBeenCalledWith({
        template: 'Signing In...'
      });
    });

    describe('when the login is executed,', function() {
      it('if successful, should hide the modal', function() {

        // TODO: Mock the login response from DinnerService

        expect(ionicModalMock.hide).toHaveBeenCalled();
        expect(ionicLoadingMock.hide).toHaveBeenCalled();
      });

      it('if unsuccessful, should show a popup', function() {

        // TODO: Mock the login response from DinnerService
        expect(console.log).toHaveBeenCalled();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicLoadingMock.hide).toHaveBeenCalled();
      });
    });
  })
});