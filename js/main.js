(function () {

  'use strict';
  document.addEventListener('DOMContentLoaded', function () {

    var mapa = document.querySelector('#mapa');
    if(mapa){
      var map = L.map('mapa').setView([10.925838, -74.864139], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      L.marker([10.925838, -74.864139]).addTo(map)
        .bindPopup('GDLWebCamp 2018 <br> Boletos ya disponibles.')
        .openPopup();
    }

    if (document.getElementById('calcular')) {
      const calcular = document.querySelector('#calcular');
      const resumen = document.querySelector('#resumen-compra');
      const sumaTotal = document.querySelector('#suma-total');
      const errorDiv = document.querySelector('#error');

      const usuario = {
        nombre: document.querySelector('#nombre'),
        apellido: document.querySelector('#apellido'),
        email: document.querySelector('#email')
      }

      const productos = [document.querySelector('#pase-dia'), document.querySelector('#pase-dos-dias'), document.querySelector('#pase-completo'), document.querySelector('#camisa-evento'), document.querySelector('#etiquetas'), document.querySelector('#regalo')];

      //Variables del formulario
      let { nombre, apellido, email } = usuario;
      let [paseDia, paseDosDias, paseCompleto, camisa, etiqueta, regalo] = productos;

      //Eventos
      construirEvento('blur', validarCampos, nombre, apellido, email);
      construirEvento('blur', validarMail, email);
      construirEvento('change', mostrarEventos, paseDia, paseDosDias, paseCompleto);
      paseDia.addEventListener('change', mostrarEventos);
      calcular.addEventListener('click', calcularMontos);

      function validarCampos() {
        if (this.value === '') {

          errorDiv.style.display = 'block';
          errorDiv.innerHTML = 'Este campo es obligatorio';
          this.style.border = '1px solid red';
          errorDiv.style.color = 'red';

        } else {
          errorDiv.style.display = 'none';
          this.style.border = '1px solid #cccccc';
        }
      }

      function validarMail() {
        if (this.value.indexOf("@") > -1) {
          errorDiv.style.display = 'none';
          this.style.border = '1px solid #cccccc';
        } else {
          errorDiv.style.display = 'block';
          errorDiv.innerHTML = 'Correo no valido';
          this.style.border = '1px solid red';
          errorDiv.style.color = 'red';
        }
      }

      function mostrarEventos() {
        let [boletoDia, boletoDosDias, boletoCompleto] = obtenerValues(productos);

        let diasElegidos = [];
        if (boletoDia > 0) {
          diasElegidos.push('viernes');
        }
        if (boletoDosDias > 0) {
          diasElegidos.push('viernes', 'sabado');
        }
        if (boletoCompleto > 0) {
          diasElegidos.push('viernes', 'sabado', 'domingo');
        }

        diasElegidos.forEach(dia => document.querySelector(`#${dia}`).style.display = 'block');

      }

      function calcularMontos() {
        event.preventDefault();

        if (regalo.value === '') {
          alert('Debes seleccionar el regalo');
          regalo.focus();
        } else {

          let [boletoDia, boletoDosDias, boletoCompleto, cantidadCamisas, cantidadEtiqueta] = obtenerValues(productos);
          let totalPagar = (boletoDia * 30) + (boletoDosDias * 45) + (boletoCompleto * 50) + ((cantidadCamisas * 10) * .93) + (cantidadEtiqueta * 2);

          let listadoProductos = [];
          if (boletoDia >= 1) {
            listadoProductos.push(`${boletoDia} Pases por días`);
          }
          if (boletoDosDias >= 1) {
            listadoProductos.push(`${boletoDosDias} Pases por 2 días`);
          }
          if (boletoCompleto >= 1) {
            listadoProductos.push(`${boletoCompleto} Pases completos`);
          }
          if (cantidadCamisas >= 1) {
            listadoProductos.push(`${cantidadCamisas} camisas`);
          }
          if (cantidadEtiqueta >= 1) {
            listadoProductos.push(`${cantidadEtiqueta} etiqueta`);
          }

          resumen.innerHTML = '';
          listadoProductos.forEach(producto => resumen.innerHTML += producto + '<br/>');

          sumaTotal.innerHTML = '$ ' + totalPagar.toFixed(2);

          resumen.style.display = 'block';

        }
      }

      function obtenerValues() {
        return [parseInt(paseDia.value, 10) || 0, parseInt(paseDosDias.value, 10) || 0, parseInt(paseCompleto.value, 10) || 0, parseInt(camisa.value, 10) || 0, parseInt(etiqueta.value, 10) || 0];
      }

      function construirEvento(tipo, funcion, ...elements) {
        elements.forEach(element => element.addEventListener(tipo, funcion));
      }
    }



  }); // DOM CONTENT LOADED


})();


$(function () {




  //Lettering

  $('.nombre-sitio').lettering();

  // Programa de confrencia
  $('.programa-evento .info-curso:first').show();
  $('.menu-programa a:first').addClass('activo');

  $('.menu-programa a').on('click', function () {

    $('.menu-programa a').removeClass('activo');
    $(this).addClass('activo');
    $('.ocultar').hide();
    var enlace = $(this).attr('href');
    $(enlace).fadeIn(1000);

    return false;

  });

  //Animaciones para los números.

  var resumenLista = $('.resumen-evento');
  if(resumenLista.length > 0){
    $('.resumen-evento').waypoint(function(){

      $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6 }, 1200);
      $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15 }, 1200);
      $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 1500);
      $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9 }, 1200);
    }, {
      offset: '60%'
    });
  }

  
  //Cuenta regreseva 
  $('.cuenta-regresiva').countdown('2019/06/30 09:00:00', function (event) {
    $('#dias').html(event.strftime('%D'));
    $('#horas').html(event.strftime('%H'));
    $('#minutos').html(event.strftime('%M'));
    $('#segundos').html(event.strftime('%S'));
  });

  //menu fijo
  var windowHeight = $(window).height();
  var barraAltura = $('.barra').innerHeight();

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= windowHeight) {
      $('.barra').addClass('fixed');
      $('body').css({ 'margin-top': barraAltura + 'px' });
    } else {
      $('.barra').removeClass('fixed');
      $('body').css({ 'margin-top': '0px' });
    }

  });


  //Menu responsing
  $('.menu-mobil').on('click', function () {
    $('.navegacion-principal').toggle(500);
  });

  //menu programa
  $('.navegacion-principal a').on('click', function(){
    $('.navegacion-principal a').removeClass('activo');
    $(this).addClass('activo');
  });

});