// ATENÇÃO: É AQUI QUE VOCÊ VAI COLOCAR OS LINKS DAS SUAS IMAGENS.
// Troque a URL de exemplo pelo link ou caminho da imagem do seu computador (ex: "img/colar.jpg")
const produtos = [
    {
        id: 1,
        nome: "Colar de Diamantes Lágrima",
        preco: 5400.00,
        imagem: "https://i.pinimg.com/736x/69/95/c0/6995c0758c99fc35e260ca1e8f0ab163.jpg"
    },
    {
        id: 2,
        nome: "Anel de Ouro 18k",
        preco: 2100.00,
        imagem: "https://i.pinimg.com/736x/b5/83/eb/b583eb67c7559ec21f8fa13c55d6e111.jpg"
    },
    {
        id: 3,
        nome: "Brincos de Esmeralda",
        preco: 3200.00,
        imagem: "https://i.pinimg.com/736x/80/6e/42/806e423f48ea4e24de8356bfcd534f78.jpg"
    },
    {
        id: 4,
        nome: "Pulseira Cravejada",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/736x/b4/2a/ff/b42aff4ed20423d992316f2ed9bea715.jpg"
    },
    {
        id: 5,
        nome: "Colar de Cobra",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/1200x/a7/d5/53/a7d553e27732daef23be3ea5f8bc7a27.jpg"
    },
    {
        id: 6,
        nome: "Brinco Malaquita",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/1200x/67/9a/0f/679a0f5fe3522d1182fc2e1a231d7afa.jpg"
    },
    {
        id: 7,
        nome: "Anel de Rubi",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/1200x/14/13/46/141346d897e8ccd51e2b146d818b9340.jpg"
    },
    {
        id: 8,
        nome: "Bracelete de Rubi",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/736x/17/91/d0/1791d0bca94f2a5f2140957f56d07aab.jpg"
    },
    {
        id: 9,
        nome: "Conjunto Ágata",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/736x/ec/35/bf/ec35bf175e814fd24f4f17df9373e59e.jpg"
    },
    {
        id: 10,
        nome: "Brinco de Cristal",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/736x/09/02/b7/0902b7678c10c76f30350aa99161d71f.jpg"
    },
    {
        id: 11,
        nome: "Colar de Lápis Lazuli",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/1200x/72/d0/fa/72d0fa4313deb069342b05622e1fcb15.jpg"
    },
    {
        id: 12,
        nome: "Anel Negro",
        preco: 4500.00,
        imagem: "https://i.pinimg.com/1200x/f6/2d/ae/f62daef7f1b4e6854ad8497edb3950e4.jpg"
    }
];

let carrinho = [];
let favoritos = [];

// Função para navegar entre as telas
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
    
    if(sectionId === 'produtos') renderProdutos();
    if(sectionId === 'carrinho') renderCarrinho();
    if(sectionId === 'favoritos') renderFavoritos();
}

// Renderiza a Vitrine
function renderProdutos() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    produtos.forEach(prod => {
        const isFav = favoritos.some(f => f.id === prod.id);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${prod.imagem}" alt="${prod.nome}">
            <h3>${prod.nome}</h3>
            <p>R$ ${prod.preco.toFixed(2)}</p>
            <button class="btn-gold" onclick="addCarrinho(${prod.id})">Comprar</button>
            <button class="btn-icon" onclick="toggleFavorito(${prod.id})" style="color: ${isFav ? '#FF0000' : '#D4AF37'}">
                <i class="fa${isFav ? 's' : 'r'} fa-heart"></i>
            </button>
        `;
        grid.appendChild(card);
    });
}

// Lógica de Favoritos
function toggleFavorito(id) {
    const produto = produtos.find(p => p.id === id);
    const index = favoritos.findIndex(f => f.id === id);
    
    if (index > -1) {
        favoritos.splice(index, 1); // Remove
    } else {
        favoritos.push(produto); // Adiciona
    }
    
    document.getElementById('fav-count').innerText = favoritos.length;
    renderProdutos(); // Atualiza a cor do coração na vitrine
    if(document.getElementById('favoritos').classList.contains('active-section')) {
        renderFavoritos();
    }
}

// Renderiza a tela de Favoritos
function renderFavoritos() {
    const grid = document.getElementById('favorites-grid');
    grid.innerHTML = '';
    
    if (favoritos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Você ainda não tem favoritos.</p>';
        return;
    }

    favoritos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${prod.imagem}" alt="${prod.nome}">
            <h3>${prod.nome}</h3>
            <p>R$ ${prod.preco.toFixed(2)}</p>
            <button class="btn-gold" onclick="addCarrinho(${prod.id})">Comprar</button>
            <button class="btn-icon" onclick="toggleFavorito(${prod.id})" style="color: #FF0000">
                <i class="fas fa-heart"></i>
            </button>
        `;
        grid.appendChild(card);
    });
}

// Lógica de Carrinho
function addCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    document.getElementById('cart-count').innerText = carrinho.length;
    alert(`${produto.nome} foi adicionado ao carrinho!`);
}

function renderCarrinho() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        document.getElementById('cart-total-price').innerText = '0.00';
        return;
    }

    carrinho.forEach((prod, index) => {
        total += prod.preco;
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <div>
                <h4>${prod.nome}</h4>
            </div>
            <div>
                <span style="color: #D4AF37; font-weight: bold;">R$ ${prod.preco.toFixed(2)}</span>
                <button class="btn-icon" onclick="removerCarrinho(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartContainer.appendChild(item);
    });

    document.getElementById('cart-total-price').innerText = total.toFixed(2);
}

function removerCarrinho(index) {
    carrinho.splice(index, 1);
    document.getElementById('cart-count').innerText = carrinho.length;
    renderCarrinho();
}

// Inicializa a vitrine ao carregar a página
window.onload = renderProdutos;