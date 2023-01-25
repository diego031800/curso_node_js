const { guardarDB, leerArchivo } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    inquirerPausa,
    leerInput
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerArchivo();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    inquirerPausa();

    do {
        // Imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // Crear Opción
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
            break;

            case '2':
                tareas.listadoCompleto();   
            break;
        
            default:
                break;
        }

        guardarDB( tareas.listadoArr );
        
        if ( opt !== '0' ) await inquirerPausa();

    } while ( opt !== '0' );


    // pausa();
    
}

main();