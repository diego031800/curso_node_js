const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor () {
        this._listado = {};
    }

    get listadoArr () {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach(( tarea, index ) => {
            this._listado[ tarea.id ] = tarea;
        });

    }

    crearTarea ( desc = '' ) {
        
        const tarea  = new Tarea( desc );
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto () {
        
        let index = 0;
        console.log();
        Object.keys( this._listado ).forEach( key => {
            const tarea = this._listado[ key ];
            const { desc, completadaEn } = tarea;
            let estado = completadaEn?'Completada'.green:'Pendiente'.red;
            console.log(`${(index + 1).toString().green + '.'.green} ${desc.white} ${'::'.yellow} ${estado}`);
            index ++;
        });

    }

    listarPendientesCompletadas ( completadas = true ) {
        
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            const { desc, completadaEn } = tarea;
            const estado = completadaEn?'Completada'.green:'Pendiente'.red;

            if ( completadas ) {
                if ( completadaEn ) {
                    contador += 1;
                    console.log( `${contador.toString().green}. ${desc.white} ${'::'.yellow} ${estado}` );
                }
            } else {
                if ( !completadaEn ) {
                    contador += 1;
                    console.log( `${contador.toString().green}. ${desc.white} ${'::'.yellow} ${estado}` );
                }
            }
        });

    }

}

module.exports = Tareas;