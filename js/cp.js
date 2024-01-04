

$(function(){

	$('#asignatura').focus();
	$('#formulario_lista').hide();
	$('#nav2').addClass('ui-disabled');
	$('#nav3').addClass('ui-disabled');
	$('#nav4').addClass('ui-disabled');
	$('#nav22').addClass('ui-disabled');
	$('#nav32').addClass('ui-disabled');
	$('#nav42').addClass('ui-disabled');
	$('#nav23').addClass('ui-disabled');
	$('#nav33').addClass('ui-disabled');
	$('#nav43').addClass('ui-disabled');
	$('#nav24').addClass('ui-disabled');
	$('#nav34').addClass('ui-disabled');
	$('#nav44').addClass('ui-disabled');
	$('#nav25').addClass('ui-disabled');
	$('#nav35').addClass('ui-disabled');
	$('#nav45').addClass('ui-disabled');
	$('#imprimir1').addClass('ui-disabled');
	$('#imprimir2').addClass('ui-disabled');
	$('#imprimir3').addClass('ui-disabled');
	$('#imprimir4').addClass('ui-disabled');
	$('#pase_lista').data('timelista',0);	
	$('#confirmar').data('saved',true);	
	if (localStorage.getItem('nameProfesor') != 'undefined'){
		$('#profesor').data('name', localStorage.getItem('nameProfesor'));
		$('#profesor').val($('#profesor').data('name'));
	};	

	
	function secureSavePDF(){
		let savedPDF = $('#confirmar').data('saved');
        let evaluados = $('#evaluar').data('pased');
        let paseLista = $('#pase_lista').data('pased');
		if (!savedPDF){
			if (evaluados || paseLista){
				$('#mensaje_salvar').html('Desea salvar el registro de asistencia y evaluacion para '+ $('#files').data('fname') +'.txt');
	            $.mobile.changePage('#confirmar');	        
	        };   
		};     
	};

	function tiempoAusencia(){
		let llegada = $.now();
		let timelista = $('#pase_lista').data('timelista');				
		return parseInt(( llegada - timelista ) / 60000);
	};

	function addEvent(){//Esta funcion es necesaria ya que existen eventos que se asocian dinamicamente  
		$('#ausente > li').unbind();//Desacopla los eventos asociados a los elementos li

		$('li.clickMe').on('click', function(e){//Reedefine y asocia nuevamente el evento			
			$(this).text($(this).text() + ', retraso:'+tiempoAusencia()+' minutos');			
			$('<li>'+$(this).text()+'</li>').appendTo("ol#incorporados");
			$(this).remove();
			$.mobile.changePage("#lista");			
			$('#incorporados').listview('refresh');	 
			$("#confirmar").data('saved',false);   	
		});
	};

	addEvent();

	function addEvent2(){
		$('a.clickEval').unbind();
		$('a.clickEval').on('click', function(e){
			$('#estud_eval').text($(this).text());
			$.mobile.changePage("#evaluar");
		});
	};

	addEvent2();

	/*setInterval(function(){
		$('h2').eq(1).effect('bounce',200);
	},400);*/

	function handleFileSelect(evt){//Funcion para leer el fichero .txt
		var files = evt.target.files; //FileList object
		
		for (var i = 0, f; f = files[i]; i++) {

			var reader = new FileReader();
			reader.onload = function(e){
				var text = reader.result;
				var listado = text.split(',');

				for(var j in listado){
					$('<li>'+listado[j]+'</li>').appendTo("ol#estudiantes5to");
					$('<li><a src="#evaluar" class="clickEval" data-rel="dialog" data-transition="flip">'+listado[j]+'</a></li>').appendTo("ol#list_eval");					
				};											
				addEvent2();	
				$('#nav2').removeClass('ui-disabled');				
				$('#nav4').removeClass('ui-disabled');	
				$('#nav22').removeClass('ui-disabled');				
				$('#nav42').removeClass('ui-disabled');
				$('#nav23').removeClass('ui-disabled');				
				$('#nav43').removeClass('ui-disabled');
				$('#nav24').removeClass('ui-disabled');				
				$('#nav44').removeClass('ui-disabled');
				$('#nav25').removeClass('ui-disabled');				
				$('#nav45').removeClass('ui-disabled');
				$('#nav3').addClass('ui-disabled');
				$('#nav33').addClass('ui-disabled');
				$('#nav34').addClass('ui-disabled');
				$('#nav35').addClass('ui-disabled');
				$('#imprimir1').removeClass('ui-disabled');
				$('#imprimir2').removeClass('ui-disabled');
				$('#imprimir3').removeClass('ui-disabled');
				$('#imprimir4').removeClass('ui-disabled');				
				$('ol#estudiantes5to').listview().listview('refresh');
				$('ol#list_eval').listview().listview('refresh');					
			};

			if (f.name.slice(-3) == 'txt'){//Comprueba que la extension del fichero sea txt
				$('ol#estudiantes5to > li').remove();	
				$('#ausentes > li').remove();
				$('#presentes > li').remove();
				$('#incorporados > li').remove();
				$('ol#list_eval > li').remove();
				secureSavePDF();
				reader.readAsText(f);
				$('#files').data('fname',f.name.slice(0,-4));
				$("#confirmar").data('saved',true);
				$('#pase_lista').data('timelista',0);				
			} else{
				alert('El archivo intruducido debe ser de tipo texo (extension: .txt)')
				return;
			} 
			
		};
	};

	document.getElementById('files').addEventListener('change', handleFileSelect, false);

	
	$("#asistencia").click(function(event) {//Muestra el formlario de pase de lista
		let iniciado = $('#asistencia').data('iniciado');
		if (!iniciado){
			$('#formulario_lista').show();
			$('li.actual').eq(0).html($("#estudiantes5to > li").eq(0).html());
		  	$('#Presente').show();
		  	$('#Siguiente').show();
	  };	
	});


	$("#Presente").click(function(){//Evento asociado al boton presente del formulario de pase de lista
	
	  let $pase_lista = false;
	  let $estud = $('li.actual').eq(0).html();
	  let $estudFirst = $("#estudiantes5to > li:first").html();
	  
	  if ($estudFirst == 'El pase de lista ha concluido') $pase_lista = true;

	  if (!$pase_lista) {
	    $("#estudiantes5to > li:first").appendTo($('ol#presentes'));
	    $('#estudiantes5to > li:contains('+$estud+')').remove();
	    $('li.actual').eq(0).html($("#estudiantes5to > li").eq(0).html());
	    $estudFirst = $("#estudiantes5to > li:first").html();
	    console.log($estudFirst);
	    if ($estudFirst == undefined) {
	    	$('<li>El pase de lista ha concluido</li>').appendTo("ol#estudiantes5to");
	    	$('li.actual').html('El pase de lista ha concluido');
	    	$('#pase_lista').data('timelista',$.now());
	    	$("#confirmar").data('saved',false);
	    	$('#ausentes > li').addClass('clickMe');
	    	addEvent();      	    	
	    	$pase_lista = true;
	    	$('#nav3').removeClass('ui-disabled');	      		
    		$('#nav2').addClass('ui-disabled');
    		$('#nav22').addClass('ui-disabled');
    		$('#nav23').addClass('ui-disabled');
    		$('#nav24').addClass('ui-disabled');
    		$('#nav25').addClass('ui-disabled');
    		$('#nav32').removeClass('ui-disabled');
    		$('#nav33').removeClass('ui-disabled');
    		$('#nav34').removeClass('ui-disabled');	
    		$('#nav35').removeClass('ui-disabled');		    		
	    	$('#formulario_lista').hide();
	    	$.mobile.changePage("#lista");
	    	$('#presentes').listview('refresh');
	    	$('#ausentes').listview('refresh');
	    };
	  };
	});

	$("#Ausente").click(function(){//Evento asociado al boton presente del formulario de pase de lista
	
	    let $pase_lista = false;
	    let $estud = $('li.actual').eq(0).html();//Selector con la funcion eq() del nucleo de JQuery
	    let $estudFirst = $("#estudiantes5to > li:first").html();//Selector por posicion
	  
	    if ($estudFirst == 'El pase de lista ha concluido') $pase_lista = true;
	    if (!$pase_lista){
	    	$("#estudiantes5to > li:first").appendTo($('ol#ausentes'));//selector por posicion. Manipulacion del DOM
	    	$('#estudiantes5to > li:contains('+$estud+')').remove();//selector filtro
	    	$('li.actual').eq(0).html($("#estudiantes5to > li").eq(0).html());//selectores css y por posicion
	    	$estudFirst = $("#estudiantes5to > li:first").html();//selector css
	    	if ($estudFirst == undefined) {
	    		$('<li>El pase de lista ha concluido</li>').appendTo("ol#estudiantes5to");//Manipulacion del DOM
	    		$('#ausentes > li').addClass('clickMe');//Manipulacion del DOM 
	    		$('li.actual').html('El pase de lista ha concluido');
	    		$('#pase_lista').data('timelista',$.now());//Nucleo de JQuery metodo data
	    		$("#confirmar").data('saved',false);//Nucleo de JQuery metodo data
	    		addEvent();	    		
	    		$pase_lista = true;
	    		$('#nav3').removeClass('ui-disabled');//inhabilita un enlace, uso de JQuery UI y manipulacion del DOM	      		
	    		$('#nav2').addClass('ui-disabled');//habilita un enlace, uso de JQuery UI y manipulacion del DOM
	    		$('#nav22').addClass('ui-disabled');//habilita un enlace
	    		$('#nav23').addClass('ui-disabled');//habilita un enlace
	    		$('#nav24').addClass('ui-disabled');//habilita un enlace
	    		$('#nav25').addClass('ui-disabled');//habilita un enlace
	    		$('#nav32').removeClass('ui-disabled');//inhabilita un enlace
	    		$('#nav33').removeClass('ui-disabled');//inhabilita un enlace
	    		$('#nav34').removeClass('ui-disabled');	//inhabilita un enlace
	    		$('#nav35').removeClass('ui-disabled');	//inhabilita un enlace
	    		$('#formulario_lista').hide();//oculta los elementos pertenecientes a la id formulario_lista
	    		$.mobile.changePage("#lista");//cambia de pagina, iso de AJAX
	    		$('#presentes').listview('refresh');//fuerza la correcta visualizacion de los elementos con data-role listview
	    		$('#ausentes').listview('refresh');//esto es preciso hacerlo cuando los elementos se agregan dinamicamente.
	    	};
	    };
	});

	$("#listado_estudiantes").click(function(event) {//Muestra y oculta el listado de estudiantes
		$("#estudiantes5to").slideToggle();
	});

	$("#estudiantes_presentes").click(function(event) {//Muestra y oculta el listado de estudiantes presentes
		$("#presentes").slideToggle();
	});

	$("#ausente_toggle").click(function(event) {//Muestra y oculta el listado de estudiantes ausentes
		$("#ausentes").slideToggle();
	});

	$("#incorporados_toggle").click(function(event) {//Muestra y oculta el listado de estudiantes incorporados
		$("#incorporados").slideToggle();
	});
	
	$('#5').click(function(e){//Agrega calificacion de 5 ptos
		let str = $('#estud_eval').text();
		$('.clickEval:contains('+str+')').html(str + ' | 5 ');
		$('.clickEval:contains('+str+')').data('evaluado',true);
		$("#confirmar").data('saved',false);
	});

	$('#4').click(function(e){//Agrega calificacion de 4 ptos
		let str = $('#estud_eval').text();
		$('.clickEval:contains('+str+')').html(str + ' | 4 ');
		$('.clickEval:contains('+str+')').data('evaluado',true);
		$("#confirmar").data('saved',false);
	});

	$('#3').click(function(e){//Agrega calificacion de 3 ptos
		let str = $('#estud_eval').text();
		$('.clickEval:contains('+str+')').html(str + ' | 3 ');
		$('.clickEval:contains('+str+')').data('evaluado',true);
		$("#confirmar").data('saved',false);
	});

	$('#2').click(function(e){//Agrega calificacion de 2 ptos
		let str = $('#estud_eval').text();
		$('.clickEval:contains('+str+')').html(str + ' | 2 ');		
		$('.clickEval:contains('+str+')').data('evaluado',true);
		$("#confirmar").data('saved',false);
	});
	
	$('#imprimir1').on('click',function(e){		
		let savedPDF = $('#confirmar').data('saved');
        if (!savedPDF){
        	$('#mensaje_salvar').html('¿Desea salvar el registro de asistencia y evaluacion para '+ $('#files').data('fname') +'.pdf?');
        }else{
        	$('#mensaje_salvar').html('No se ha realizado otra nueva accion en el registro ¿Desea salvar ' + $('#files').data('fname') +'_dia_mes_año.pdf ?');
        };
		$('#confirmar').data('pagina',$(this).data('origen'));		
	});	
    
    $('#imprimir2').on('click',function(e){		
		let savedPDF = $('#confirmar').data('saved');
        if (!savedPDF){
        	$('#mensaje_salvar').html('¿Desea salvar el registro de asistencia y evaluacion para '+ $('#files').data('fname') +'.pdf?');
        }else{
        	$('#mensaje_salvar').html('No se ha realizado otra nueva accion en el registro ¿Desea salvar ' + $('#files').data('fname') +'_dia_mes_año.pdf ?');
        };
		$('#confirmar').data('pagina',$(this).data('origen'));		
	});	

	$('#imprimir3').on('click',function(e){		
		let savedPDF = $('#confirmar').data('saved');
        if (!savedPDF){
        	$('#mensaje_salvar').html('¿Desea salvar el registro de asistencia y evaluacion para '+ $('#files').data('fname') +'.pdf?');
        }else{
        	$('#mensaje_salvar').html('No se ha realizado otra nueva accion en el registro ¿Desea salvar ' + $('#files').data('fname') +'_dia_mes_año.pdf ?');
        };
		$('#confirmar').data('pagina',$(this).data('origen'));		
	});	

	$('#imprimir4').on('click',function(e){		
		let savedPDF = $('#confirmar').data('saved');
        if (!savedPDF){
        	$('#mensaje_salvar').html('¿Desea salvar el registro de asistencia y evaluacion para '+ $('#files').data('fname') +'.pdf?');
        }else{
        	$('#mensaje_salvar').html('No se ha realizado otra nueva accion en el registro ¿Desea salvar ' + $('#files').data('fname') +'_dia_mes_año.pdf ?');
        };
		$('#confirmar').data('pagina',$(this).data('origen'));		
	});	

	$('#evaluar').on('focus', function(e){
		$(this).dialog('refresh');
	});
	
	$('#profesor').change(function(){
		let nameProfesor = $('#profesor').val();	
		localStorage.setItem('nameProfesor', nameProfesor);		
		$('#profesor').data('name', nameProfesor);
	});
	
});


