var url = '/api/produtos';

$(document).ready(function () {
    if ($('#tb_produtos').length) {
        mostraDados();
    }


    // Carrega modal de novo produto em todas as páginas que o container existir
    if ($("#modalNovoProdutoContainer").length) {
        $("#modalNovoProdutoContainer").load("./novoProdutoModal.html");
    }
    // Carrega modal de alteração em todas as páginas que o container existir
    if ($("#modalAlterarContainer").length) {
        $("#modalAlterarContainer").load("./alteraProdutoModal.html");
    }

    // Carrega modal de excluir em todas as páginas que o container existir
    if ($("#modalExcluirContainer").length) {
        $("#modalExcluirContainer").load("./excluiProdutoModal.html");
    }

    if ($("#modalAlterarContainer").length) {
        $("#modalAlterarContainer").load("./alteraProdutoModal.html");
    }

    if ($("#modalExcluirContainer").length) {
        $("#modalExcluirContainer").load("./excluirProdutoModal.html");
    }

    if ($("#modalSucessoContainer").length) {
        $("#modalSucessoContainer").load("./sucessoModal.html");
    }

    $('#btnProcurar').on('click', function () {
        filtrarProdutos();
    });

    $('#btnLimpar').on('click', function () {
        $('#inputBuscaProduto').val('');
        mostraDados();
    });

});

function mostraDados() {
    $.get(url, function (produtos) {
        $('#tb_produtos tbody tr').remove();

        var linha = '';
        for (var i = 0; i < produtos.length; i++) {
            linha = '<tr>';
            linha += '<td>' + produtos[i].id + '</td>';
            linha += '<td>' + produtos[i].nome + '</td>';
            linha += '<td>' + produtos[i].valor + '</td>';
            linha += '<td><button onclick="alterar(' + produtos[i].id + ')" class="btn btn-warning btn-sm">Alterar</button></td>';
            linha += '<td><button onclick="excluir(' + produtos[i].id + ')" class="btn btn-danger btn-sm">Excluir</button></td>';
            linha += '</tr>';

            $('#tb_produtos tbody').append(linha);
        }
    });
}

function atualizarTabela(produtos) {
    $('#tb_produtos tbody tr').remove();

    for (var i = 0; i < produtos.length; i++) {
        var linha = '<tr>';
        linha += '<td>' + produtos[i].id + '</td>';
        linha += '<td>' + produtos[i].nome + '</td>';
        linha += '<td>' + produtos[i].valor + '</td>';
        linha += '<td><button onclick="alterar(' + produtos[i].id + ')" class="btn btn-warning btn-sm">Alterar</button></td>';
        linha += '<td><button onclick="excluir(' + produtos[i].id + ')" class="btn btn-danger btn-sm">Excluir</button></td>';
        linha += '</tr>';

        $('#tb_produtos tbody').append(linha);
    }
}

function addProduto() {
    var nome = $('#novoNome').val();
    var valor = $('#novoValor').val();

    if (nome.trim() === '' || valor.trim() === '') {
        alert("Preencha todos os campos.");
        return;
    }

    $.ajax({
        url: url,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            nome: nome,
            valor: parseFloat(valor)
        }),
        success: function () {
            $('#novoNome').val('');
            $('#novoValor').val('');


            var modalNovo = bootstrap.Modal.getInstance(document.getElementById('modalNovoProduto'));
            if (modalNovo) modalNovo.hide();

            mostraDados();

            mostrarMensagemSucesso("Registro Incluído", "Registro incluído com sucesso.");
        },
        error: function () {
            alert("Erro ao adicionar produto.");
        }
    });
}


function alterar(id) {
    $.get(url + "/" + id, function (produto) {

        $('#editId').val(produto.id);
        $('#editNome').val(produto.nome);
        $('#editValor').val(produto.valor);

        $('#modalEditarProduto').modal('show');
    });
}

function alterarProduto() {
    var id = $('#editId').val();
    var nome = $('#editNome').val();
    var valor = $('#editValor').val();

    if (nome.trim() === '' || valor.trim() === '') {
        alert("Preencha todos os campos.");
        return;
    }

    $.ajax({
        url: url + "/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            nome: nome,
            valor: parseFloat(valor)
        }),
        success: function () {
            var modalEdit = bootstrap.Modal.getInstance(document.getElementById('modalEditarProduto'));
            if (modalEdit) modalEdit.hide();

            mostraDados();

            mostrarMensagemSucesso("Registro Alterado", "Registro alterado com sucesso.");
        },
        error: function () {
            alert("Erro ao atualizar produto.");
        }
    });
}

function excluir(id) {
    $.get(url + "/" + id, function (produto) {

        // Preenche os dados no modal
        $('#excluirId').val(produto.id);
        $('#excluirIdLabel').text(produto.id);
        $('#excluirNomeLabel').text(produto.nome);
        $('#excluirValorLabel').text(produto.valor);

        // Abre o modal
        $('#modalExcluirProduto').modal('show');
    });
}

function confirmarExclusao() {

    var id = $('#excluirId').val();

    $.ajax({
        url: url + "/" + id,
        method: "DELETE",
        success: function () {
            var modalExc = bootstrap.Modal.getInstance(document.getElementById('modalExcluirProduto'));
            if (modalExc) modalExc.hide();

            mostraDados();

            mostrarMensagemSucesso("Registro Excluído", "Registro excluído com sucesso.");
        },
        error: function () {
            alert("Erro ao excluir produto.");
        }
    });
}


function filtrarProdutos() {
    var termo = $('#inputBuscaProduto').val().trim();

    if (termo === "") {
        mostraDados();
        return;
    }

    $.get(url + "/p/" + termo, function (produtos) {
        atualizarTabela(produtos);
    }).fail(function () {
        alert("Erro ao buscar produtos.");
    });
}


function mostrarMensagemSucesso(titulo, mensagem) {

    setTimeout(function () {
        $('#modalSucessoTitulo').text(titulo);
        $('#modalSucessoMensagem').text(mensagem);

        var modalEl = document.getElementById('modalRegistroIncluido');

        if (modalEl) {
            var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.show();
        }
    }, 100);
}

