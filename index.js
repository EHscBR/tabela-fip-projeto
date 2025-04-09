const tipoVeiculo = document.getElementById("tipoVeiculo");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const ano = document.getElementById("ano");
const buscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");
const imagem = document.getElementById("imagem");

tipoVeiculo.addEventListener("change", async () => {
  const tipo = tipoVeiculo.value;
  const res = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`);
  const data = await res.json();
  marca.innerHTML = '<option>Selecione a marca</option>';
  data.forEach(item => {
    marca.innerHTML += `<option value="${item.codigo}">${item.nome}</option>`;
  });
  marca.disabled = false;
  modelo.disabled = true;
  ano.disabled = true;
  buscar.disabled = true;
  modelo.innerHTML = '<option>Selecione o modelo</option>';
  ano.innerHTML = '<option>Selecione o ano</option>';
  resultado.innerHTML = '';
  imagem.innerHTML = '';
});

marca.addEventListener("change", async () => {
  const tipo = tipoVeiculo.value;
  const res = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca.value}/modelos`);
  const data = await res.json();
  modelo.innerHTML = '<option>Selecione o modelo</option>';
  data.modelos.forEach(item => {
    modelo.innerHTML += `<option value="${item.codigo}">${item.nome}</option>`;
  });
  modelo.disabled = false;
  ano.disabled = true;
  buscar.disabled = true;
  ano.innerHTML = '<option>Selecione o ano</option>';
  resultado.innerHTML = '';
  imagem.innerHTML = '';
});

modelo.addEventListener("change", async () => {
  const tipo = tipoVeiculo.value;
  const res = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca.value}/modelos/${modelo.value}/anos`);
  const data = await res.json();
  ano.innerHTML = '<option>Selecione o ano</option>';
  data.forEach(item => {
    ano.innerHTML += `<option value="${item.codigo}">${item.nome}</option>`;
  });
  ano.disabled = false;
  buscar.disabled = true;
  resultado.innerHTML = '';
  imagem.innerHTML = '';
});

ano.addEventListener("change", () => {
  buscar.disabled = false;
});

buscar.addEventListener("click", async () => {
  const tipo = tipoVeiculo.value;
  const url = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca.value}/modelos/${modelo.value}/anos/${ano.value}`;
  const res = await fetch(url);
  const data = await res.json();

  resultado.innerHTML = `
    <strong>Marca:</strong> ${data.Marca}<br>
    <strong>Modelo:</strong> ${data.Modelo}<br>
    <strong>Ano:</strong> ${data.AnoModelo}<br>
    <strong>Combustível:</strong> ${data.Combustivel}<br>
    <strong>Preço:</strong> ${data.Valor}<br>
    <strong>Código FIPE:</strong> ${data.CodigoFipe}<br>
    <strong>Mês Referência:</strong> ${data.MesReferencia}<br>
  `;

  const modeloBusca = `${data.Marca} ${data.Modelo}`.replace(/ /g, "+");

  imagem.innerHTML = `
    <img src="https://source.unsplash.com/500x300/?${modeloBusca}" alt="Imagem do veículo" onerror="this.style.display='none'; document.getElementById('imagem').innerHTML += '<p class=\'no-img\'>Imagem não encontrada</p>'">
  `;
});