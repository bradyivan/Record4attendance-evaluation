
	
	function demoTwoPageDocument(fnombre) {
		
		let doc = new jsPDF();	
		let currentDate = new Date();
		//let carrera = prompt('Introdusca la carrera:');
		let asignatura = $('#asignatura').val();
		let clase = $('#tipo_clase').val();
		let nombre = fnombre+'_'+currentDate.toLocaleDateString().replaceAll('/','_')+'.pdf';
	    
	    doc.text(20, 20, 'Parte de Asistencia y evaluacion.'+'Fecha: '+ currentDate.toLocaleDateString());
		doc.text(20, 30, 'Asignatura: '+ asignatura);
		doc.text(20, 40, 'Tipo de clase: '+ clase);
		doc.text(20, 60, 'Estudiantes Presentes');
		let j = 60;
		
		$('#presentes > li').each(function(i){ 
			if (j >= 280){
				j = 20;
				doc.addPage();
			}else{
				j += 10;
			};
			let nombre = $('#presentes > li:eq('+i+')').html();
			console.log(nombre);
		 	doc.text(20, j,' '+ (i+1) +'- '+ nombre);
		});
		if (j >= 280){
			j = 20;
			doc.addPage();
		}else{
			j += 10;
		};
		
		doc.text(20, j, 'Estudiantes Incorporados');
		if ($('#incorporados > li').length == 0) {
			if (j >= 280){
				j = 20;
				doc.addPage();
			}else{
				j += 10;
			};
			doc.text(20, j, ' >> No se incorporaron estudiantes.');
		};
		
		$('#incorporados > li').each(function(i){ 	
			if (j >= 280){
				j = 20;
				doc.addPage();
			}else{
				j += 10;
			};
			let nombre = $('#incorporados > li:eq('+i+')').html();
			console.log(nombre);
		 	doc.text(20, j, ' '+ (i+1) +'- '+ nombre);
		});

		if (j >= 280){
			j = 20;
			doc.addPage();
		}else{
			j += 10;
		};
		
		doc.text(20, j, 'Estudiantes Ausentes');
		if ($('#ausentes > li').length == 0) {
			if (j >= 280){
				j = 20;
				doc.addPage();
			}else{
				j += 10;
			};
			doc.text(20, j, ' >> No se incorporaron estudiantes.');
		};
		
		$('#ausentes > li').each(function(i){	
			if (j >= 280){
				j = 20;
				doc.addPage();
			}else{
				j += 10;
			};
			let nombre = $('#ausentes > li:eq('+i+')').html();
			console.log(nombre);
		 	doc.text(20, j, ' '+ (i+1) +'- '+ nombre);
		});
		if (j >= 280){
			j = 20;
			doc.addPage();
		}else{
			j += 10;
		};
		doc.text(20, j, 'Evaluaciones:');
		
		let n=0;
		$('#list_eval > li').each(function(i){//funcion each(), nucleo de JQuery		
			if ($('#list_eval > li:eq('+i+') > a').data('evaluado')){//obtencion de datos con el metodo data(), NUcleo de JQuery
				if (j >= 280){
					j = 20;
					doc.addPage();
				}else{
					j += 10;
				};
				let nombre = $('#list_eval > li:eq('+i+') > a').text();
		
			 	doc.text(20, j, ' '+ (n+1) +'- '+ nombre);
			 	n++;
			};			
		}); 
				
		// Save the PDF
		doc.save(nombre);
	}

	function salvarPDF(){
		let fname = $('#files').data('fname');		
        demoTwoPageDocument(fname);
        $("#confirmar").data('saved',true);	        
		let pagina = $("#confirmar").data('pagina');		
		$.mobile.changePage(pagina);			
	};

	function cancelarPDF(){		
		let pagina = $("#confirmar").data('pagina');
		console.log(pagina);		
		$.mobile.changePage(pagina);
	};

	




