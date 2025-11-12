// Optional mock API to simulate latency for demos only
export const mockAPI = {
  async simulate(result, delay = 400) {
    await new Promise((r) => setTimeout(r, delay));
    return result;
  },
  async simulateError(message = 'Mock error', delay = 400) {
    await new Promise((r) => setTimeout(r, delay));
    throw new Error(message);
  },
};
