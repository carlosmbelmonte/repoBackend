function postProducto() {
    let title = document.getElementById("p_title").value;
    let price = document.getElementById("p_price").value;
    let thumbnail = document.getElementById("p_thumbnail").value;
    document.getElementById('formProducto').reset()
    let producto = {
        "title": title,
        "price": parseInt(price),
        "thumbnail": thumbnail
    };

    fetch('/api/productos', {
        method: 'POST', 
        body: JSON.stringify(producto),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}