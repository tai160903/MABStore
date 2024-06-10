const productModel = require("../models/product");
const productService = {
  createProduct: (newProduct) => {
    return new Promise(async (resolve, reject) => {
      const {
        name,
        image,
        category,
        quantity,
        rating,
        weight,
        brand,
        price,
        description,
      } = newProduct;
      try {
        const checkProduct = await productModel.findOne({
          name: name,
        });
        if (checkProduct !== null) {
          resolve({
            status: "OK",
            message: "The product is exist already",
          });
        }
        const createProduct = await productModel.create({
          name,
          image,
          category,
          quantity,
          rating,
          weight,
          brand,
          price,
          description,
        });
        if (createProduct) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createProduct,
          });
        }
      } catch (error) {}
    });
  },

  updateProduct: (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkProduct = await productModel.findOne({ _id: id });
        if (checkProduct === null) {
          return resolve({
            status: "FAILED",
            message: "Product is not defined!",
          });
        }
        const updateProduct = await productModel.findByIdAndUpdate(
          { _id: id },
          data,
          {
            new: true,
          }
        );
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: updateProduct,
        });
      } catch (error) {
        return reject({
          status: "FAILED",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },

  deleteProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkProduct = await productModel.findOne({ _id: id });
        if (checkProduct === null) {
          return resolve({
            status: "FAILED",
            message: "Product is not defined!",
          });
        }
        await productModel.findByIdAndDelete({ _id: id });
        return resolve({
          status: "OK",
          message: "SUCCESS",
        });
      } catch (error) {
        return reject({
          status: "FAILED",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },

  detailProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await productModel.findOne({ _id: id });
        if (product === null) {
          return resolve({
            status: "FAILED",
            message: "Can not find user!",
          });
        }

        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: product,
        });
      } catch (error) {
        return reject({
          status: "FAILED",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },

  getAllProduct: (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        const totalProduct = await productModel.count();
        if (filter) {
          const label = filter[0];
          const allObjectFilter = await productModel
            .find({
              [label]: filter[1],
            })
            .limit(limit)
            .skip(page * limit);
          return resolve({
            status: "OK",
            message: "SUCCESS",
            data: allObjectFilter,
            total: totalProduct,
            page: Number(page + 1),
            totalPage: Math.ceil(totalProduct / limit),
          });
        }
        if (sort) {
          const objectSort = {};
          objectSort[sort[1]] = sort[0];
          const allProductSort = await productModel
            .find()
            .limit(limit)
            .skip(page * limit)
            .sort({
              objectSort,
            });
          return resolve({
            status: "OK",
            message: "SUCCESS",
            data: allProductSort,
            total: totalProduct,
            page: Number(page + 1),
            totalPage: Math.ceil(totalProduct / limit),
          });
        }
        const allProduct = await productModel
          .find()
          .limit(limit)
          .skip(page * limit);

        console.log("allProduct", allProduct);
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProduct,
          total: totalProduct,
          page: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      } catch (error) {
        return reject({
          status: "FAILED",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },
};

module.exports = productService;
