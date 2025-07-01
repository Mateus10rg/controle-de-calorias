// Espera o conteúdo da página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro-alimento');
    const formConsumo = document.getElementById('form-consumo');
    const selectAlimento = document.getElementById('alimento-select');

    // Função para carregar os alimentos na lista de seleção
    async function carregarAlimentos() {
        try {
            const response = await fetch('/api/alimentos');
            const alimentos = await response.json();

            selectAlimento.innerHTML = '<option value="">Selecione um alimento</option>'; // Limpa opções antigas
            alimentos.forEach(alimento => {
                const option = document.createElement('option');
                option.value = alimento.id;
                option.textContent = `${alimento.nome} (${alimento.calorias} kcal/100g)`;
                selectAlimento.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar alimentos:', error);
            selectAlimento.innerHTML = '<option value="">Falha ao carregar</option>';
        }
    }

    // Event listener para cadastrar um novo alimento
    formCadastro.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome-alimento').value;
        const calorias = parseFloat(document.getElementById('calorias-alimento').value);

        const novoAlimento = { nome, calorias, carboidratos: 0, proteinas: 0, gorduras: 0 };

        try {
            const response = await fetch('/api/alimentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoAlimento)
            });

            if (response.ok) {
                alert('Alimento cadastrado com sucesso!');
                formCadastro.reset();
                carregarAlimentos(); // Atualiza a lista
            } else {
                alert('Erro ao cadastrar alimento.');
            }
        } catch (error) {
            console.error('Falha na comunicação:', error);
        }
    });

    // Event listener para registrar o consumo (lógica da Figura 3)
    formConsumo.addEventListener('submit', async (event) => {
        event.preventDefault();
        const alimentoId = selectAlimento.value;
        const pesoEmGramas = parseFloat(document.getElementById('peso-input').value);

        if (!alimentoId) {
            alert('Por favor, selecione um alimento.');
            return;
        }

        const consumoData = {
            alimento: { id: parseInt(alimentoId) },
            pesoEmGramas: pesoEmGramas
        };

        try {
            const response = await fetch('/api/consumo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(consumoData)
            });

            if (response.ok) {
                alert('Consumo registrado com sucesso!');
                formConsumo.reset();
                // Aqui você poderia adicionar uma lógica para atualizar um resumo diário na tela
            } else {
                alert('Erro ao registrar consumo.');
            }
        } catch (error) {
            console.error('Falha na comunicação com a API:', error);
        }
    });

    // Carrega os alimentos assim que a página é aberta
    carregarAlimentos();
});