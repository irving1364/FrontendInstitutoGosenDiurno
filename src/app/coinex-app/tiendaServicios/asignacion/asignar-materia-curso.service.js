(function() {

	'use strict';

	angular
		.module('coinex-app.draglet')
		.factory('asignarMateriaCursoService', asignarMateriaCursoService);

	function asignarMateriaCursoService($coinexHttp, $q, newAddressResponseFake) {
		
		window.app.env('TEST', function() {
			$coinexHttp = new window.app.ServerFake($q);
			$coinexHttp.setResolve(newAddressResponseFake.ok);
		});

		var handler = new Handlers($coinexHttp, $q);
		return {
			handle: handler.handle.bind(handler)
		}
	}
	function Handlers($coinexHttp, $q, $http) {
		this.coinexHttp = $coinexHttp;
		this.q = $q;
		this.http = $http;
	}
	Handlers.prototype = {
		handle: function(command, success, failed) {
			this.action(command)
			.then(
				this.handleSuccess.bind(this),
				this.handleFailed.bind(this)
			)
			.then(success, failed);
		},
		action: function(command, success, failed) {
            console.log(command);
			var data = {	
				token:	         localStorage.getItem('token'),
				cod_curso:   	 command.cod_curso_detail,
				cod_materia:     command.cod_materia,
				prioridad:   	 command.prioridad,
				cod_anio:        localStorage.getItem('cod_anio')
			};
			return this.coinexHttp.http.post(localStorage.getItem("apiUrl") +'tabla/asignarMateria', data);
		},
		handleSuccess: function(response) {
			if(response.data.code == 200) {
				return this.q.resolve(response.data);
			}
			else {
				return this.q.reject({
					mensaje: response.data.response
				});
			}
		},
		handleFailed: function(response) {
			return this.q.reject(response);
		}
	} 	
})();