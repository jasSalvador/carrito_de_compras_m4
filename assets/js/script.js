class Producto {
    constructor(id, nombre, imagen, precio){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.cantidad = 0;
    }
}

class Carrito {
    constructor(){
        this.productos = [];
    }

    //agregar productos
    agregarProductos = (id) => {
        const productoAgregado = this.productos.find(prod => prod.id === id);
        if (productoAgregado) {
        productoAgregado.cantidad++;
        } else {
        const nuevoProducto = productosDisponibles.find(prod => prod.id === id);
        if (nuevoProducto) {
            nuevoProducto.cantidad = 1;
            this.productos.push(nuevoProducto);
            }
        }

        this.cambiarColorCarro();
    }


    //calcular total compra 
    totalCompra(){
        return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    }


    //mostrar total compra
    mostrarTotal(){
        let totalCompra = document.getElementById("totalCompra");
        if (this.productos.length === 0) {
            totalCompra.textContent = "0";
        } else {
            let total = this.totalCompra();
            console.log("Total de la compra: $", total);
            totalCompra.textContent = total;
        }
    }


    //mostrar carro con los productos agregados
    mostrarCarrito(){
        console.log('Productos en el carrito:', this.productos);

        let detalleCarrito = "<strong style='color: deeppink; font-size: 1.3rem;'>Productos agregados:</strong><br><br>";
        for (let item of this.productos) {
            detalleCarrito += 
            `
            <div class="d-flex flex-wrap justify-content-center aling-items-center mx-auto">
                <div class="me-2">
                    <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: auto;"> 
                </div>
                <div>
                    <span style="font-weight: bold; color: brown;">Producto:</span> ${item.nombre}. 
                    <span style="font-weight: bold; color: brown;">Cantidad:</span> ${item.cantidad}. 
                    <span style="font-weight: bold; color: brown;">Precio:</span> $${item.precio}.
                </div>
                <div>
                    <button class="btn ms-3" style="background-color: rgb(83, 250, 119); color: black;" id="btnAgrega-${item.id}">+</button>
                    <button class="btn ms-3" style="background-color: rgb(250, 83, 111); color: black;" id="btnEliminar-${item.id}">-</button>
                </div>
            </div>
            <br>
            `
        }

        detalleCarrito += `<strong>Total: $${this.totalCompra()}</strong>`;

        let mostrandoCarrito = document.getElementById("mostrandoCarrito");
        mostrandoCarrito.innerHTML = detalleCarrito;
        mostrandoCarrito.style.display = "block";
        
        let btnVerCarrito = document.getElementById("btnVerCarrito");
        btnVerCarrito.addEventListener("click", () => {
            carrito.mostrarCarrito();
        });

        this.productos.forEach(item => {

            //btn eliminar del carro
            let btnEliminar = document.getElementById(`btnEliminar-${item.id}`);
            btnEliminar.addEventListener("click", () => {
                this.eliminarProducto(item.id);
                this.mostrarCarrito();
                this.mostrarTotal();
            });

            //btn agregar mas del carro
            let btnAgrega = document.getElementById(`btnAgrega-${item.id}`);
            btnAgrega.addEventListener("click", () => {
                this.agregarProductos(item.id);
                this.mostrarCarrito();
                this.mostrarTotal();

                // Actualizar la cantidad en la tarjeta de productos
                document.getElementById(`cantidad-${item.id}`).textContent = item.cantidad;

                let seccionCarrito = document.getElementById("seccionCarrito");
                seccionCarrito.style.display = "block";
            });
        });
    } 


    //finalizar la compra / boton "pagar ahora" del carrito
    finalizarCompra(){
        let totalFinal = this.totalCompra();
        //let detalles = this.detallesCompra();
        //alert(`Su total a pagar es: $${totalFinal}`);
        let pagoTotal = document.getElementById("pagoTotal");
        console.log(pagoTotal);
        pagoTotal.innerHTML = `Su total a pagar es: $${totalFinal}`;
    }


    //eliminar producto del carro
    eliminarProducto = (id) => {
        const producto = this.productos.find((prod) => prod.id === id);
        if (producto && producto.cantidad > 0) {
            producto.cantidad--;
            if (producto.cantidad === 0) {
                this.productos = this.productos.filter((prod) => prod.id !== id);
            }
            
            this.mostrarCarrito();
            this.mostrarTotal();
            this.cambiarColorCarro();
        }
    }


    //cambiar color carro
    cambiarColorCarro() {
        let btnVerCarrito = document.getElementById("btnVerCarrito");
        if (this.productos.length === 0) {
            btnVerCarrito.querySelector("a").style.color = "black";
        } else {
            btnVerCarrito.querySelector("a").style.color = "rgb(83, 250, 119)";
        }
    }


    //eliminar cantidades de las tarjetas
    eliminarCantidades = () => {
        this.productos.forEach(producto => {
            producto.cantidad = 0;
        });
        renderizarProductos();
    }


    //vaciar carrito
    vaciarCarrito() {
        this.productos.forEach(producto => {
            producto.cantidad = 0;
        });

        this.productos = [];
        this.mostrarTotal();
        this.cambiarColorCarro();
        this.eliminarCantidades();
    }
};


//productos
let productosDisponibles = [
new Producto(1, "Leche", "assets/img/milk.png", 1000),
new Producto(2, "Pan", "assets/img/pan.png", 2000),
new Producto(3, "Queso", "assets/img/queso.png", 1200),
new Producto(4, "Mermelada", "assets/img/mermelada.png", 890),
new Producto(5, "Azúcar", "assets/img/azucar.png", 1300),
new Producto(6, "Chocolate", "assets/img/chocolate.png", 3100),
new Producto(7, "Harina", "assets/img/harina.png", 1600),
new Producto(8, "Miel", "assets/img/miel.png", 1600)
]

const carrito = new Carrito();

//mostrar productos en inicio
const renderizarProductos = () => {
    let listaProductos = document.getElementById("listaProductos");
    let html = "";

    productosDisponibles.forEach((producto) => {
        html += `
            <div class="col-lg-3 col-md-6 col-sm-10 gap-4 my-3">
                <div class="card" style="background-color: pink;">
                    <img src="${producto.imagen}" style="width: 140px; height: 150;" class="card-img-top text-center mx-auto pt-3" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <div class="d-flex justify-content-start gap-3 aling-items-center mx-auto">
                            <p class="card-text">$${producto.precio}</p>
                            <p class="card-text">Cantidad: <span id="cantidad-${producto.id}">${producto.cantidad}</span></p>
                        </div>
                        <button class="btn" id="btn-${producto.id}">Agregar</button>
                    </div>
                </div>
            </div>
        `;
    });

    listaProductos.innerHTML = html;


    //evento btn agregar
    productosDisponibles.forEach((producto) => {
        let btnAgregar = document.getElementById(`btn-${producto.id}`); 

        btnAgregar.addEventListener("click", () => {
            carrito.agregarProductos(producto.id);
            document.getElementById(`cantidad-${producto.id}`).textContent = producto.cantidad;
            carrito.mostrarTotal();
            btnAgregar.textContent = "+";
        });
    });
};


//btn finalizar / "comprar ahora" del carrito
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
    btnFinalizarCompra.addEventListener("click", () => {
    carrito.finalizarCompra();

    let seccionCarrito = document.getElementById("seccionCarrito");
    let seccionFinalizar = document.getElementById("seccionFinalizar");
    seccionCarrito.style.display = "none";
    seccionFinalizar.style.display = "block";
});


//btn volver a inicio 
let btnVolverInicio = document.getElementById("btnVolverInicio");
btnVolverInicio.addEventListener('click', () => {
    let seccionFinalizar = document.getElementById("seccionFinalizar");
    let seccionInicio = document.getElementById("seccionInicio");  
    seccionFinalizar.style.display = "none";
    seccionInicio.style.display = "block";
});


//btn pagar
let btnPagar = document.getElementById("btnPagar");
btnPagar.addEventListener('click', () => {
    alert("Pago realizado con exito. Gracias por tu compra!");
    let seccionFinalizar = document.getElementById("seccionFinalizar");
    let seccionInicio = document.getElementById("seccionInicio");  
    seccionFinalizar.style.display = "none";
    seccionInicio.style.display = "block";
    carrito.vaciarCarrito();
});


//btn "Ver Carrito" nav / mostrar y oocultar secciones
document.addEventListener("DOMContentLoaded", () => {
    const btnVerCarrito = document.getElementById("btnVerCarrito");
    btnVerCarrito.addEventListener("click", () => {
        carrito.mostrarCarrito();

    let seccionInicio = document.getElementById("seccionInicio");    
    let seccionCarrito = document.getElementById("seccionCarrito");  

    if (carrito.productos.length > 0){
        seccionInicio.style.display = "none";
        seccionCarrito.style.display = "block";
    } else {
        alert("Tu carrito está vacio :(");
        seccionCarrito.style.display = "none";
    }
    
});


    //btn cerrar carrito
    let btnCerrarCarrito = document.getElementById("btnCerrarCarrito");
    btnCerrarCarrito.addEventListener("click", () => {

        let seccionInicio = document.getElementById("seccionInicio");    
        let seccionCarrito = document.getElementById("seccionCarrito");  
        
        seccionInicio.style.display = "block";
        seccionCarrito.style.display = "none";
    });
});



renderizarProductos();
























