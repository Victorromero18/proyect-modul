var datosKardex = [];
var kardexCargado = false;

function cargarKardex() {
    if (kardexCargado) return;
    
    var tbody = document.getElementById('kardex-tbody');
    if (!tbody) return;
    
    var filas = tbody.querySelectorAll('tr');
    datosKardex = [];
    filas.forEach(function(fila, index) {
        var cells = fila.querySelectorAll('td');
        if (cells.length >= 8) {
            datosKardex.push({
                registro: cells[0].textContent.trim(),
                uea: cells[1].textContent.trim(),
                nombre: cells[2].textContent.trim(),
                trimestre: cells[3].textContent.trim(),
                tipoEval: cells[4].textContent.trim(),
                calificacion: cells[5].textContent.trim(),
                acta: cells[6].textContent.trim(),
                creditos: cells[7].textContent.trim()
            });
        }
    });
    kardexCargado = true;
}

function filtrarPorTrimestre() {
    var select = document.getElementById('trimestre-select');
    var trimestre = select.value;
    
    if (!trimestre) {
        return;
    }
    
    cargarKardex();
    
    var tbody = document.getElementById('kardex-tbody');
    tbody.innerHTML = '';
    
    var filtered = datosKardex.filter(function(item) {
        return item.trimestre.trim() === trimestre;
    });
    
    filtered.forEach(function(item, index) {
        var row = document.createElement('tr');
        row.innerHTML = '<td class="text-right">' + (index + 1) + '</td>' +
            '<td>' + item.uea + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.trimestre + '</td>' +
            '<td>' + item.tipoEval + '</td>' +
            '<td class="text-right">' + item.calificacion + '</td>' +
            '<td>' + item.acta + '</td>' +
            '<td class="text-right">' + item.creditos + '</td>';
        tbody.appendChild(row);
    });
    
    if (filtered.length === 0) {
        var row = document.createElement('tr');
        row.innerHTML = '<td colspan="8" style="text-align:center;">No se encontraron registros para este trimestre</td>';
        tbody.appendChild(row);
    }
}

function filtrarPorUEA() {
    var select = document.getElementById('uea-select');
    var uea = select.value;
    
    if (!uea) {
        return;
    }
    
    cargarKardex();
    
    var tbody = document.getElementById('kardex-tbody');
    tbody.innerHTML = '';
    
    var filtered = datosKardex.filter(function(item) {
        return item.uea.trim() === uea;
    });
    
    filtered.forEach(function(item, index) {
        var row = document.createElement('tr');
        row.innerHTML = '<td class="text-right">' + (index + 1) + '</td>' +
            '<td>' + item.uea + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.trimestre + '</td>' +
            '<td>' + item.tipoEval + '</td>' +
            '<td class="text-right">' + item.calificacion + '</td>' +
            '<td>' + item.acta + '</td>' +
            '<td class="text-right">' + item.creditos + '</td>';
        tbody.appendChild(row);
    });
    
    if (filtered.length === 0) {
        var row = document.createElement('tr');
        row.innerHTML = '<td colspan="8" style="text-align:center;">No se encontraron registros para esta UEA</td>';
        tbody.appendChild(row);
    }
}

function mostrarTodoKardex() {
    cargarKardex();
    
    var tbody = document.getElementById('kardex-tbody');
    if (!tbody || datosKardex.length === 0) {
        window.location.reload();
        return;
    }
    tbody.innerHTML = '';
    datosKardex.forEach(function(item, index) {
        var row = document.createElement('tr');
        row.innerHTML = '<td class="text-right">' + (index + 1) + '</td>' +
            '<td>' + item.uea + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.trimestre + '</td>' +
            '<td>' + item.tipoEval + '</td>' +
            '<td class="text-right">' + item.calificacion + '</td>' +
            '<td>' + item.acta + '</td>' +
            '<td class="text-right">' + item.creditos + '</td>';
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item[data-page]');
    const contentContainer = document.getElementById('contentContainer');
    const mainHeader = document.querySelector('.main-header h2');

    // Handler para pestañas de pagos
    contentContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab') && e.target.parentElement.id === 'pagos-tabs') {
            var tabs = document.querySelectorAll('#pagos-tabs .tab');
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            var tabName = e.target.getAttribute('data-tab');
            document.getElementById('colegiaturas-content').style.display = tabName === 'colegiaturas' ? 'block' : 'none';
            document.getElementById('servicio-content').style.display = tabName === 'servicio' ? 'block' : 'none';
        }
        else if (e.target.classList.contains('tab') && e.target.parentElement.classList.contains('tabs')) {
            var tabsContainer = e.target.parentElement;
            var tabButtons = tabsContainer.querySelectorAll('.tab');
            tabButtons.forEach(function(t) { t.classList.remove('active'); });
            e.target.classList.add('active');
            
            var tabName = e.target.getAttribute('data-tab');
            var sibling = tabsContainer.nextElementSibling;
            while (sibling) {
                if (sibling.classList.contains('tab-content')) {
                    var allContents = sibling.querySelectorAll('div[id$="-content"]');
                    allContents.forEach(function(c) {
                        c.style.display = 'none';
                    });
                    var contentToShow = sibling.querySelector('#' + tabName + '-content');
                    if (contentToShow) {
                        contentToShow.style.display = 'block';
                    }
                    break;
                }
                sibling = sibling.nextElementSibling;
            }
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');

            const page = this.getAttribute('data-page');

            if (page === 'horario') {
                mainHeader.textContent = 'Horario';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="no-data-message">
                            No hay publicación de horarios programada<br>
                            No hay Inscripción a idiomas
                        </div>

                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th colspan="5">Horario UEA</th>
                                </tr>
                                <tr>
                                    <th>UEA</th>
                                    <th>Nombre de la UEA</th>
                                    <th>Profesor</th>
                                    <th>Grupo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="5" class="empty-cell">No hay datos disponibles</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="section-bar">
                            INSCRIPCION A LENGUAS EXTRANJERAS
                        </div>

                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Idioma</th>
                                    <th>Grupo</th>
                                    <th>Nombre de idioma</th>
                                    <th>Profesor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="4" class="empty-cell">No hay datos disponibles</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
            }

            if (page === 'kardex') {
                mainHeader.textContent = 'Kardex';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="controls-section">
                            <div class="controls-left">
                                <span class="control-label">ORDENAMIENTO:</span>
                                <label class="radio-label">
                                    <input type="radio" name="orden" value="uea" checked> Por UEA
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="orden" value="trimestre"> Por Trimestre
                                </label>
                                <button class="btn-control" onclick="mostrarTodoKardex()">Todo Kardex</button>
                            </div>
                            <div class="controls-right">
                                <div class="control-row">
                                    <select class="select-control" id="trimestre-select">
                                        <option value="">Seleccionar...</option>
                                        <option value="26I">26I</option>
                                        <option value="25O">25O</option>
                                        <option value="25P">25P</option>
                                        <option value="25I">25I</option>
                                        <option value="24O">24O</option>
                                        <option value="24P">24P</option>
                                        <option value="24I">24I</option>
                                        <option value="23O">23O</option>
                                        <option value="23I">23I</option>
                                        <option value="22O">22O</option>
                                        <option value="22P">22P</option>
                                        <option value="22I">22I</option>
                                        <option value="21O">21O</option>
                                        <option value="21P">21P</option>
                                        <option value="21I">21I</option>
                                        <option value="20O">20O</option>
                                    </select>
                                    <button class="btn-control" onclick="filtrarPorTrimestre()">Consulta x Trim.</button>
                                </div>
                                <div class="control-row">
                                    <select class="select-control" id="uea-select">
                                        <option value="">Seleccionar UEA...</option>
                                        <option value="4000005">INTRODUCCION AL PENSAMIENTO MATEMATICO</option>
                                        <option value="4000007">SEMINARIO SOBRE SUSTENTABILIDAD</option>
                                        <option value="4000008">TALLER DE LITERACIDAD ACADEMICA</option>
                                        <option value="4502001">SEMINARIO DE COMUNICACION, DISEÑO Y TECNOLOGIAS DE LA INFOR.</option>
                                        <option value="4502002">HISTORIA Y CULTURA DE LA COMPUTACION</option>
                                        <option value="4502003">LOGICA Y PROGRAMACION LOGICA</option>
                                        <option value="4502004">PROGRAMACION DE WEB ESTATICO</option>
                                        <option value="4502007">LABORATORIO TEMATICO I</option>
                                        <option value="4502015">LABORATORIO TEMATICO II</option>
                                        <option value="4502016">LABORATORIO TEMATICO III</option>
                                        <option value="4502017">LABORATORIO TEMATICO IV</option>
                                        <option value="4600000">TALLER DE MATEMATICAS</option>
                                        <option value="4600001">MATEMATICAS DISCRETAS I</option>
                                        <option value="4600002">MATEMATICAS DISCRETAS II</option>
                                        <option value="4600005">PROGRAMACION ESTRUCTURADA</option>
                                        <option value="4600006">PROGRAMACION ORIENTADA A OBJETOS</option>
                                        <option value="4600009">ESTRUCTURA DE DATOS</option>
                                        <option value="4600011">PROBABILIDAD Y ESTADISTICA</option>
                                        <option value="4600012">ARQUITECTURA DE COMPUTADORAS</option>
                                        <option value="4600013">ANALISIS Y DISEÑO DE ALGORITMOS</option>
                                        <option value="4603050">COMUNICACION, INFORMACION Y SISTEMAS</option>
                                        <option value="4600017">SISTEMAS OPERATIVOS</option>
                                        <option value="4210011">FUNDAMENTOS DE TEORIA ADMINISTRATIVA</option>
                                        <option value="4210013">COMPORTAMIENTO HUMANO EN LAS ORGANIZACIONES I</option>
                                        <option value="4210018">COMPORTAMIENTO HUMANO EN LAS ORGANIZACIONES II</option>
                                        <option value="4210025">GESTION DE SISTEMAS DE INFORMACION Y COMUNICACION</option>
                                    </select>
                                    <button class="btn-control" onclick="filtrarPorUEA()">Consulta x UEA</button>
                                </div>
                            </div>
                        </div>

                        <table class="kardex-table" id="kardex-table">
                            <thead>
                                <tr>
                                    <th>Registro</th>
                                    <th>UEA</th>
                                    <th>Nombre de la UEA</th>
                                    <th>Trimestre</th>
                                    <th>Tipo Eval.</th>
                                    <th>Calificación</th>
                                    <th>No. de Acta</th>
                                    <th>Créditos</th>
                                </tr>
                            </thead>
                            <tbody id="kardex-tbody">
                                <tr>
                                    <td class="text-right">1</td>
                                    <td>4000005</td>
                                    <td>INTRODUCCION AL PENSAMIENTO MATEMATICO</td>
                                    <td>20O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">B</td>
                                    <td>410017590</td>
                                    <td class="text-right">9</td>
                                </tr>
                                <tr>
                                    <td class="text-right">2</td>
                                    <td>4000008</td>
                                    <td>TALLER DE LITERACIDAD ACADEMICA</td>
                                    <td>20O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">B</td>
                                    <td>410017867</td>
                                    <td class="text-right">9</td>
                                </tr>
                                <tr>
                                    <td class="text-right">3</td>
                                    <td>4600000</td>
                                    <td>TALLER DE MATEMATICAS</td>
                                    <td>20O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">B</td>
                                    <td>410026141</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">4</td>
                                    <td>4000007</td>
                                    <td>SEMINARIO SOBRE SUSTENTABILIDAD</td>
                                    <td>20O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>410017752</td>
                                    <td class="text-right">6</td>
                                </tr>
                                <tr>
                                    <td class="text-right">5</td>
                                    <td>4502002</td>
                                    <td>HISTORIA Y CULTURA DE LA COMPUTACION</td>
                                    <td>21I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>221803839</td>
                                    <td class="text-right">6</td>
                                </tr>
                                <tr>
                                    <td class="text-right">6</td>
                                    <td>4502004</td>
                                    <td>PROGRAMACION DE WEB ESTATICO</td>
                                    <td>21I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>221803863</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">7</td>
                                    <td>4600001</td>
                                    <td>MATEMATICAS DISCRETAS I</td>
                                    <td>21I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>221805019</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">8</td>
                                    <td>4600005</td>
                                    <td>PROGRAMACION ESTRUCTURADA</td>
                                    <td>21I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>221805043</td>
                                    <td class="text-right">14</td>
                                </tr>
                                <tr>
                                    <td class="text-right">9</td>
                                    <td>4502001</td>
                                    <td>SEMINARIO DE COMUNICACION, DISEÑO Y TECNOLOGIAS DE LA INFOR.</td>
                                    <td>21P</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>410043054</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">10</td>
                                    <td>4600017</td>
                                    <td>SISTEMAS OPERATIVOS</td>
                                    <td>21O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>410057744</td>
                                    <td class="text-right">11</td>
                                </tr>
                                <tr>
                                    <td class="text-right">11</td>
                                    <td>4210025</td>
                                    <td>GESTION DE SISTEMAS DE INFORMACION Y COMUNICACION</td>
                                    <td>22I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>222800224</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">12</td>
                                    <td>4600006</td>
                                    <td>PROGRAMACION ORIENTADA A OBJETOS</td>
                                    <td>22O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410092574</td>
                                    <td class="text-right">14</td>
                                </tr>
                                <tr>
                                    <td class="text-right">13</td>
                                    <td>4600009</td>
                                    <td>ESTRUCTURA DE DATOS</td>
                                    <td>22O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410092605</td>
                                    <td class="text-right">14</td>
                                </tr>
                                <tr>
                                    <td class="text-right">14</td>
                                    <td>4502003</td>
                                    <td>LOGICA Y PROGRAMACION LOGICA</td>
                                    <td>22O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410091007</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">15</td>
                                    <td>4502007</td>
                                    <td>LABORATORIO TEMATICO I</td>
                                    <td>23I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>410104397</td>
                                    <td class="text-right">10</td>
                                </tr>
                                <tr>
                                    <td class="text-right">16</td>
                                    <td>4210011</td>
                                    <td>FUNDAMENTOS DE TEORIA ADMINISTRATIVA</td>
                                    <td>23O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410131522</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">17</td>
                                    <td>4600002</td>
                                    <td>MATEMATICAS DISCRETAS II</td>
                                    <td>23O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410135479</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">18</td>
                                    <td>4600012</td>
                                    <td>ARQUITECTURA DE COMPUTADORAS</td>
                                    <td>24P</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410152502</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">19</td>
                                    <td>4210013</td>
                                    <td>COMPORTAMIENTO HUMANO EN LAS ORGANIZACIONES I</td>
                                    <td>24P</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410146755</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">20</td>
                                    <td>4600002</td>
                                    <td>MATEMATICAS DISCRETAS II</td>
                                    <td>24P</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410152439</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">21</td>
                                    <td>4210011</td>
                                    <td>FUNDAMENTOS DE TEORIA ADMINISTRATIVA</td>
                                    <td>24O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410160678</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">22</td>
                                    <td>4210013</td>
                                    <td>COMPORTAMIENTO HUMANO EN LAS ORGANIZACIONES I</td>
                                    <td>24O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>410178875</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">23</td>
                                    <td>4600009</td>
                                    <td>ESTRUCTURA DE DATOS</td>
                                    <td>25P</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>410183498</td>
                                    <td class="text-right">14</td>
                                </tr>
                                <tr>
                                    <td class="text-right">24</td>
                                    <td>4600012</td>
                                    <td>ARQUITECTURA DE COMPUTADORAS</td>
                                    <td>25P</td>
                                    <td>GLO.</td>
                                    <td class="text-right">B</td>
                                    <td>410183529</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">25</td>
                                    <td>4502015</td>
                                    <td>LABORATORIO TEMATICO II</td>
                                    <td>25P</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>410182329</td>
                                    <td class="text-right">10</td>
                                </tr>
                                <tr>
                                    <td class="text-right">26</td>
                                    <td>4502016</td>
                                    <td>LABORATORIO TEMATICO III</td>
                                    <td>25O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">NA</td>
                                    <td>410198532</td>
                                    <td class="text-right">10</td>
                                </tr>
                                <tr>
                                    <td class="text-right">27</td>
                                    <td>4210018</td>
                                    <td>COMPORTAMIENTO HUMANO EN LAS ORGANIZACIONES II</td>
                                    <td>25O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">B</td>
                                    <td>410191158</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">28</td>
                                    <td>4600006</td>
                                    <td>PROGRAMACION ORIENTADA A OBJETOS</td>
                                    <td>25O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>410199889</td>
                                    <td class="text-right">14</td>
                                </tr>
                                <tr>
                                    <td class="text-right">29</td>
                                    <td>4502003</td>
                                    <td>LOGICA Y PROGRAMACION LOGICA</td>
                                    <td>25O</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>410198388</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">30</td>
                                    <td>4502016</td>
                                    <td>LABORATORIO TEMATICO III</td>
                                    <td>25O</td>
                                    <td>REC.</td>
                                    <td class="text-right">MB</td>
                                    <td>410207161</td>
                                    <td class="text-right">10</td>
                                </tr>
                                <tr>
                                    <td class="text-right">31</td>
                                    <td>4600011</td>
                                    <td>PROBABILIDAD Y ESTADISTICA</td>
                                    <td>26I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>226806701</td>
                                    <td class="text-right">8</td>
                                </tr>
                                <tr>
                                    <td class="text-right">32</td>
                                    <td>4502017</td>
                                    <td>LABORATORIO TEMATICO IV</td>
                                    <td>26I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">MB</td>
                                    <td>226805179</td>
                                    <td class="text-right">10</td>
                                </tr>
                                <tr>
                                    <td class="text-right">33</td>
                                    <td>4600013</td>
                                    <td>ANALISIS Y DISEÑO DE ALGORITMOS</td>
                                    <td>26I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>226806751</td>
                                    <td class="text-right">12</td>
                                </tr>
                                <tr>
                                    <td class="text-right">34</td>
                                    <td>4603050</td>
                                    <td>COMUNICACION, INFORMACION Y SISTEMAS</td>
                                    <td>26I</td>
                                    <td>GLO.</td>
                                    <td class="text-right">S</td>
                                    <td>226806472</td>
                                    <td class="text-right">8</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="page-footer">
                            <p>Coordinación de Sistemas Escolares</p>
                            <p>ccse@correo.cua.uam.mx</p>
                            <p>Tecnologías de la Información - DDSAE</p>
                        </div>
                    </div>
                `;
            }

            if (page === 'pagos') {
                mainHeader.textContent = 'Detalle';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="student-info">
                            <div class="info-row">
                                <span class="info-label">Matrícula:</span>
                                <span class="info-value">2203024222</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Estado Académico:</span>
                                <span class="info-value">INSCRITO A UEA</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Apellido Paterno:</span>
                                <span class="info-value">ROMERO</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Apellido Materno:</span>
                                <span class="info-value">PEREZ</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Nombre(s):</span>
                                <span class="info-value">VICTOR MIGUEL</span>
                            </div>
                        </div>

                        <div class="tabs" id="pagos-tabs">
                            <button class="tab active" data-tab="colegiaturas">Colegiaturas</button>
                            <button class="tab" data-tab="servicio">Servicio en Caja</button>
                        </div>

                        <div class="tab-content" id="pagos-content">
                            <div class="section-title">Detalle</div>
                            
                            <!-- Contenido Colegiaturas -->
                            <div id="colegiaturas-content">
                                <table class="pagos-table">
                                    <thead>
                                        <tr>
                                            <th>Trimestre</th>
                                            <th>Dedicación</th>
                                            <th>Estado del pago</th>
                                            <th>Cantidad Pagada</th>
                                            <th>Origen e Importe del Pago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>26P</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>MULTIPAGOS<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>26I</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>LINEA DE CAPTURA<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>25O</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">256.86</td>
                                            <td>MULTIPAGOS<br>256.86</td>
                                        </tr>
                                        <tr>
                                            <td>25P</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>LINEA DE CAPTURA<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>25I</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>MULTIPAGOS<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>24O</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">256.86</td>
                                            <td>MULTIPAGOS<br>256.86</td>
                                        </tr>
                                        <tr>
                                            <td>24P</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>MULTIPAGOS<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>23O</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">256.86</td>
                                            <td>MULTIPAGOS<br>256.86</td>
                                        </tr>
                                        <tr>
                                            <td>23I</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>MULTIPAGOS<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>22O</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">256.86</td>
                                            <td>MULTIPAGOS<br>256.86</td>
                                        </tr>
                                        <tr>
                                            <td>22I</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>LINEA DE CAPTURA<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>21O</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">256.86</td>
                                            <td>PAGO EN CAJA<br>256.86</td>
                                        </tr>
                                        <tr>
                                            <td>21P</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>LINEA DE CAPTURA<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>21I</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">128.43</td>
                                            <td>LINEA DE CAPTURA<br>128.43</td>
                                        </tr>
                                        <tr>
                                            <td>20O</td>
                                            <td>TIEMPO COMPLETO</td>
                                            <td class="text-center status-paid">PAGO CUBIERTO</td>
                                            <td class="text-right">256.86</td>
                                            <td>LINEA DE CAPTURA<br>256.86</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <!-- Contenido Servicio en Caja -->
                            <div id="servicio-content" style="display:none;">
                                <table class="servicio-table">
                                    <thead>
                                        <tr>
                                            <th>Solicitud</th>
                                            <th>Concepto</th>
                                            <th>Importe Unitario</th>
                                            <th>Fecha de Solicitud</th>
                                            <th>Trimestre Solicitud</th>
                                            <th>Fecha de Proceso</th>
                                            <th>Trimestre de Proceso</th>
                                            <th>Servicio Pagado</th>
                                            <th>Estado Pago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CSC20250254675</td>
                                            <td>EVALUACIONES DE RECUPERACIÓN</td>
                                            <td class="text-right">4.20</td>
                                            <td>08/04/2026 12:16:25</td>
                                            <td></td>
                                            <td>08/04/2026 16:31:40</td>
                                            <td>26I</td>
                                            <td>Si</td>
                                            <td class="status-paid">PAGADO</td>
                                        </tr>
                                        <tr>
                                            <td>CSC2025028441</td>
                                            <td>EVALUACIONES DE RECUPERACIÓN</td>
                                            <td class="text-right">2.20</td>
                                            <td>17/12/2025 11:41:52</td>
                                            <td></td>
                                            <td>05/01/2026 16:46:59</td>
                                            <td>25O</td>
                                            <td>Si</td>
                                            <td class="status-paid">PAGADO</td>
                                        </tr>
                                        <tr>
                                            <td>CSC2024016891</td>
                                            <td>EVALUACIONES DE RECUPERACIÓN</td>
                                            <td class="text-right">2.20</td>
                                            <td>06/02/2024 10:48:03</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Si</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>CSC2023014380</td>
                                            <td>EVALUACIONES DE RECUPERACIÓN</td>
                                            <td class="text-right">4.20</td>
                                            <td>22/06/2023 15:37:20</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Si</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>CSC2023014379</td>
                                            <td>EVALUACIONES DE RECUPERACIÓN</td>
                                            <td class="text-right">4.20</td>
                                            <td>22/06/2023 15:36:59</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Si</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>CSC2022010671</td>
                                            <td>CERTIFICADOS Y EXPEDICIÓN DE DOCUMENTOS</td>
                                            <td class="text-right">4.20</td>
                                            <td>26/07/2022 12:22:20</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Si</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (page === 'cartas') {
                mainHeader.textContent = 'Consulta de Cartas';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="section-subtitle">Datos del Alumno</div>

                        <div class="student-data-grid">
                            <div class="data-box">
                                <span class="data-label">Matrícula:</span>
                                <span class="data-value">2203024222</span>
                            </div>
                            <div class="data-box">
                                <span class="data-label">Nombre:</span>
                                <span class="data-value">ROMERO PEREZ VICTOR MIGUEL</span>
                            </div>
                            <div class="data-box">
                                <span class="data-label">Unidad:</span>
                                <span class="data-value">CUAJIMALPA</span>
                            </div>
                            <div class="data-box">
                                <span class="data-label">División:</span>
                                <span class="data-value">CIENCIAS DE LA COMUNICACION Y DISEÑO</span>
                            </div>
                            <div class="data-box">
                                <span class="data-label">Plan:</span>
                                <span class="data-value">LICENCIATURA EN TECNOLOGIAS Y SISTEMAS DE INFORMACION</span>
                            </div>
                            <div class="data-box">
                                <span class="data-label">Estado:</span>
                                <span class="data-value">1: INSCRITO A UEA</span>
                            </div>
                            <div class="data-box">
                                <span class="data-label">Trimestre actual:</span>
                                <span class="data-value">26I</span>
                            </div>
                        </div>

                        <table class="cartas-table">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Tipo de Carta</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">1</td>
                                    <td>Carta de No Violencia</td>
                                    <td class="text-center"><button class="btn-emitir" onclick="mostrarCarta()">Emitir</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
            }

            if (page === 'info-personal') {
                mainHeader.textContent = 'Información General de Alumnos';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="general-data-bar">
                            <span><strong>Matrícula:</strong> 2203024222</span>
                            <span><strong>Estado Académico:</strong> INSCRITO A UEA</span>
                            <span><strong>Apellido Paterno:</strong> ROMERO</span>
                            <span><strong>Apellido Materno:</strong> PEREZ</span>
                            <span><strong>Nombre(s):</strong> VICTOR MIGUEL</span>
                        </div>

                        <div class="tabs">
                            <button class="tab active" data-tab="datos-personales">Datos Personales</button>
                            <button class="tab" data-tab="seguro-social">Seguro Social</button>
                            <button class="tab" data-tab="tutorias">Tutorías</button>
                            <button class="tab" data-tab="documentos">Documentos</button>
                        </div>

                        <div class="tab-content" id="info-personal-tabs">
                            <div id="datos-personales-content">
                                <div class="section-header">Datos personales</div>
                                
                                <div class="form-grid">
                                    <div class="form-field">
                                        <span class="field-label">Nacionalidad:</span>
                                        <span class="field-value">Mexicano</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Fecha de nacimiento:</span>
                                        <span class="field-value">07/08/2002</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Lugar de nacimiento:</span>
                                        <span class="field-value">México</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">CURP:</span>
                                        <span class="field-value">VOPV020807HMCMRCA8</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Correo:</span>
                                        <span class="field-value">victor.romero@cua.uam.mx</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Sexo:</span>
                                        <span class="field-value">Masculino</span>
                                    </div>
                                </div>

                                <div class="section-header">Domicilio</div>
                                
                                <div class="form-grid">
                                    <div class="form-field">
                                        <span class="field-label">Calle:</span>
                                        <span class="field-value">Emiliano Zapata 3</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Colonia:</span>
                                        <span class="field-value">Santiago Yancuitlalpan</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Código:</span>
                                        <span class="field-value">52766</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Entidad:</span>
                                        <span class="field-value">México</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Delegación/Municipio:</span>
                                        <span class="field-value">Huixquilucan</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Teléfono:</span>
                                        <span class="field-value">5533722825</span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Lada:</span>
                                        <span class="field-value">52</span>
                                    </div>
                                </div>

                                <div class="section-header">Datos adicionales</div>
                                
                                <div class="form-grid">
                                    <div class="form-field">
                                        <span class="field-label">Teléfono:</span>
                                        <span class="field-value"></span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Fax:</span>
                                        <span class="field-value"></span>
                                    </div>
                                    <div class="form-field">
                                        <span class="field-label">Correo:</span>
                                        <span class="field-value">vitmicky18@gmail.com</span>
                                    </div>
                                </div>

                                <div class="btn-update-container">
                                    <button class="btn-update">Actualizar domicilio</button>
                                </div>
                            </div>

                            <div id="seguro-social-content" style="display:none;">
                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:6px; border:1px solid #2980b9; color:white; text-align:left;">Número Seguridad Social</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;">85170228135</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div id="tutorias-content" style="display:none;">
                                <div class="section-header">Tutorías</div>
                                <div class="form-grid">
                                    <div class="form-field">
                                        <span class="field-label">Tutor:</span>
                                        <span class="field-value"></span>
                                    </div>
                                </div>
                            </div>

                            <div id="documentos-content" style="display:none;">
                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:13px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:6px; border:1px solid #2980b9; color:white; text-align:left;">Documento</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white; text-align:left;">Estado</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white; text-align:left;">Fecha Prórroga<br>(en caso de estar registrada)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;">ACTA DE NACIMIENTO</td>
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;">ENTREGADO A D.S.E.</td>
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;"></td>
                                        </tr>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;">CERTIFICADO DE BACHILLERATO</td>
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;">ENTREGADO A D.S.E.</td>
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;"></td>
                                        </tr>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;">C.U.R.P.</td>
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;">ENTREGADO A D.S.E.</td>
                                            <td style="padding:6px; border:1px solid #3498db; color:#333;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (page === 'info-academica') {
                mainHeader.textContent = 'Información Académica';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="general-data-bar">
                            <span><strong>Matrícula:</strong> 2203024222</span>
                            <span><strong>Apellido Paterno:</strong> ROMERO</span>
                            <span><strong>Apellido Materno:</strong> PEREZ</span>
                            <span><strong>Nombre(s):</strong> VICTOR MIGUEL</span>
                        </div>

                        <div class="general-data-bar" style="background: #5dade2;">
                            <span><strong>Estado Académico:</strong> INSCRITO A UEA</span>
                            <span><strong>Nacionalidad:</strong> Mexicano</span>
                        </div>

                        <div class="tabs">
                            <button class="tab active" data-tab="datos-academicos">Datos Académicos</button>
                            <button class="tab" data-tab="resumen-trimestral">Resumen Trimestral</button>
                            <button class="tab" data-tab="autorizaciones">Autorizaciones</button>
                            <button class="tab" data-tab="uea-no-aprobadas">UEA no aprobadas</button>
                            <button class="tab" data-tab="creditos-cubiertos">Crédititos Cubiertos</button>
                        </div>

                        <div class="tab-content">
                            <div id="datos-academicos-content">
                                <div class="section-header">Datos Académicos</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Unidad:</span>
                                    <span class="field-value">CUAJIMALPA</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">División:</span>
                                    <span class="field-value">CIENCIAS DE LA COMUNICACIÓN Y DISEÑO</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Carrera:</span>
                                    <span class="field-value">LICENCIATURA EN TECNOLOGÍAS Y SISTEMAS DE INFORMACIÓN</span>
                                </div>
                            </div>

                            <div class="section-header">Información del plan</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Clave:</span>
                                    <span class="field-value">137</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Versión del plan de estudios:</span>
                                    <span class="field-value">2</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Duración de la carrera:</span>
                                    <span class="field-value">12 trimestres</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Área de concentración:</span>
                                    <span class="field-value">0</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Sub-área:</span>
                                    <span class="field-value">0</span>
                                </div>
                            </div>

                            <div class="section-header">Créditos</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Créditos máximos:</span>
                                    <span class="field-value">459</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Créditos mínimos:</span>
                                    <span class="field-value">459</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Créditos contabilizados:</span>
                                    <span class="field-value">223</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Número de NA en tronco:</span>
                                    <span class="field-value">0</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Número de conversiones:</span>
                                    <span class="field-value">0</span>
                                </div>
                            </div>

                            <div class="section-header">Información académica adicional</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Trimestre de ingreso:</span>
                                    <span class="field-value">200</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Último trimestre con actividad académica:</span>
                                    <span class="field-value">26I</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Último trimestre inscrito:</span>
                                    <span class="field-value">26I</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Promedio del último trimestre:</span>
                                    <span class="field-value">8.50</span>
                                </div>
                            </div>

                            <div class="info-text">
                                <p><strong>Créditos contabilizados:</strong> Es el resultado de la suma de los créditos de cada una de las UEA aprobadas. Los créditos cubiertos y mínimos son los que necesitas para graduarte.</p>
                            </div>

                            <div class="btn-update-container">
                                <button class="btn-update" onclick="window.print()">Imprime información</button>
                            </div>
                            </div>

                            <div id="resumen-trimestral-content" style="display:none;">
                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Trimestre</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Renuncias</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos inscritos en evaluación global</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos inscritos en evaluación de recuperación</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos aprobados en evaluación global</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos aprobados en evaluación de recuperación</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">MB</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">B</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">S</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">NA</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Trimestre en que se ubica</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos Acumulados</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos Permitidos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">20O</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">32</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">32</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">32</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">21I</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">36</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">36</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">68</td><td style="padding:5px; border:1px solid #3498db;">49</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">21P</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">38</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">8</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">76</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">21O</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">41</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">11</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">87</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">24</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">8</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">95</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">22O</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">36</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">95</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">23I</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">10</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">10</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">105</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">23O</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">16</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">105</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">24P</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">24</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">105</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">24O</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">8</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">105</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">25I</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">105</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">25P</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">40</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">40</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">3</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">4</td><td style="padding:5px; border:1px solid #3498db;">145</td><td style="padding:5px; border:1px solid #3498db;">41</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">25O</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">40</td><td style="padding:5px; border:1px solid #3498db;">10</td><td style="padding:5px; border:1px solid #3498db;">30</td><td style="padding:5px; border:1px solid #3498db;">10</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">1</td><td style="padding:5px; border:1px solid #3498db;">6</td><td style="padding:5px; border:1px solid #3498db;">223</td><td style="padding:5px; border:1px solid #3498db;">53</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">26I</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">38</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">38</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">6</td><td style="padding:5px; border:1px solid #3498db;">223</td><td style="padding:5px; border:1px solid #3498db;">49</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div id="autorizaciones-content" style="display:none;">
                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Clave U.E.A.</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Nombre</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Trimestre</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Grupo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4001016</td><td style="padding:5px; border:1px solid #3498db;">TEMAS SELECTOS DE MATEMATICAS APLICADAS I</td><td style="padding:5px; border:1px solid #3498db;">22P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4001017</td><td style="padding:5px; border:1px solid #3498db;">TEMAS SELECTOS DE MATEMATICAS APLICADAS II</td><td style="padding:5px; border:1px solid #3498db;">22P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4001018</td><td style="padding:5px; border:1px solid #3498db;">TEMAS SELECTOS DE MATEMATICAS APLICADAS III</td><td style="padding:5px; border:1px solid #3498db;">22P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4001019</td><td style="padding:5px; border:1px solid #3498db;">TEMAS SELECTOS DE MATEMATICAS APLICADAS IV</td><td style="padding:5px; border:1px solid #3498db;">22P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4210005</td><td style="padding:5px; border:1px solid #3498db;">GRANDES PARADIGMAS CIENTIFICOS</td><td style="padding:5px; border:1px solid #3498db;">23I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4210007</td><td style="padding:5px; border:1px solid #3498db;">HISTORIA CONTEMPORANEA</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4210015</td><td style="padding:5px; border:1px solid #3498db;">FUNDAMENTOS DE CONTABILIDAD</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4210020</td><td style="padding:5px; border:1px solid #3498db;">FUNDAMENTOS DE CONTABILIDAD DE COSTOS</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4210023</td><td style="padding:5px; border:1px solid #3498db;">ADMINISTRACION FINANCIERA I</td><td style="padding:5px; border:1px solid #3498db;">22P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4210044</td><td style="padding:5px; border:1px solid #3498db;">GESTION DEL CONOCIMIENTO Y APRENDIZAJE ORGANIZACIONAL</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4210053</td><td style="padding:5px; border:1px solid #3498db;">CULTURAS, CONFLICTOS Y ORGANIZACION</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4210081</td><td style="padding:5px; border:1px solid #3498db;">DERECHO DE LOS RECURSOS NATURALES</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4210082</td><td style="padding:5px; border:1px solid #3498db;">DERECHOS HUMANOS</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4211019</td><td style="padding:5px; border:1px solid #3498db;">NUEVAS FORMAS DE ORGANIZACION DE LA SOCIEDAD CIVIL</td><td style="padding:5px; border:1px solid #3498db;">22P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4211066</td><td style="padding:5px; border:1px solid #3498db;">SEMINARIO DE ECONOMIA POLITICA</td><td style="padding:5px; border:1px solid #3498db;">23I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4211067</td><td style="padding:5px; border:1px solid #3498db;">SEMINARIO: GLOBALIZACION</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4211080</td><td style="padding:5px; border:1px solid #3498db;">ETICA</td><td style="padding:5px; border:1px solid #3498db;">24P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4211081</td><td style="padding:5px; border:1px solid #3498db;">FILOSOFIA POLITICA</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4211082</td><td style="padding:5px; border:1px solid #3498db;">FILOSOFIA SOCIAL</td><td style="padding:5px; border:1px solid #3498db;">22P</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4212013</td><td style="padding:5px; border:1px solid #3498db;">PROCESOS MUNDIALES CONTEMPORANEOS</td><td style="padding:5px; border:1px solid #3498db;">22I</td><td style="padding:5px; border:1px solid #3498db;"></td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div id="uea-no-aprobadas-content" style="display:none;">
                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Clave de UEA</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Nombre</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Trimestre lectivo</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Tipo de evaluación</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Plan</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Versión</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Area de concentración</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">No. de acta</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Renglón</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Origen de calif.</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4210011</td><td style="padding:5px; border:1px solid #3498db;">FUNDAMENTOS DE TEORIA ADMINISTRATIVA</td><td style="padding:5px; border:1px solid #3498db;">23O</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410131522</td><td style="padding:5px; border:1px solid #3498db;">26</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4210011</td><td style="padding:5px; border:1px solid #3498db;">FUNDAMENTOS DE TEORIA ADMINISTRATIVA</td><td style="padding:5px; border:1px solid #3498db;">24O</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410160678</td><td style="padding:5px; border:1px solid #3498db;">21</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4600002</td><td style="padding:5px; border:1px solid #3498db;">MATEMATICAS DISCRETAS II</td><td style="padding:5px; border:1px solid #3498db;">23O</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410135479</td><td style="padding:5px; border:1px solid #3498db;">18</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4600002</td><td style="padding:5px; border:1px solid #3498db;">MATEMATICAS DISCRETAS II</td><td style="padding:5px; border:1px solid #3498db;">24P</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410152439</td><td style="padding:5px; border:1px solid #3498db;">19</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div id="creditos-cubiertos-content" style="display:none;">
                                <div class="section-header">Créditos Cubiertos</div>
                                
                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px; margin-bottom:15px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:5px; border:1px solid #2980b9; color:white; text-align:center;" colspan="3">Plan</th>
                                        </tr>
                                        <tr style="background:#5dade2;">
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Clave</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Nombre</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Versión</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:5px; border:1px solid #3498db;">137</td>
                                            <td style="padding:5px; border:1px solid #3498db;">LICENCIATURA EN TECNOLOGIAS Y SISTEMAS DE INFORMACION</td>
                                            <td style="padding:5px; border:1px solid #3498db;">2</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px; margin-bottom:15px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos Contabilizados</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Créditos a Cubrir</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Porcentaje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:5px; border:1px solid #3498db; text-align:center;">223</td>
                                            <td style="padding:5px; border:1px solid #3498db; text-align:center;">459</td>
                                            <td style="padding:5px; border:1px solid #3498db; text-align:center;">48.58%</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Nivel</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">A.C.</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Nombre</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Créditos a Cubrir</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Obligatorios</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Optativos Mínimo</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Optativos Máximo</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Total</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Obligatorios</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Optativos</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Total</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Obligatorios</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Optativos</th>
                                            <th style="padding:6px; border:1px solid #2980b9; color:white;">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:6px; border:1px solid #3498db;">1</td>
                                            <td style="padding:6px; border:1px solid #3498db;"></td>
                                            <td style="padding:6px; border:1px solid #3498db;">TRONCO GENERAL DE FORMACION INICIAL</td>
                                            <td style="padding:6px; border:1px solid #3498db;">32</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">32</td>
                                            <td style="padding:6px; border:1px solid #3498db;">32</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">32</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                        </tr>
                                        <tr style="background:#ffffff;">
                                            <td style="padding:6px; border:1px solid #3498db;">2</td>
                                            <td style="padding:6px; border:1px solid #3498db;"></td>
                                            <td style="padding:6px; border:1px solid #3498db;">FORMACION BASICA</td>
                                            <td style="padding:6px; border:1px solid #3498db;">205</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">205</td>
                                            <td style="padding:6px; border:1px solid #3498db;">133</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">133</td>
                                            <td style="padding:6px; border:1px solid #3498db;">72</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">72</td>
                                        </tr>
                                        <tr style="background:#f9f9f9;">
                                            <td style="padding:6px; border:1px solid #3498db;">3</td>
                                            <td style="padding:6px; border:1px solid #3498db;"></td>
                                            <td style="padding:6px; border:1px solid #3498db;">FORMACION PROFESIONAL</td>
                                            <td style="padding:6px; border:1px solid #3498db;">122</td>
                                            <td style="padding:6px; border:1px solid #3498db;">100</td>
                                            <td style="padding:6px; border:1px solid #3498db;">132</td>
                                            <td style="padding:6px; border:1px solid #3498db;">254</td>
                                            <td style="padding:6px; border:1px solid #3498db;">Máx. 20</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">20</td>
                                            <td style="padding:6px; border:1px solid #3498db;">102</td>
                                            <td style="padding:6px; border:1px solid #3498db;">100</td>
                                            <td style="padding:6px; border:1px solid #3498db;">234</td>
                                        </tr>
                                        <tr style="background:#e8f4fc;">
                                            <td style="padding:6px; border:1px solid #3498db; font-weight:bold;" colspan="3">TOTALES</td>
                                            <td style="padding:6px; border:1px solid #3498db; font-weight:bold;">359</td>
                                            <td style="padding:6px; border:1px solid #3498db;">132</td>
                                            <td style="padding:6px; border:1px solid #3498db;"></td>
                                            <td style="padding:6px; border:1px solid #3498db; font-weight:bold;">491</td>
                                            <td style="padding:6px; border:1px solid #3498db;">223</td>
                                            <td style="padding:6px; border:1px solid #3498db;">0</td>
                                            <td style="padding:6px; border:1px solid #3498db;">223</td>
                                            <td style="padding:6px; border:1px solid #3498db;">136</td>
                                            <td style="padding:6px; border:1px solid #3498db;">100</td>
                                            <td style="padding:6px; border:1px solid #3498db;">268</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (page === 'linea-captura') {
                mainHeader.textContent = 'Información - LÍNEAS DE CAPTURA TRIMESTRE 2026 PRIMAVERA';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="header-with-date">
                            <div class="general-data-bar">
                                <span><strong>Matrícula:</strong> 2203024222</span>
                                <span><strong>Estado Académico:</strong> INSCRITO A UEA</span>
                                <span><strong>Apellido Paterno:</strong> ROMERO</span>
                                <span><strong>Apellido Materno:</strong> PEREZ</span>
                                <span><strong>Nombre(s):</strong> VICTOR MIGUEL</span>
                            </div>

                        <div class="tabs">
                            <button class="tab active" data-tab="datos-academicos-lc">Datos Académicos</button>
                            <button class="tab" data-tab="uea-no-aprobadas-lc">UEA no aprobadas</button>
                        </div>

                        <div class="tab-content">
                            <div id="datos-academicos-lc-content">
                                <div class="section-header">Datos personales</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Unidad:</span>
                                    <span class="field-value">CUAJIMALPA</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">División:</span>
                                    <span class="field-value">CIENCIAS DE LA COMUNICACIÓN Y DISEÑO</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Carrera:</span>
                                    <span class="field-value">LICENCIATURA EN TECNOLOGÍAS Y SISTEMAS DE INFORMACIÓN</span>
                                </div>
                            </div>

                            <div class="section-header">Información académica</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Clave:</span>
                                    <span class="field-value">137</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Versión del plan de estudios:</span>
                                    <span class="field-value">2</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Duración de la carrera:</span>
                                    <span class="field-value">12 trimestres</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Créditos mínimos:</span>
                                    <span class="field-value">459</span>
                                </div>
                            </div>

                            <div class="section-header">Datos adicionales</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Área de concentración:</span>
                                    <span class="field-value">0</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Sub-área de concentración:</span>
                                    <span class="field-value">0</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Trimestre de ingreso:</span>
                                    <span class="field-value">200</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Último trimestre con actividad académica:</span>
                                    <span class="field-value">26I</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Último trimestre inscrito:</span>
                                    <span class="field-value">26I</span>
                                </div>
                            </div>

                            <div class="section-header">Información final</div>
                            
                            <div class="form-grid">
                                <div class="form-field">
                                    <span class="field-label">Créditos acumulados:</span>
                                    <span class="field-value">223</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Número de NA en tronco:</span>
                                    <span class="field-value">0</span>
                                </div>
                                <div class="form-field">
                                    <span class="field-label">Años de reinscripción transcurridos:</span>
                                    <span class="field-value">5</span>
                                </div>
                            </div>

                            <div class="info-text">
                                <p>Verifica los adeudos de documentos en la opción INFORMACIÓN PERSONAL y pagos diversos en la opción PAGOS.</p>
                            </div>

                            <div class="info-text" style="background: #fff3cd; border-color: #ffc107;">
                                <p>En caso de existir algún dato incorrecto envía un correo a uamaspirantesaceptados@correo.uam.mx y realiza la aclaración o corrección correspondiente.</p>
                            </div>
                            </div>

                            <div id="uea-no-aprobadas-lc-content" style="display:none;">
                                <table style="width:100%; border-collapse:collapse; border:2px solid #3498db; font-family:Arial, sans-serif; font-size:10px;">
                                    <thead>
                                        <tr style="background:#3498db;">
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Clave de UEA</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Nombre</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Trimestre lectivo</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Tipo de evaluación</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Plan</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Versión</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Area de concentración</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">No. de acta</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Renglón</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Origen de calif.</th>
                                            <th style="padding:5px; border:1px solid #2980b9; color:white;">Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4210011</td><td style="padding:5px; border:1px solid #3498db;">FUNDAMENTOS DE TEORIA ADMINISTRATIVA</td><td style="padding:5px; border:1px solid #3498db;">23O</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410131522</td><td style="padding:5px; border:1px solid #3498db;">26</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4210011</td><td style="padding:5px; border:1px solid #3498db;">FUNDAMENTOS DE TEORIA ADMINISTRATIVA</td><td style="padding:5px; border:1px solid #3498db;">24O</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410160678</td><td style="padding:5px; border:1px solid #3498db;">21</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                        <tr style="background:#f9f9f9;"><td style="padding:5px; border:1px solid #3498db;">4600002</td><td style="padding:5px; border:1px solid #3498db;">MATEMATICAS DISCRETAS II</td><td style="padding:5px; border:1px solid #3498db;">23O</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410135479</td><td style="padding:5px; border:1px solid #3498db;">18</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                        <tr style="background:#ffffff;"><td style="padding:5px; border:1px solid #3498db;">4600002</td><td style="padding:5px; border:1px solid #3498db;">MATEMATICAS DISCRETAS II</td><td style="padding:5px; border:1px solid #3498db;">24P</td><td style="padding:5px; border:1px solid #3498db;">GLO.</td><td style="padding:5px; border:1px solid #3498db;">137</td><td style="padding:5px; border:1px solid #3498db;">2</td><td style="padding:5px; border:1px solid #3498db;">0</td><td style="padding:5px; border:1px solid #3498db;">410152439</td><td style="padding:5px; border:1px solid #3498db;">19</td><td style="padding:5px; border:1px solid #3498db;">U.E.A. CURSADA</td><td style="padding:5px; border:1px solid #3498db;">NA</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (page === 'hoja-inscripcion') {
                mainHeader.textContent = 'Hoja de Inscripción';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="inscripcion-doc">
                            <div class="doc-header">
                                <div class="doc-logo">
                                    <img src="logo-universidad.png" alt="Logo UAM" style="height: 60px;">
                                    <div class="slogan">Casa abierta al tiempo</div>
                                </div>
                                <div class="doc-info">
                                    <div><strong>Matrícula:</strong> 2203024222</div>
                                    <div><strong>Trimestre:</strong> 26I</div>
                                    <div><strong>Fecha de expedición:</strong> 8 de Abril del 2026</div>
                                </div>
                            </div>

                            <h1 class="doc-title">HOJA DE INSCRIPCIÓN</h1>

                            <div class="doc-section">
                                <h3 class="section-title">Datos Académicos</h3>
                                <div class="data-grid">
                                    <div><strong>Ap. Paterno:</strong> ROMERO</div>
                                    <div><strong>Ap. Materno:</strong> PEREZ</div>
                                    <div><strong>Nombre(s):</strong> VICTOR MIGUEL</div>
                                    <div><strong>Estado:</strong> INSCRITO A UEA</div>
                                    <div><strong>Dedicación:</strong> TIEMPO COMPLETO</div>
                                    <div><strong>Nacionalidad:</strong> MEXICANA</div>
                                    <div><strong>Plan de Estudios:</strong> LICENCIATURA EN TECNOLOGÍAS Y SISTEMAS DE INFORMACIÓN</div>
                                    <div><strong>Unidad:</strong> CUAJIMALPA</div>
                                    <div><strong>División:</strong> CIENCIAS DE LA COMUNICACIÓN Y DISEÑO</div>
                                    <div><strong>Turno:</strong> MATUTINO</div>
                                </div>
                            </div>

                            <div class="doc-section">
                                <h3 class="section-title">Datos Personales</h3>
                                <div class="boxed-data">
                                    <div><strong>Fecha de nacimiento:</strong> 07/08/2002</div>
                                    <div><strong>Lugar de nacimiento:</strong> MÉXICO</div>
                                    <div><strong>R.F.C:</strong> ROPV020807GM9</div>
                                    <div><strong>C.U.R.P:</strong> ROPV020807HMCMRCA8</div>
                                </div>
                            </div>

                            <div class="doc-section">
                                <h3 class="section-title">Datos de Contacto</h3>
                                <div class="data-grid">
                                    <div><strong>Teléfono móvil:</strong> 5533722825</div>
                                    <div><strong>Teléfono particular:</strong></div>
                                    <div><strong>Otro teléfono:</strong></div>
                                    <div><strong>Correo personal:</strong> vitmicky18@gmail.com</div>
                                </div>
                            </div>

                            <div class="doc-section">
                                <h3 class="section-title">Domicilio</h3>
                                <div class="data-grid">
                                    <div><strong>Calle y número:</strong> EMILIANO ZAPATA 3</div>
                                    <div><strong>Colonia:</strong> SANTIAGO YANHUITLALPAN</div>
                                    <div><strong>Código Postal:</strong> 52766</div>
                                    <div><strong>Alcaldía / Municipio:</strong> HUIXQUILUCAN</div>
                                    <div><strong>Entidad Federativa:</strong> MÉXICO</div>
                                </div>
                            </div>

                            <div class="doc-footer-section">
                                <div class="seal-box">
                                    <div class="seal-circle"></div>
                                    <div class="seal-text">Coordinación de Sistemas Escolares</div>
                                </div>
                                <div class="info-box">
                                    <p>La Legislación Universitaria la podrás consultar en la página electrónica https://www.uam.mx/legislacion/index.html...</p>
                                    <p class="manifest">Manifiesto bajo protesta de decir la verdad que los datos asentados en este documento son ciertos.</p>
                                </div>
                                <div class="firma-box">
                                    <div class="firma-line"></div>
                                    <div class="firma-name">ROMERO PEREZ VICTOR MIGUEL</div>
                                </div>
                            </div>

                            <div class="btn-print-container">
                                <button class="btn-print" onclick="window.print()">IMPRIMIR</button>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (page === 'comprobante') {
                mainHeader.textContent = 'Comprobante de Reinscripción a UEA-GRUPO';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="section-header">Área y Sub-área del Alumno</div>
                        
                        <table class="info-table">
                            <tr>
                                <th>PLAN DE ESTUDIOS</th>
                                <td>LICENCIATURA EN TECNOLOGÍAS Y SISTEMAS DE INFORMACIÓN</td>
                            </tr>
                            <tr>
                                <th>ÁREA DE CONCENTRACIÓN</th>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>SUB-ÁREA</th>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>ESTADO ACADÉMICO</th>
                                <td>INSCRITO A UEA</td>
                            </tr>
                        </table>

                        <div class="section-header">Adeudo de Documentos</div>
                        
                        <table class="info-table">
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Estado</th>
                                    <th>Vencimiento/prórroga</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="3" class="empty-cell">No hay documentos pendientes</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="section-header">Adeudos Varios</div>
                        
                        <table class="info-table">
                            <thead>
                                <tr>
                                    <th>Tipo de adeudo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="empty-cell">No hay adeudos</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="section-header">Pago</div>
                        
                        <table class="info-table">
                            <thead>
                                <tr>
                                    <th>Estado del pago</th>
                                    <th>Dedicación</th>
                                    <th>Monto a pagar</th>
                                    <th>Origen del pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PAGO CUBIERTO</td>
                                    <td>TIEMPO COMPLETO</td>
                                    <td>$128.43</td>
                                    <td>LINEA DE CAPTURA</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="important-message">
                            Esta INACTIVO el proceso Comprobante de Inscripción-Reinscripción a UEA-GRUPO Vigencia 09/01/2026 - 01/04/2026
                        </div>

                        <div class="btn-update-container">
                            <button class="btn-update">SALIR</button>
                        </div>
                    </div>
                `;
            }

            if (page === 'tiempo-permanencia') {
                mainHeader.textContent = 'Consulta de Tiempo de Permanencia';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="tiempo-section">
                            <div class="info-card">
                                <h3 class="card-title">Datos del Alumno</h3>
                                <div class="card-grid">
                                    <div><strong>Matrícula:</strong> 2203024222</div>
                                    <div><strong>Nombre:</strong> ROMERO PEREZ VICTOR MIGUEL</div>
                                    <div><strong>Estado:</strong> 1: INSCRITO A UEA</div>
                                    <div><strong>Nacionalidad:</strong> Mexicana(o)</div>
                                    <div><strong>Nivel:</strong> Licenciatura</div>
                                </div>
                            </div>

                            <div class="info-card">
                                <h3 class="card-title">Datos Académicos</h3>
                                <div class="card-grid">
                                    <div><strong>Unidad:</strong> CUAJIMALPA</div>
                                    <div><strong>División:</strong> CIENCIAS DE LA COMUNICACIÓN Y DISEÑO</div>
                                    <div><strong>Carrera:</strong> 137: TECNOLOGÍAS Y SISTEMAS DE INFORMACIÓN</div>
                                    <div><strong>Ver. del plan:</strong> 2</div>
                                </div>
                            </div>

                            <div class="indicadores-grid">
                                <div class="indicador-item">
                                    <span class="indicador-label">Créditos máximos</span>
                                    <span class="indicador-value">459</span>
                                </div>
                                <div class="indicador-item">
                                    <span class="indicador-label">Créditos mínimos</span>
                                    <span class="indicador-value">459</span>
                                </div>
                                <div class="indicador-item highlight">
                                    <span class="indicador-label">Créditos acumulados</span>
                                    <span class="indicador-value">223</span>
                                </div>
                                <div class="indicador-item">
                                    <span class="indicador-label">Duración de la carrera</span>
                                    <span class="indicador-value">12 trimestres</span>
                                </div>
                                <div class="indicador-item">
                                    <span class="indicador-label">Duración máxima de la carrera</span>
                                    <span class="indicador-value">-</span>
                                </div>
                            </div>

                            <div class="info-card">
                                <h3 class="card-title">Información de avance</h3>
                                <div class="card-grid">
                                    <div><strong>Área de concentración:</strong> 0</div>
                                    <div><strong>Sub-área:</strong> 0</div>
                                    <div><strong>Trimestre de ingreso:</strong> 200</div>
                                    <div><strong>Último trimestre con actividad académica:</strong> 26I</div>
                                    <div><strong>Último trimestre inscrito:</strong> 26I</div>
                                </div>
                            </div>

                            <div class="resumen-grid">
                                <div class="resumen-item">
                                    <span class="resumen-label">Trimestres contabilizados</span>
                                    <span class="resumen-value">30</span>
                                </div>
                                <div class="resumen-item">
                                    <span class="resumen-label">Trimestres restantes</span>
                                    <span class="resumen-value">0</span>
                                </div>
                            </div>

                            <div class="btn-center">
                                <button class="btn-action">Emitir comprobante</button>
                            </div>

                            <div class="error-message">
                                Se ha presentado un error al momento de contabilizar los trimestres, favor de intentar más tarde
                            </div>
                        </div>
                    </div>
                `;
            }

            if (page === 'cambiar-password') {
                mainHeader.textContent = 'Cambio de contraseña';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="password-container">
                            <div class="password-rules">
                                <h3 class="rules-title">Reglas de la contraseña</h3>
                                <ul class="rules-list">
                                    <li>La contraseña debe estar formada por una palabra de diez a quince caracteres</li>
                                    <li>Debe contener al menos una letra mayúscula [A-Z]</li>
                                    <li>Debe contener al menos una letra minúscula [a-z]</li>
                                    <li>Debe contener al menos un número [0-9]</li>
                                    <li>No se permiten vocales acentuadas, ñ, Ñ ni espacios</li>
                                    <li>No puede establecer la contraseña actual ni tres anteriores</li>
                                </ul>
                            </div>

                            <div class="password-form">
                                <div class="form-group-password">
                                    <label>Contraseña actual</label>
                                    <input type="password" id="password-actual" class="password-input">
                                </div>
                                <div class="form-group-password">
                                    <label>Contraseña nueva</label>
                                    <input type="password" id="password-nueva" class="password-input">
                                </div>
                                <div class="form-group-password">
                                    <label>Confirme contraseña nueva</label>
                                    <input type="password" id="password-confirm" class="password-input">
                                </div>

                                <div class="password-buttons">
                                    <button class="btn-password cambiar" onclick="cambiarContrasena()">cambiar</button>
                                    <button class="btn-password limpiar" onclick="limpiarCampos()">limpiar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (page === 'bajas-lenguas') {
                mainHeader.textContent = 'Bajas de Inscripción a Cursos de Lenguas Extranjeras';
                contentContainer.innerHTML = `
                    <div class="page-content">
                        <div class="bajas-container">
                            <div class="info-row">
                                <div class="info-item">
                                    <label>Alumno:</label>
                                    <input type="text" value="VICTOR MIGUEL ROMERO PEREZ" disabled>
                                </div>
                                <div class="info-item">
                                    <label>Trimestre del proceso:</label>
                                    <input type="text" value="26I" disabled>
                                </div>
                                <div class="info-item">
                                    <label>Matrícula:</label>
                                    <input type="text" value="2203024222" disabled>
                                </div>
                            </div>

                            <div class="alert-message">
                                El proceso ya no está activo, la fecha límite fue el 20/2/2026
                            </div>

                            <div class="folio-text">
                                Folio: 2026-26I-001234
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    });

    document.querySelectorAll('.menu-item:not([data-page])').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            mainHeader.textContent = 'Avisos';
            contentContainer.innerHTML = '<!-- Container vacío para avisos -->';
        });
    });

    window.cambiarContrasena = function() {
        const actual = document.getElementById('password-actual').value;
        const nueva = document.getElementById('password-nueva').value;
        const confirm = document.getElementById('password-confirm').value;
        
        if (!actual || !nueva || !confirm) {
            alert('Todos los campos son requeridos');
            return;
        }
        
        if (nueva !== confirm) {
            alert('Las contraseñas nuevas no coinciden');
            return;
        }
        
        if (nueva.length < 10 || nueva.length > 15) {
            alert('La contraseña debe tener entre 10 y 15 caracteres');
            return;
        }
        
        if (!/[A-Z]/.test(nueva)) {
            alert('La contraseña debe contener al menos una mayúscula');
            return;
        }
        
        if (!/[a-z]/.test(nueva)) {
            alert('La contraseña debe contener al menos una minúscula');
            return;
        }
        
        if (!/[0-9]/.test(nueva)) {
            alert('La contraseña debe contener al menos un número');
            return;
        }
        
        alert('Contraseña cambiada exitosamente');
    };

    window.limpiarCampos = function() {
        document.getElementById('password-actual').value = '';
        document.getElementById('password-nueva').value = '';
        document.getElementById('password-confirm').value = '';
    };

    window.mostrarCarta = function() {
        var cartaWindow = window.open('', 'Carta', 'width=800,height=600,scrollbars=yes');
        cartaWindow.document.write('<!DOCTYPE html><html><head><title>Carta de No Violencia</title>');
        cartaWindow.document.write('<style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;}');
        cartaWindow.document.write('h1{font-size:18px;text-align:center;margin-bottom:30px;}');
        cartaWindow.document.write('.fecha{text-align:right;margin-bottom:20px;}');
        cartaWindow.document.write('.destinatario{text-align:left;margin-bottom:20px;}');
        cartaWindow.document.write('.contenido{text-align:justify;line-height:1.8;margin-bottom:30px;}');
        cartaWindow.document.write('.firma{border-top:1px solid #000;padding-top:10px;margin-top:50px;}');
        cartaWindow.document.write('.nombre{font-weight:bold;margin-top:10px;}');
        cartaWindow.document.write('.nota{font-size:10px;font-style:italic;margin-top:30px;}');
        cartaWindow.document.write('.imprimir{text-align:center;margin-top:30px;}');
        cartaWindow.document.write('.btn-print{background:#3498db;color:white;border:none;padding:6px 30px;cursor:pointer;font-size:14px;}');
        cartaWindow.document.write('</style></head><body>');
        cartaWindow.document.write('<h1>CARTA DE FOMENTO A UNA CULTURA DE PAZ Y ELIMINACIÓN DE LA VIOLENCIA EN LA UAM</h1>');
        cartaWindow.document.write('<div class="fecha">Ciudad de México, a 13 de Abril de 2026</div>');
        cartaWindow.document.write('<div class="destinatario"><strong>Universidad Autónoma Metropolitana</strong><br>P r e s e n t e</div>');
        cartaWindow.document.write('<div class="contenido">Se me ha informado que conforme a los principios derivados de los artículos 1º y 3º de la Constitución Política de los Estados Unidos Mexicanos, la educación que recibiré de la Universidad tenderá a fomentar el respeto a los derechos humanos, el aprecio y respeto por la diversidad cultural, y la dignidad de las personas, por lo que, como integrante del alumnado de la Universidad Autónoma Metropolitana, expreso mi compromiso para:<br><br>Contribuir a que en los espacios universitarios prevalezca una cultura de paz y se mantengan libres de manifestaciones violentas o discriminatorias que atenten contra la integridad, seguridad, derechos y libertades de las personas, por lo que apoyaré las medidas institucionales relacionadas con la prevención y atención de la violencia, especialmente la que se ejerza por razones de género, y la discriminación.<br><br>Tomar cursos, talleres y pláticas en general, que fortalezcan mi formación en materia de derechos humanos y perspectiva de género, entre otros.<br><br>Observar, en cualquier actividad escolar que realice, los principios rectores y valores institucionales como los de igualdad, libertad, tolerancia, honradez, responsabilidad, solidaridad y sostenibilidad, entre otros.<br><br>Respetar la obra intelectual que utilice o conoce en mi formación académica, por lo que en ningún caso presentaré, como propios, trabajos que no sean de mi autoría.<br><br>Contribuir en la conservación, ampliación y fortalecimiento de los recursos naturales y sociales necesarios para la humanidad y la preservación de la vida en el planeta.<br><br>Para ello atenderé, especialmente, las Políticas Transversales para Erradicar la Violencia por Razones de Género; el Reglamento del Alumnado, en lo relativo a los derechos, responsabilidades y faltas; el Reglamento de la Defensoría de los Derechos Universitarios, y el Código de Ética, en cuanto a los derechos humanos y universitarios que se deben preservar en los espacios universitarios.</div>');
        cartaWindow.document.write('<div class="firma"><div style="text-align:center;">A t e n t a m e n t e</div><br><div style="text-align:center; border-top:1px solid #000; padding-top:10px; margin:0 auto; width:300px;">ROMERO PEREZ VICTOR MIGUEL<br>Licenciatura<br>2203024222</div></div>');
        cartaWindow.document.write('<div class="nota">* En caso de ser menor de edad, es necesario que la firma sea de la madre, padre o tutor</div>');
        cartaWindow.document.write('<div class="imprimir"><button class="btn-print" onclick="window.print()">Imprimir</button></div>');
        cartaWindow.document.write('<div style="margin-top:20px;font-size:10px;text-align:center;">AELCWBADC009/SAE/V6/JEGH/11042023</div>');
        cartaWindow.document.write('</body></html>');
        cartaWindow.document.close();
    };

    var datosKardex = [];
    var kardexCargado = false;

    window.cargarKardex = function() {
        if (kardexCargado) return;
        
        var tbody = document.getElementById('kardex-tbody');
        if (!tbody) return;
        
        var filas = tbody.querySelectorAll('tr');
        datosKardex = [];
        filas.forEach(function(fila, index) {
            var cells = fila.querySelectorAll('td');
            if (cells.length >= 8) {
                datosKardex.push({
                    registro: cells[0].textContent.trim(),
                    uea: cells[1].textContent.trim(),
                    nombre: cells[2].textContent.trim(),
                    trimestre: cells[3].textContent.trim(),
                    tipoEval: cells[4].textContent.trim(),
                    calificacion: cells[5].textContent.trim(),
                    acta: cells[6].textContent.trim(),
                    creditos: cells[7].textContent.trim()
                });
            }
        });
        kardexCargado = true;
        console.log('Kardex cargado:', datosKardex.length, 'registros');
    };

    window.filtrarPorTrimestre = function() {
        var select = document.getElementById('trimestre-select');
        var trimestre = select.value;
        
        if (!trimestre) {
            return;
        }
        
        window.cargarKardex();
        
        var tbody = document.getElementById('kardex-tbody');
        tbody.innerHTML = '';
        
        var filtered = datosKardex.filter(function(item) {
            return item.trimestre.trim() === trimestre;
        });
        
        filtered.forEach(function(item, index) {
            var row = document.createElement('tr');
            row.innerHTML = '<td class="text-right">' + (index + 1) + '</td>' +
                '<td>' + item.uea + '</td>' +
                '<td>' + item.nombre + '</td>' +
                '<td>' + item.trimestre + '</td>' +
                '<td>' + item.tipoEval + '</td>' +
                '<td class="text-right">' + item.calificacion + '</td>' +
                '<td>' + item.acta + '</td>' +
                '<td class="text-right">' + item.creditos + '</td>';
            tbody.appendChild(row);
        });
        
        if (filtered.length === 0) {
            var row = document.createElement('tr');
            row.innerHTML = '<td colspan="8" style="text-align:center;">No se encontraron registros para este trimestre</td>';
            tbody.appendChild(row);
        }
    };

    window.filtrarPorUEA = function() {
        var select = document.getElementById('uea-select');
        var uea = select.value;
        
        if (!uea) {
            return;
        }
        
        window.cargarKardex();
        
        var tbody = document.getElementById('kardex-tbody');
        tbody.innerHTML = '';
        
        var filtered = datosKardex.filter(function(item) {
            return item.uea.trim() === uea;
        });
        
        filtered.forEach(function(item, index) {
            var row = document.createElement('tr');
            row.innerHTML = '<td class="text-right">' + (index + 1) + '</td>' +
                '<td>' + item.uea + '</td>' +
                '<td>' + item.nombre + '</td>' +
                '<td>' + item.trimestre + '</td>' +
                '<td>' + item.tipoEval + '</td>' +
                '<td class="text-right">' + item.calificacion + '</td>' +
                '<td>' + item.acta + '</td>' +
                '<td class="text-right">' + item.creditos + '</td>';
            tbody.appendChild(row);
        });
        
        if (filtered.length === 0) {
            var row = document.createElement('tr');
            row.innerHTML = '<td colspan="8" style="text-align:center;">No se encontraron registros para esta UEA</td>';
            tbody.appendChild(row);
        }
    };

    window.mostrarTodoKardex = function() {
        cargarKardex();
        
        var tbody = document.getElementById('kardex-tbody');
        if (!tbody || datosKardex.length === 0) {
            window.location.reload();
            return;
        }
        tbody.innerHTML = '';
        datosKardex.forEach(function(item, index) {
            var row = document.createElement('tr');
            row.innerHTML = '<td class="text-right">' + (index + 1) + '</td>' +
                '<td>' + item.uea + '</td>' +
                '<td>' + item.nombre + '</td>' +
                '<td>' + item.trimestre + '</td>' +
                '<td>' + item.tipoEval + '</td>' +
                '<td class="text-right">' + item.calificacion + '</td>' +
                '<td>' + item.acta + '</td>' +
                '<td class="text-right">' + item.creditos + '</td>';
            tbody.appendChild(row);
        });
    };
});
