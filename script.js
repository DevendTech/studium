// Seleciona o botão e o modal
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Abre o modal ao clicar no botão
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fecha o modal ao clicar no "X"
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha o modal ao clicar fora da área do modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// Dados simulados que poderiam vir do banco
const hamburgueres = {
    1: {
        title: 'Artesanal 1',
        description: 'Suculenta carne de vaca grelhada com queijo serra, cebolas caramelizadas e molho de pimentão.',
    },
    2: {
        title: 'Artesanal 2',
        description: 'Delicioso hambúrguer artesanal com bacon crocante, cheddar e alface fresco.',
    },
    3: {
        title: 'Artesanal 3',
        description: 'Hambúrguer gourmet com molho barbecue caseiro e queijo suíço.',
    },
    4: {
        title: 'Artesanal 4',
        description: 'Hambúrguer de frango empanado com maionese temperada e salada fresca.',
    },
    5: {
        title: 'Artesanal 5',
        description: 'Hambúrguer vegetariano com quinoa, legumes frescos e molho especial.',
    },
    6: {
        title: 'Artesanal 6',
        description: 'Hambúrguer duplo com bacon, queijo cheddar derretido e cebolas crocantes.',
    },
    7: {
        title: 'Artesanal 7',
        description: 'Hambúrguer com queijo brie, rúcula e geleia de pimenta, servido em pão brioche.',
    },
    8: {
        title: 'Artesanal 8',
        description: 'Hambúrguer de carne angus, com queijo provolone e cogumelos grelhados.',
    },
};

// Seleciona elementos
const modall = document.getElementById('modall');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModalBtnn = document.getElementById('closeModall');

// Função para abrir o modal com dados específicos
document.querySelectorAll('.hamburguer').forEach((item) => {
    item.addEventListener('click', (event) => {
        const id = event.currentTarget.getAttribute('data-id');
        const dados = hamburgueres[id];

        // Preenche o modal com os dados do hambúrguer específico
        modalTitle.innerText = dados.title;
        modalDescription.innerText = dados.description;

        // Exibe o modal
        modall.style.display = 'block';
    });
});

// Fecha o modal ao clicar no "X"
closeModalBtnn.addEventListener('click', () => {
    modall.style.display = 'none';
});

// Fecha o modal ao clicar fora da área do modal
window.addEventListener('click', (event) => {
    if (event.target === modall) {
        modall.style.display = 'none';
    }
});


function imprimircupom(id) {
    const conteudo = document.getElementById(id).innerHTML;
    const janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.write(`
        <html>
            <head>
                <title>Impressão de Cupom</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .cupom { width: 300px; margin: auto; padding: 20px; border: 1px dashed black; font-size: 14px; }
                    .cupom h2 { text-align: center; }
                </style>
            </head>
            <body onload="window.print();window.close();">
                <div class="cupom">${conteudo}</div>
            </body>
        </html>
    `);
    janelaImpressao.document.close();
}

window.addEventListener('scroll', function () {
    const logo = document.querySelector('.logo img');
    if (window.scrollY > 300) {
        logo.classList.add('scrolled');
    } else {
        logo.classList.remove('scrolled');
    }
});


window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolledd');
    } else {
        header.classList.remove('scrolledd');
    }
});

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('show');
        } else {
            entrada.target.classList.remove('show');
        }
    });
});


const elementos = document.querySelectorAll('.hidden');
elementos.forEach((elemento) => observador.observe(elemento));

const observador2 = new IntersectionObserver((observar2) => {
    observar2.forEach((entrada2) => {
        if (entrada2.isIntersecting) {
            entrada2.target.classList.add('show2');
        } else {
            entrada2.target.classList.remove('show2');
        }
    });
});

const elements2 = document.querySelectorAll('.hidden2');
elements2.forEach((element) => observador2.observe(element));

// Carrinho e pedidos simulados usando localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Senha do proprietário
const adminPassword = "senha123";

// Função para adicionar produto ao carrinho
function addToCart(productName, price) {
    cart.push({ productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Exibe itens do carrinho
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart.map(item => `<p>${item.productName} - R$${item.price}</p>`).join('');
}

// Finaliza o pedido e armazena na área de pedidos
function finalizeOrder() {
    const newOrder = {
        id: Date.now(),
        items: cart,
        status: 'Pedido Recebido'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
    displayOrders();
    alert('Pedido finalizado com sucesso! Acompanhe na área de Pedidos.');
}

// Exibe a lista de pedidos na área do cliente
function displayOrders() {
    const orderListClient = document.getElementById('orderListClient');
    orderListClient.innerHTML = orders.map(order => `
       <div class="order">
         <p><strong>Pedido ID:</strong> ${order.id}</p>
         ${order.items.map(item => `<p>${item.productName} - R$${item.price}</p>`).join('')}
         <p><strong>Status:</strong> ${order.status}</p>
       </div>
     `).join('');
}

// Exibe a lista de pedidos na área do proprietário com opção de alteração
function displayOrdersAdmin() {
    const orderListAdmin = document.getElementById('orderListAdmin');
    orderListAdmin.innerHTML = orders.map(order => `
       <div class="order">
         <p><strong>Pedido ID:</strong> ${order.id}</p>
         ${order.items.map(item => `<p>${item.productName} - R$${item.price}</p>`).join('')}
         <p><strong>Status:</strong> ${order.status}</p>
         <select onchange="updateOrderStatus(${order.id}, this.value)">
           <option value="Pedido Recebido" ${order.status === 'Pedido Recebido' ? 'selected' : ''}>Pedido Recebido</option>
           <option value="Pedido Aceito" ${order.status === 'Pedido Aceito' ? 'selected' : ''}>Pedido Aceito</option>
           <option value="Saiu para Entrega" ${order.status === 'Saiu para Entrega' ? 'selected' : ''}>Saiu para Entrega</option>
           <option value="Pedido Finalizado" ${order.status === 'Pedido Finalizado' ? 'selected' : ''}>Pedido Finalizado</option>
         </select>
       </div>
     `).join('');
}

// Atualiza o status do pedido
function updateOrderStatus(orderId, status) {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex > -1) {
        orders[orderIndex].status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrders();
        displayOrdersAdmin();
    }
}

// Verifica se a senha do proprietário está correta
function verifyAdmin() {
    const inputPassword = document.getElementById('adminPassword').value;
    if (inputPassword === adminPassword) {
        document.getElementById('admin-area').style.display = 'block';
        document.getElementById('admin-login').style.display = 'none';
        displayOrdersAdmin();
    } else {
        alert("Senha incorreta!");
    }
}

// Inicializa o carrinho e pedidos ao carregar a página
window.onload = function () {
    displayCart();
    displayOrders();
};
