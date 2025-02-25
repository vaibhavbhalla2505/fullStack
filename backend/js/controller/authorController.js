var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Author } from "../model/authorModel.js";
import { sequelize } from "../config/dbConnect.js";
export const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield sequelize.transaction();
    try {
        const { author_name } = req.body;
        if (!author_name) {
            yield transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "Name are required.",
            });
            return;
        }
        const author = yield Author.create({ author_name }, { transaction });
        yield transaction.commit();
        console.log('commit transaction');
        res.status(200).send({
            message: "Author created successfully",
            data: author
        });
    }
    catch (error) {
        yield transaction.rollback();
        console.log('rollback transaction');
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const getAllAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield Author.findAll();
        res.status(200).send({
            success: true,
            data: authors
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield sequelize.transaction();
    try {
        const id = req.params.id;
        if (!id) {
            yield transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "Author ID is required."
            });
            return;
        }
        const author = yield Author.update({ first_name: "John Doe", last_name: "Smith" }, {
            where: {
                author_id: id
            },
            transaction
        });
        yield transaction.commit();
        console.log('commit transaction');
        res.status(200).send({
            message: "Author details updated successfully",
            success: true,
            data: author,
        });
    }
    catch (error) {
        yield transaction.rollback();
        console.log('rollback transaction');
        res.status(500).send({
            success: false,
            error,
        });
    }
});
export const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield sequelize.transaction();
    try {
        const id = req.params.id;
        if (!id) {
            yield transaction.rollback();
            console.log('rollback transaction');
            res.status(400).send({
                success: false,
                message: "Author ID is required."
            });
            return;
        }
        const author = yield Author.destroy({
            where: {
                author_id: id
            },
            transaction
        });
        yield transaction.commit();
        console.log('commit transaction');
        res.status(200).send({
            message: "Author deleted successfully",
            success: true,
            data: author,
        });
    }
    catch (error) {
        yield transaction.rollback();
        console.log('rollback transaction');
        res.status(500).send({
            success: false,
            error,
        });
    }
});
