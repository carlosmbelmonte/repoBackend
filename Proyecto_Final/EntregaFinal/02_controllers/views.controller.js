import Products from "../03_services/products.services.js"

const productos = new Products()

const renderLogin =  async(req, res) => {
    return res.render('login')
}

const renderProductos = async(req, res) => { 
    return res.render('InfoProdCart')        
}

const renderLogout = async(req, res) => { 
    return res.render('logout')        
}

export { renderLogin, renderProductos, renderLogout }