const productModel = require("../models/productModel");
const {
  isValidTitle,
  isValidDescription,
  isValidPrice,
} = require("../validation/productValidation");

const { isValidObjectId } = require("../validation/validate")
const { uploadFile } = require("../aws/awsFileUpload");

const createProduct = async (req, res) => {
  try {
    let body = req.body;
    let { title, description, price, category } = body;
    let productImage = req.files;

    // if (!title && !description && !price && !category && !productImage)
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Please fill the mandetory details" });

    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "title is required !" });

    title = title.replace(/\s{2,}/g, ' ').trim();

    if (!isValidTitle(title))
      return res
        .status(400)
        .send({ staus: false, message: "please enter a valid title !" });

    body['title'] = title;

    const productDoc = await productModel.findOne({ title });

    if (productDoc)
      return res
        .status(409)
        .send({ status: false, message: "Please enter a Unique Title !" });

    if (!description)
      return res
        .status(400)
        .send({ status: false, message: "description is required !" });

    description = description.replace(/\s{2,}/g, ' ').trim();

    if (!isValidDescription(description))
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid description !" });

    body['description'] = description;

    if (!price)
      return res
        .status(400)
        .send({ status: false, message: "price is required !" });

    if (!isValidPrice(price))
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid Price !" });

    if (!category)
      return res
        .status(400)
        .send({ status: false, message: "Category is required !" });

    if (productImage.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Please Upload the product Image !" });

    if (productImage.length > 0) {
      if (
        productImage[0].mimetype == "image/jpeg" ||
        productImage[0].mimetype == "image/jpg" ||
        productImage[0].mimetype == "image/png"
      ) {
        const uploaded = await uploadFile(productImage[0]);
        productImage = uploaded;
      } else {
        return res
          .status(400)
          .send({
            status: false,
            message: "Product image should be in jpg, jpeg or png format !!",
          });
      }
    }

    body["productImage"] = productImage;

    const data = await productModel.create(body);

    return res
      .status(201)
      .send({ status: true, message: "Product Added successfully !", data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getProducts = async (req, res) => {

    try {
        const productDoc = await productModel.find({ isDeleted: false });
        const deletedProduct = await productModel.find({isDeleted : true});

        if (productDoc.length == 0)
            return res.status(400).send({ status: false, message: 'No Product Found !' });

        return res.status(200).send({ status: true, message: "Product find Successfully !", data: productDoc, inActiveProduct : deletedProduct.length });

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const getSingleProduct = async (req, res) => {

    try {
        const { productId } = req.params;

        if (!isValidObjectId(productId))
            return res.status(400).send({ status: false, message: "Invalid ProductId !" });

        const productDoc = await productModel.findById(productId);

        if (!productDoc)
            return res.status(400).send({ status: false, message: "No Product Found !" });

        return res.status(200).send({ status: true, message: "Success !", data: productDoc })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }

}

const updateSingleProduct = async (req, res) => {
  try {
    let body = req.body;
    const { productId } = req.params;
    let { title, description, price, category } = body;
    let productImage = req.files;
    let passData = {};

    if (!isValidObjectId(productId))
      return res
        .status(400)
        .send({ status: false, message: "Invalid ProductId !" });

    const isProductExist = await productModel.findById(productId);

    if (!isProductExist)
      return res
        .status(400)
        .send({ status: false, message: "No Product Found !" });

    if (title) {
      title = title.replace(/\s{2,}/g, " ").trim();
      if (!isValidTitle(title))
        return res
          .status(400)
          .send({ staus: false, message: "please enter a valid title !" });

      passData["title"] = title;
    }

    const productDoc = await productModel.findOne({ title });

    if (productDoc)
      return res
        .status(409)
        .send({ status: false, message: "Please enter a Unique Title !" });

    if (description) {
      description = description.replace(/\s{2,}/g, " ").trim();
      if (!isValidDescription(description))
        return res
          .status(400)
          .send({
            status: false,
            message: "Please enter a valid description !",
          });

      passData["description"] = description;
    }

    if (price) {
      if (!isValidPrice(price))
        return res
          .status(400)
          .send({ status: false, message: "Please enter a valid Price !" });

      passData["price"] = price;
    }

    if (category) {
      passData["category"] = price;
    }

    if (productImage && productImage.length > 0) {
      if (
        productImage[0].mimetype == "image/jpeg" ||
        productImage[0].mimetype == "image/jpg" ||
        productImage[0].mimetype == "image/png"
      ) {
        const uploaded = await uploadFile(productImage[0]);
        productImage = uploaded;
        passData["productImage"] = productImage;
      } else {
        return res
          .status(400)
          .send({
            status: false,
            message: "Product image should be in jpg, jpeg or png format !!",
          });
      }
    }

    const data = await productModel.findOneAndUpdate(
      { _id: productId },
      passData
    );

    return res
      .status(201)
      .send({ status: true, message: "Product Updated successfully !", data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}

const deleteSingleProduct = async (req, res) => {
  try {

      const {productId} = req.params;
      if (!isValidObjectId(productId))
        return res.status(400).send({ status: false, message: "Invalid ProductId !" });
    const isProductExist = await productModel.findOne({_id:productId, isDeleted : false});
    

    if (!isProductExist)
      return res.status(400).send({ status: false, message: "No Product Found or already has been deleted !" });
    
    const productDoc = await productModel.findByIdAndUpdate({_id : productId}, {$set : {isDeleted : true, deletedAt : Date.now()}})
    
    const deletedProduct = await productModel.find({isDeleted : true});

    return res.status(200).send({status : true, message : "Deleted SuccessFully !", inActiveProduct : deletedProduct.length})
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }



}

module.exports = { createProduct, getProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct };
