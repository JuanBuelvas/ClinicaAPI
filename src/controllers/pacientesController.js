const pacientesController = {};
const pacientes = require('../pacientes.json');

pacientesController.getAll = (req, res) => {
    res.json(pacientes);
}

/*
1)	Realizar un api en node js la cual solucione el siguiente problema:
En una clínica de control al sobrepeso requieren almacenar los nombres y los pesos tomados durante un periodo de tiempo a un grupo de n pacientes. 
Durante un mes, cada paciente es pesado 3 veces (una pesada inicial, una intermedia y unas pesada final y su objetivo (ganar peso o perder peso))
con el fin de determinar su evolución durante ese periodo.
Construya un algoritmo que permita almacenar estos datos y que además encuentre
a) Cuanto peso ha ganado o perdido cada paciente con respecto al peso inicial.
b)Cuantos pacientes perdieron peso entre la pesada inicial y la pesada intermedia.
c) Determine cuantos pacientes alcanzaron su objetivo.
*/

var name, pesoInicial, pesoIntermedio, pesoFinal, objetivo;


pacientesController.DatosPacientes = (req, res) => {
    let PesoGanado = [];
    let PesoPerdido = [];
    let PerdieronPeso=0;
    let ObjetivoAlcanzado=0;
    let response = {};
    const datosPacientes = req.body;
    for (let i = 0; i < datosPacientes.length; i++) {
        const dato = datosPacientes[i];

        //a) Cuanto peso ha ganado o perdido cada paciente con respecto al peso inicial.
        let difPeso1 =  calcularPeso(dato.Peso_Inicial, dato.Peso_Final);

        let pesoPerdido = {};
        let pesoGanado = {};

        if(dato.Peso_Final < dato.Peso_Inicial){
            pesoPerdido['Paciente'] = dato.Nombre_Paciente;
            pesoPerdido['Peso_Perdido'] = difPeso1;
            PesoPerdido.push(pesoPerdido);
        }else{
            pesoGanado['Paciente'] = dato.Nombre_Paciente;
            pesoGanado['Peso Ganado'] = difPeso1;
            PesoGanado.push(pesoGanado);
        }

        //b)Cuantos pacientes perdieron peso entre la pesada inicial y la pesada intermedia.
        if(dato.Peso_Intermedio < dato.Peso_Inicial){
            PerdieronPeso++;
        }

        //c) Determine cuantos pacientes alcanzaron su objetivo.
        if(dato.Peso_Final < dato.Peso_Inicial && dato.Objetivo == "bajar"){
            ObjetivoAlcanzado++;
        }else{
            if (dato.Objetivo == "subir") {
                ObjetivoAlcanzado++;
            }
        }


    }

    response['Pacientes_Peso_Ganado'] = PesoGanado;
    response['Pacientes_Peso_Perdido'] = PesoPerdido;
    response['Perdieron Peso entre Inicial e Intermedio'] = PerdieronPeso;
    response['Alcanzaron su Objetivo'] = ObjetivoAlcanzado;

    res.json(response);

}

let calcularPeso=(peso1, peso2) =>{
    let peso = peso2 - peso1;
    return peso;
}

module.exports = pacientesController;