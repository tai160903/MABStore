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
        const updatedProduct = await productModel.findByIdAndUpdate(
          { _id: id },
          data,
          { new: true }
        );
        return resolve({
          status: "OK",
          message: "SUCCESS",
          data: updatedProduct,
        });
      } catch (error) {
        reject(error);
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
          message: "DELETE SUCCESS",
        });
      } catch (error) {
        return reject(error);
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
        const totalProduct = await productModel.countDocuments();
        if (filter) {
          const label = filter[1];
          console.log("label", label);
          const allProductFilter = await productModel
            .find({ [label]: { $regex: filter[0] } })
            .limit(limit)
            .skip(page * limit);
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: allProductFilter,
            total: totalProduct,
            pageCurrent: Number(page + 1),
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
            .sort(objectSort);
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: allProductSort,
            total: totalProduct,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalProduct / limit),
          });
        }
        const allProduct = await productModel
          .find()
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProduct,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = productService;
