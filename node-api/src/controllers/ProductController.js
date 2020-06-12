const mongoose = require('mongoose')
const ProductModel = require('../models/Product')

module.exports = {
    async index(req, res) {
        const products = await ProductModel.Product.find()

        return res.json(products)
    },

    async show(req, res) {
        const product = await ProductModel.Product.findById(req.params.id)

        return res.json(product)
    },

    async store(req, res) {
        const productCreate = await ProductModel.Product.create(req.body)

        return res.json(productCreate)
    },

    async update(req, res) { 
        const productUpdate = await ProductModel.Product.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
            )

        return res.json(productUpdate)
    },

    async destroy(req, res) {
        await ProductModel.Product.findByIdAndRemove(req.params.id)

        return res.send({
            message: 'Product deleted!'
        })
    }
    
}