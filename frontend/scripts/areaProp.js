function showTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.style.display = 'none');

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(button => button.classList.remove('active'));

  document.getElementById(tabId).style.display = 'block';
  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function showMessage(text) {
  const messageBox = document.getElementById('message');
  messageBox.textContent = text;
  messageBox.style.display = 'block';

  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 2000);
}

function moveTo(tabId, pedido) {
  const tabContent = document.getElementById(tabId);

  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
      <h3>${pedido}</h3>
      <p>Detalhes do pedido movido para a aba ${tabId}</p>
      ${tabId === 'preparo' ? `<button class="action-btn" onclick="moveTo('entrega', '${pedido}')">Pronto para Entrega</button>` : ''}
      ${tabId === 'entrega' ? `<button class="action-btn" onclick="moveTo('entregue', '${pedido}')">Entregue</button>` : ''}
      <button class="print-btn" onclick="printOrder('${pedido}', '(11) 1234-5678', 'João Silva', 'Rua das Flores, 123', 'X-Burger', 'R$ 25,00')">Imprimir Comanda</button>
  `;

  tabContent.appendChild(card);
  showMessage(`${pedido} movido para ${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);

  const originalCard = document.querySelector(`#pedido .card, #preparo .card, #entrega .card`);
  if (originalCard) {
    originalCard.remove();
  }
}

function printOrder(pedido, telefone, nome, endereco, pedidoDetalhes, valor) {
  const printWindow = window.open('', '', 'width=600,height=400');
  printWindow.document.write(`
      <html>
      <head>
          <title>Comanda de ${pedido}</title>
          <style>
              body { font-family: Arial, sans-serif; }
              .comanda {
                  width: 100%;
                  border: 1px solid #333;
                  padding: 20px;
                  margin-top: 10px;
              }
              h2 { color: #ff0000; }
              p { margin: 5px 0; }
          </style>
      </head>
      <body>
          <div class="comanda">
              <h2>${pedido}</h2>
              <p><strong>Telefone:</strong> ${telefone}</p>
              <p><strong>Nome:</strong> ${nome}</p>
              <p><strong>Endereço:</strong> ${endereco}</p>
              <p><strong>Pedido:</strong> ${pedidoDetalhes}</p>
              <p><strong>Valor:</strong> ${valor}</p>
          </div>
          <script>
              window.onload = function() {
                  window.print();
                  window.close();
              };
          </script>
      </body>
      </html>
  `);
  printWindow.document.close();
}

showTab('pedido');
