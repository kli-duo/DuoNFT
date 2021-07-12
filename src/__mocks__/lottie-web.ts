// We can't automatically generate a mock using jest.genMockFromModule() here,
// since accessing the original module will trigger a side-effect
// where we try to use the Canvas API, which is not mocked by jsdom.
// See:
// https://github.com/airbnb/lottie-web/blob/411a0d9a2072f263ae6274f6a042f919fd9ec86f/player/js/utils/imagePreloader.js#L3-L11
// https://github.com/felippenardi/lottie-react-web/issues/21

const Lottie = {
  loadAnimation: jest.fn(() => ({
    addEventListener: jest.fn(),
    destroy: jest.fn(),
    goToAndStop: jest.fn(),
    playSegments: jest.fn(),
    removeEventListener: jest.fn(),
  })),
};

export default Lottie;
