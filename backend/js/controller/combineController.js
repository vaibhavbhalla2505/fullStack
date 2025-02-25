var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Book } from "../model/bookModel.js";
import { Author } from "../model/authorModel.js";
import { Category } from "../model/categoryModel.js";
export const combineBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book.findAll({
            attributes: ["id", "title", "publication_date", "price", "isbn"],
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
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, publication_date, price, author, genre, isbn } = req.body;
        if (!title || !publication_date || !price || !author || !genre || !isbn) {
            res.status(400).send({
                success: false,
                message: "All fields are required.",
            });
            return;
        }
        let name = yield Author.findOne({ where: { author_name: author } });
        if (!name) {
            res.status(500).send({
                success: false,
                message: "Author not found.",
            });
            return;
        }
        let cat = yield Category.findOne({ where: { genre: genre } });
        if (!cat) {
            res.status(500).send({
                success: false,
                message: "Category not found.",
            });
            return;
        }
        const book = yield Book.create({
            title,
            isbn,
            publication_date,
            price,
            author_id: name.author_id,
            category_id: cat.category_id
        });
        res.status(200).send({
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, publication_date, price, author, genre, isbn } = req.body;
        const ISBN = req.params.id;
        const book = yield Book.findOne({ where: { isbn: ISBN } });
        if (!title || !publication_date || !price || !author || !genre || !isbn) {
            res.status(400).send({
                success: false,
                message: "All fields are required.",
            });
            return;
        }
        if (!ISBN) {
            res.status(400).send({
                success: false,
                message: "id is required.",
            });
            return;
        }
        if (!book) {
            res.status(404).send({
                success: false,
                message: "Book not found.",
            });
            return;
        }
        const authors = yield Author.findOne({ where: { author_name: author } });
        if (!authors) {
            res.status(404).send({
                success: false,
                message: "Author not found.",
            });
            return;
        }
        const authorId = authors.author_id;
        const category = yield Category.findOne({ where: { genre: genre } });
        const categoryId = category.category_id;
        const updatedBook = yield Book.update({ title, isbn, publication_date, price, author_id: authorId, category_id: categoryId }, {
            where: {
                isbn: ISBN
            }
        });
        res.status(200).send({
            message: "Book updated successfully"
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
