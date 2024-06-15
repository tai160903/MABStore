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
            status: "ERR",
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
          status: "ERR",
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
            status: "ERR",
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
          status: "ERR",
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
            status: "ERR",
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
          status: "ERR",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },

  getAllProduct: (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Build the query object
        let query = {};
        if (filter) {
          const [key, value] = filter;
          query[key] = value;
        }

        // Get the total count of products based on the query
        const totalProduct = await productModel.countDocuments(query);

        // Build the product query with limit and skip
        let productQuery = productModel
          .find(query)
          .limit(limit)
          .skip(page * limit);

        // Apply sorting if provided
        if (sort) {
          const [order, field] = sort;
          const sortOrder = order === "asc" ? 1 : -1;
          productQuery = productQuery.sort({ [field]: sortOrder });
        }

        // Execute the query
        const products = await productQuery;

        // Resolve with the response object
        resolve({
          status: "OK",
          message: "SUCCESS",
          // data: products,
          total: totalProduct,
          page: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      } catch (error) {
        reject({
          status: "ERR",
          message: "An error occurred!",
          error: error.message,
        });
      }
    });
  },
};

module.exports = productService;
