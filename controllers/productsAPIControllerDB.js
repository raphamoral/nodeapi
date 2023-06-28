const knexConfig = require('../knexfile');

// Methods to be executed on routes
const knex = require('knex')(knexConfig.development);

const getProduts = (req, res) => {
    knex('produtos')
        .select("*")
        .then(produtos => res.json({
            status:1,
            message: "",
            result: produtos
        }))
        .catch(err => {
            res.json({ message: `Erro ao obter os produtos ${err.message}` });
        });
}

const getProdutsById = (req, res) => {
    let productId = req.params.id;
    knex('produtos')
        .select("*")
        .where({ id: productId })
        .then(produto => res.json({ 
            status:1,
            message: "",
            result: produto
        }))
        .catch(err => {
            res.json({ message: `Erro ao obter produto ${err.message}` });
        });
}

const createProduct = (req, res) => {
    let body = req.body;
    if (body) {
        if (!body.marca) {
            return res.status(400).send(`Parametro marca é obrigatorio!`)
        }
        if (!body.valor || !(typeof body.valor === 'number')) {
            return res.status(400).send(`Parametro valor está invalido!`)
        }
        knex('produtos')
            .insert(body, ['*'])
            .then(produto => {
                if (produto.length > 0) {
                    res.status(201).json({
                        status:1,
                        message: "Produto inserido com sucesso!",
                        result:  produto 
                    });
                }
            })
            .catch(err => {
                res.json({ message: `Erro ao criar produto ${err.message}` });
            });
    }
}

const updateProduct = (req, res) => {
    let productId = req.params.id;
    let body = req.body;
    if (body) {
        if (body.valor && !(typeof body.valor === 'number')) {
            return res.status(400).send(`Parametro valor está invalido! O valor ${body.valor} não é numerico!`)
        }
        knex('produtos')
            .where({ id: productId })
            .update({ 
                    descricao: body.descricao,
                    marca: body.marca,
                    valor: body.valor,
                    updated_at: knex.fn.now()
            }, ['*'])
            .then(produto => {
                res.status(201).json({
                    status:1,
                    message: "Produto atualizado com sucesso!",
                    result:  produto 
                });
            })
            .catch(err => {
                res.json({ message: `Erro ao atualizar o produto ${err.message}` });
            });
    }
}

const deleteProduct = (req, res) => {
    let productId = req.params.id;
    knex('produtos')
        .where({ id: productId })
        .del()
        .then(produto => res.json({ 
            status:1,
            message: "Produto Deletado com sucesso!"
        }))
        .catch(err => {
            res.json({ message: `Erro ao obter produto ${err.message}` });
        });
}

// Export of all methods as object
module.exports = {
    getProduts,
    getProdutsById,
    createProduct,
    updateProduct,
    deleteProduct
}