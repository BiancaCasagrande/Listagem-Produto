// Garante que o código só roda depois do DOM estar pronto
$(function () {
    // Clique no botão do menu hamburguer
    $(document).on('click', '.menu-toggle', function () {
        var $toggle = $(this);
        var $menu = $('#mobileMenu');

        if (!$menu.length) return;

        var isOpen = $toggle.hasClass('open');

        $toggle.toggleClass('open', !isOpen);
        $menu.toggleClass('open', !isOpen);
        $toggle.attr('aria-expanded', !isOpen);
    });

    // Clique em qualquer link do menu mobile fecha o menu
    $(document).on('click', '#mobileMenu a', function () {
        var $toggle = $('.menu-toggle');
        var $menu = $('#mobileMenu');

        $toggle.removeClass('open').attr('aria-expanded', 'false');
        $menu.removeClass('open');
    });
});
