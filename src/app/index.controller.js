(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming )
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;
       // console.log(vm.themes);

        //////////
        if(localStorage.getItem("token") == null ){
            localStorage.clear();
        }
        

        var entorno;

        entorno = 'local';

        if (entorno == 'local'){
            var url = 'http://localhost:8081/backendEduMysql/index.php/';
            var urlEvaluaciones = 'http://localhost:8081/backendEduMysql/';
            localStorage.setItem('apiUrl', url);
            localStorage.setItem('urlEvaluaciones', urlEvaluaciones);
        }

        if (entorno == 'test'){
            var url = 'http://test.institutogosen.edu.pa/backendEduMysql/index.php/';
            var urlEvaluaciones = 'http://test.institutogosen.edu.pa/backendEduMysql/';
            localStorage.setItem('apiUrl', url);
            localStorage.setItem('urlEvaluaciones', urlEvaluaciones);
        }

        if (entorno == 'production'){
            var url = 'https://institutogosen.okey.com.pa/backendEduMysql/index.php/';
            var urlEvaluaciones = 'https://institutogosen.okey.com.pa/backendEduMysql/';
            localStorage.setItem('apiUrl', url);
            localStorage.setItem('urlEvaluaciones', urlEvaluaciones);
        }

        moment.locale('es');
    }
})();