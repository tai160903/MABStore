const homeService = {
  register: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve({});
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = homeService;
