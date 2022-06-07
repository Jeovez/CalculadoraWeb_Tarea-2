const historyLogs = document.getElementById('historyLogs');


function setResult(value)
{
    document.getElementById('resultado').innerHTML = value;
}
function getResult()
{
    return(document.getElementById('resultado').innerHTML);
}
function add(key)
{ 
    var result = getResult();
    if (result!='0' || isNaN(key)) setResult(result + key);
    else setResult(key);
}
function resultado()
{
    var result = eval(getResult());
    var operacion = getResult();
    let currentValue = `${operacion} = ${result}`;
    results.push(currentValue);
    localStorage.setItem("localItems", JSON.stringify(results));
    setResult(result);
}
function del() { 
    setResult(0);
}

function backspace()
{
    const result = getResult();
    var cantidadDeCaracteres = result.length;
    if (cantidadDeCaracteres === 1){
        setResult(0);
    } else{
        const result1 = result.slice(0, -1);
        setResult(result1);
    }

}

function signo()
{
    const result = getResult();
    const primerCaracter = result.charAt(0);
    const negative = '-';
    if(primerCaracter != '-'){
        setResult(negative + result);
    }else{
        const positive = result.replace(/^./, "");
        setResult(positive);
    }
}

let results;

let localItems = JSON.parse(localStorage.getItem("localItems"));

if(localItems === null){
    results = [];
} else {
    results = localItems;
}

function history(results) {

    let localItems = JSON.parse(localStorage.getItem("localItems"));

    if(localItems === null){
        results = [];
    } else {
        results = localItems;
    }

    let html = results.map((result) => {
        return `<p>${result}</p>`;
    });

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: 'Historial',
        text: '',
        icon: 'info',
        html: html,
        width: 600,
        padding: '2em',
        background: 'black',
        backdrop: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Salir',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
            title: 'Confirmado',
            text: 'El historial se elimino correctamente',
            icon: 'success',
            html: localStorage.clear(),
            width: 600,
            padding: '2em',
            background: 'black',
        })
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            // swalWithBootstrapButtons.fire({
            //     title: 'Historial eliminado',
            //     text: " ",
            //     icon: 'confirm',
            //     padding: '2em',
            //     background: 'black',
            // })
        }
    })
}

historyLogs.addEventListener('click', (e) => {
    e.preventDefault();
    history(results);
})
