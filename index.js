const API_BASE = "https://parallelum.com.br/fipe/api/v1/carros";

    async function carregarMarcas() {
      const resp = await fetch(`${API_BASE}/marcas`);
      const marcas = await resp.json();
      const select = document.getElementById("marca");
      select.innerHTML = '<option value="">Selecione</option>';
      marcas.forEach(marca => {
        const opt = document.createElement("option");
        opt.value = marca.codigo;
        opt.textContent = marca.nome;
        select.appendChild(opt);
      });
    }

    async function carregarModelos() {
      const marca = document.getElementById("marca").value;
      if (!marca) return;
      const resp = await fetch(`${API_BASE}/marcas/${marca}/modelos`);
      const data = await resp.json();
      const modelos = data.modelos;
      const select = document.getElementById("modelo");
      select.innerHTML = '<option value="">Selecione</option>';
      modelos.forEach(modelo => {
        const opt = document.createElement("option");
        opt.value = modelo.codigo;
        opt.textContent = modelo.nome;
        select.appendChild(opt);
      });
    }

    async function carregarAnos() {
      const marca = document.getElementById("marca").value;
      const modelo = document.getElementById("modelo").value;
      if (!marca || !modelo) return;
      const resp = await fetch(`${API_BASE}/marcas/${marca}/modelos/${modelo}/anos`);
      const anos = await resp.json();
      const select = document.getElementById("ano");
      select.innerHTML = '<option value="">Selecione</option>';
      anos.forEach(ano => {
        const opt = document.createElement("option");
        opt.value = ano.codigo;
        opt.textContent = ano.nome;
        select.appendChild(opt);
      });
    }

    async function consultarFipe() {
      const marca = document.getElementById("marca").value;
      const modelo = document.getElementById("modelo").value;
      const ano = document.getElementById("ano").value;
      if (!marca || !modelo || !ano) return;
      const resp = await fetch(`${API_BASE}/marcas/${marca}/modelos/${modelo}/anos/${ano}`);
      const resultado = await resp.json();

      document.getElementById("resultado").innerHTML = `
        <h2>Resultado:</h2>
        <p><strong>Veículo:</strong> ${resultado.Modelo}</p>
        <p><strong>Marca:</strong> ${resultado.Marca}</p>
        <p><strong>Ano:</strong> ${resultado.AnoModelo}</p>
        <p><strong>Combustível:</strong> ${resultado.Combustivel}</p>
        <p><strong>Preço:</strong> ${resultado.Valor}</p>
        <p><strong>Mês de Referência:</strong> ${resultado.MesReferencia}</p>
      `;
    }

    document.getElementById("marca").addEventListener("change", () => {
      carregarModelos();
      document.getElementById("modelo").innerHTML = "";
      document.getElementById("ano").innerHTML = "";
    });

    document.getElementById("modelo").addEventListener("change", carregarAnos);

    carregarMarcas();
