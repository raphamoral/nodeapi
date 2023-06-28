// Methods to be executed on routes
const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

const getProduts = (req, res) => {
    return res.json(lista_produtos.produtos);
}

const getProdutsById = (req, res) => {
    let productId = req.params.id;
    let produto = lista_produtos.produtos.find(produto => produto.id == productId);
    if(produto){
        return res.json(produto);
    }
    
    return res.status(404).send(`Produto de ID: ${productId} não foi encontrado!`);
}

const createProduct =  (req, res) => {
    let body = req.body;
    let higherId = 0;
    if(body){
        if(!body.marca){
            return res.status(429).send(`Parametro marca é obrigatorio!`)
        }
        if(!body.valor || !(typeof body.valor === 'number')){
            return res.status(429).send(`Parametro valor está invalido!`)
        }
        for (const produto of lista_produtos.produtos) {
            if(produto.id > higherId){
                higherId = produto.id;
            }
        }
        let produto = {"id":higherId+1,"descricao":body.descricao,"valor":body.valor,"marca":body.marca};
        lista_produtos.produtos.push(produto);
    
        return res.json(produto);
    }
    return res.status(429).send(`Parametros minimos invalidos!`);
}

const updateProduct =  (req, res) => {
    let productId = req.params.id;
    let body = req.body;
    console.log(body);
    if(body){
        if(body.valor && !(typeof body.valor === 'number')){
            return res.status(429).send(`Parametro valor está invalido! O valor ${body.valor} não é numerico!`)
        }
        let produtoIndex = lista_produtos.produtos.findIndex((produto => produto.id == productId));
        if (produtoIndex >= 0){
            if(body.valor){
                lista_produtos.produtos[produtoIndex].valor = body.valor; 
            }
            if(body.descricao){
                lista_produtos.produtos[produtoIndex].descricao = body.descricao;
            }
            if(body.marca){
                lista_produtos.produtos[produtoIndex].marca = body.marca;
            } 
            return res.json(lista_produtos.produtos[produtoIndex]);
        }else{
            return res.status(404).send(`Produto de ID ${productId} não foi encontrado!`);
        }        
    }
   
    return res.status(429).send(`Parametros minimos invalidos!`);
}

const deleteProduct = (req, res) => {
    let productId = req.params.id;
    let produtoIndex = lista_produtos.produtos.findIndex((produto => produto.id == productId));
    if(produtoIndex >= 0){
        lista_produtos.produtos.splice(produtoIndex,1);
        console.log(lista_produtos.produtos);
    }else{
        return res.status(404).send(`Produto de ID ${productId} não foi encontrado!`);
    }   

    return res.status(200).send(`Produto de ID ${productId} foi removido com sucesso!`);
}

// Export of all methods as object
module.exports = {
    getProduts,
    getProdutsById,
    createProduct,
    updateProduct,
    deleteProduct
}