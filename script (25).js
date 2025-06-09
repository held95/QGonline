<script>
  const apiURL = 'https://sheetdb.io/api/v1/cahitouo88zxm';
  let dados = [];
  let filtroAtual = 'Todos';

  async function buscarDados() {
    const response = await fetch(apiURL);
    const json = await response.json();
    dados = json;
    renderizarResultados(dados);
  }

  function buscar() {
    const termo = document.getElementById("searchInput").value.toLowerCase();
    const filtrado = dados.filter(pessoa =>
      pessoa["Nome"]?.toLowerCase().includes(termo) ||
      pessoa["CRM"]?.toLowerCase().includes(termo)
    );
    const filtradoPorHospital = filtroAtual === 'Todos' ? filtrado : filtrado.filter(p => p["Hospital"] === filtroAtual);
    renderizarResultados(filtradoPorHospital);
  }

  function filtrar(hospital) {
    filtroAtual = hospital;
    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
    [...document.querySelectorAll(".filters button")].find(b => b.textContent === hospital).classList.add("active");
    buscar();
  }

  function renderizarResultados(lista) {
    const container = document.getElementById("results");
    if (lista.length === 0) {
      container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }

    container.innerHTML = lista.map((pessoa, index) => `
      <div class="card">
        <div class="resumo">
          <div>
            <strong>Nome:</strong> ${pessoa["Nome"] || 'N/A'}<br>
            <strong>CRM:</strong> ${pessoa["CRM"] || 'N/A'}<br>
            <strong>Especialidade:</strong> ${pessoa["Especialidade"] || 'N/A'}<br>
            <strong>Hospital:</strong> ${pessoa["Hospital"] || 'N/A'}
          </div>
          <button class="toggle-btn" onclick="toggleDetalhes(${index})">▼</button>
        </div>
        <div class="detalhes" id="detalhes-${index}" style="display: none;">
          <strong>IR:</strong> ${pessoa["IR"] || 'N/A'}<br>
          <strong>Contrato:</strong> ${pessoa["Contrato"] || 'N/A'}<br>
          <strong>CPF:</strong> ${pessoa["CPF"] || 'N/A'}<br>
          <strong>RQE:</strong> ${pessoa["RQE"] || 'N/A'}<br>
          <strong>Nome da Mãe:</strong> ${pessoa["Nome da Mãe"] || 'N/A'}<br>
          <strong>Data de Nascimento:</strong> ${pessoa["Data de Nascimento"] || 'N/A'}<br>
          <strong>PIX:</strong> ${pessoa["PIX"] || 'N/A'}<br>
          <strong>Banco:</strong> ${pessoa["Banco"] || 'N/A'}<br>
          <strong>Código do Banco:</strong> ${pessoa["Codigo do Banco"] || 'N/A'}<br>
          <strong>Agência sem dígito:</strong> ${pessoa["Agência sem digito"] || 'N/A'}<br>
          <strong>Conta com dígito:</strong> ${pessoa["Conta com o Dígito"] || 'N/A'}<br>
          <strong>Estado civil:</strong> ${pessoa["Estado Civil"] || 'N/A'}<br>
          <strong>Naturalidade:</strong> ${pessoa["Naturalidade"] || 'N/A'}<br>
          <strong>E-mail:</strong> ${pessoa["E-mail"] || 'N/A'}<br>
          <strong>WhatsApp:</strong> ${pessoa["Whatsapp"] || 'N/A'}<br>
          <strong>CEP:</strong> ${pessoa["CEP"] || 'N/A'}<br>
          <strong>Endereço:</strong> ${pessoa["Endereço"] || 'N/A'}
        </div>
      </div>
    `).join('');
  }

  function toggleDetalhes(index) {
    const el = document.getElementById(`detalhes-${index}`);
    el.style.display = el.style.display === "block" ? "none" : "block";
  }

  buscarDados();
</script>
