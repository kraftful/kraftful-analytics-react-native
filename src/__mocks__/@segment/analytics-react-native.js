const mockClient = {
  track: jest.fn(),
  identify: jest.fn(),
};

const mockApi = {
  createClient: jest.fn().mockReturnValue(mockClient),
};

export default mockApi;
