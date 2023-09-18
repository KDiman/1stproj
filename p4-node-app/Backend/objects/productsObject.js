const ProductsModel = require("../models/products.entity");
const mongoose = require("mongoose")




class Products {
  constructor() { }

  async findAllProducts() {
    try {
      return await ProductsModel.find();
    } catch (error) {
      console.error("Error finding all Products:", error);
      throw error;
    }
  }
  


  async findActiveProducts() {
    try {
      return await ProductsModel.find({ isActive: true });
    } catch (error) {
      console.error("Error finding active Products:", error);
      throw error;
    }
  }
  async findInActiveProducts() {
    try {
      return await ProductsModel.find({ isActive: false });
    } catch (error) {
      console.error("Error finding active Products:", error);
      throw error;
    }
  }

  async addProducts(req, productData) {
    try {
      const { Image, Name, Brand, Type, Category, Description, Size, Price, Stock } = productData;
      const newProduct = new ProductsModel({ Image, Name, Brand, Type, Category, Description, Size, Price, Stock });
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      console.error("Error creating Product:", error);
      throw error;
    }
  }

  async findProductById(productId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid productId format");
      }

      const product = await ProductsModel.findById(productId);

      if (!product) {
        return null;
      }

      return product;
    } catch (error) {
      console.error("Error finding product by ID:", error);
      throw error;
    }
  }


  async updateProduct(productId, updatedData) {
    try {

      const productToUpdate = await ProductsModel.findById(productId);

      if (!productToUpdate) {
        throw new Error(`Product with ID '${productId}' not found`);
      }


      if (updatedData.Image) {
        productToUpdate.Image = updatedData.Image;
      }
      if (updatedData.Name) {
        productToUpdate.Name = updatedData.Name;
      }
      if (updatedData.Brand) {
        productToUpdate.Brand = updatedData.Brand;
      }
      if (updatedData.Type) {
        productToUpdate.Type = updatedData.Type;
      }
      if (updatedData.Category) {
        productToUpdate.Category = updatedData.Category;
      }
      if (updatedData.Description) {
        productToUpdate.Description = updatedData.Description;
      }
      if (updatedData.Size) {
        productToUpdate.Size = updatedData.Size;
      }
      if (updatedData.Price) {
        productToUpdate.Price = updatedData.Price;
      }
      if (updatedData.Stock) {
        productToUpdate.Stock = updatedData.Stock;
      }



      const updatedProduct = await productToUpdate.save();
      return updatedProduct;
    } catch (error) {
      console.error("Error updating Product:", error);
      throw error;
    }
  }

  async updateIsActiveToFalse(productId) {
    try {
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        productId,
        { $set: { isActive: false } },
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error(`Product with ID '${productId}' not found`);
      }

      return updatedProduct;
    } catch (error) {
      console.error("Error updating isActive:", error);
      throw error;
    }
  }
  async updateIsActiveToTrue(productId) {
    try {
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        productId,
        { $set: { isActive: true } },
        { new: false }
      );

      if (!updatedProduct) {
        throw new Error(`Product with ID '${productId}' not found`);
      }

      return updatedProduct;
    } catch (error) {
      console.error("Error updating isActive:", error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const productToDelete = await ProductsModel.findByIdAndDelete(productId);

      if (!productToDelete) {
        throw new Error(`Product with ID '${productId}' not found`);
      }

      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  async updateOutOfStockToFalse(productId) {
    try {
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        productId,
        { $set: { OutOfStock: false } },
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error(`Product with ID '${productId}' not found`);
      }

      return updatedProduct;
    } catch (error) {
      console.error("Error updating out of stock status:", error);
      throw error;
    }
  }
  async updateOutOfStockToTrue(productId) {
    try {
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        productId,
        { $set: { OutOfStock: true } },
        { new: false }
      );

      if (!updatedProduct) {
        throw new Error(`Product with ID '${productId}' not found`);
      }

      return updatedProduct;
    } catch (error) {
      console.error("Error updating out of stock status", error);
      throw error;
    }
  }

  async findActiveProductsByName(partialName, category = '') {
    try {
      const nameRegex = new RegExp(partialName, 'i');
      const query = { Name: nameRegex, isActive: true };
  
      if (category) {
        query.Category = category; 
      }
  
      return await ProductsModel.find(query);
    } catch (error) {
      console.error("Error finding active Products:", error);
      throw error;
    }
  }
  

}


module.exports = Products