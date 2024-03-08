import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const getAllCategories = asyncHandler(async (req, res) => {
  let categories = JSON.parse(JSON.stringify(await Category.findAll({
    attributes: [
      'id',
      'name',
      'alias'
    ]
  })));

  if(!categories)
    throw new Error('Unable to fetch categories. Some error occured!');

  return res.status(200)?.json({
    success: true,
    categories,
    msg: "All categories have been fetched successfully."
  });
});

const createNewCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  let alias = name?.split(" ")?.join("-")?.toLowerCase();

  let newCategory = JSON.parse(JSON.stringify(await Category.create({
    name,
    alias
  })));

  if(!newCategory) {
    throw new Error("Unable to create category. Some error occured!");
  }

  return res.status(201)?.json({
    success: true,
    category: newCategory,
    msg: "A new category has been created successfully."
  });
});

export {
  getAllCategories,
  createNewCategory
}