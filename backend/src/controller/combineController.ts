import { RequestHandler } from "express";
import { Book } from "../model/bookModel.js";
import { Author } from "../model/authorModel.js";
import { Category } from "../model/categoryModel.js";
import sequelize from "sequelize";
import { where } from "../../node_modules/sequelize/types/sequelize.js";

export const combineBook:RequestHandler=async(req,res)=>{
    try {
        const books = await Book.findAll({
            attributes: ["id","title", "publication_date", "price","isbn"],
            include: [
              {
                model: Author,
                attributes: [["author_name", "author"]],
              },
              {
                model: Category,
                attributes: [["genre", "category"]],
              },
            ],
          });
          res.status(200).send({
            message: "Book details fetched successfully",
            success: true,
            data: books,
          })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}

export const createBook:RequestHandler=async(req,res)=>{
  try {
    const {title,publication_date,price,author,genre,isbn}=req.body;
    if (!title ||!publication_date ||!price ||!author ||!genre ||!isbn) {
      res.status(400).send({
        success: false,
        message: "All fields are required.",
      });
      return;
    }
    let name=await Author.findOne({where:{author_name:author}})
    if(!name){
      res.status(500).send({
        success: false,
        message: "Author not found.",
      })
      return;
    }

    let cat=await Category.findOne({where:{genre:genre}})
    if(!cat){
      res.status(500).send({
        success: false,
        message: "Category not found.",
      })
      return;
    }

    const book=await Book.create({
      title,
      isbn,
      publication_date,
      price,
      author_id:(name as {author_id:number}).author_id,
      category_id:(cat as {category_id:number}).category_id
    })
    res.status(200).send({
      message:"Book created successfully",
      data:book
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    })
  }
}

export const updateBook:RequestHandler=async(req,res)=>{
  console.log("HI from update");
  try {
    const {title,publication_date,price,author,genre,isbn}=req.body;
    const ISBN=req.params.id;
    const book=await Book.findOne({where:{isbn:ISBN}});

    if (!title ||!publication_date ||!price ||!author ||!genre ||!isbn) {
      res.status(400).send({
        success: false,
        message: "All fields are required.",
      });
      return;
    }

    if(!ISBN){
      res.status(400).send({
        success: false,
        message: "id is required.",
      });
      return;
    }

    if(!book){
      res.status(404).send({
        success: false,
        message: "Book not found.",
      });
      return;
    }

    const authors=await Author.findOne({where:{author_name:author}});
    if(!authors){
      res.status(404).send({
        success: false,
        message: "Author not found.",
      });
      return;
    }
    
    const authorId=(authors as {author_id:number}).author_id;
    const category=await Category.findOne({where:{genre:genre}})
    const categoryId=(category as {category_id:number}).category_id;

    const updatedBook=await Book.update(
      {title,isbn,publication_date,price,author_id:authorId,category_id:categoryId},
      {
        where:{
          isbn:ISBN
        }
    })
    res.status(200).send({
      message:"Book updated successfully"
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    })
  }
}
export const deleteBook:RequestHandler=async(req,res)=>{
  try {
    const ISBN=req.params.id;
    if(!ISBN){
      res.status(400).send({
        success: false,
        message: "id is required.",
      });
      return;
    }
    const book=await Book.findOne({where:{isbn:ISBN}});
    if(!book){
      res.status(404).send({
        success: false,
        message: "Book not found.",
      });
      return;
    }
    await Book.destroy({where:{isbn:ISBN}});
    res.status(200).send({
      message:"Book deleted successfully"
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    })
  }
}