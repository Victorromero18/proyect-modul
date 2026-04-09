document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item[data-page]');
    const contentContainer = document.getElementById('contentContainer');
    const mainHeader = document.querySelector('.main-header h2');

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
                                <button class="btn-control">Todo Kardex</button>
                            </div>
                            <div class="controls-right">
                                <div class="control-row">
                                    <select class="select-control">
                                        <option>Seleccionar...</option>
                                        <option>26I</option>
                                        <option>25O</option>
                                        <option>25I</option>
                                    </select>
                                    <button class="btn-control">Consulta x Trim.</button>
                                </div>
                                <div class="control-row">
                                    <select class="select-control">
                                        <option>Seleccionar UEA...</option>
                                        <option>2211001</option>
                                        <option>2211002</option>
                                        <option>2211003</option>
                                    </select>
                                    <button class="btn-control">Consulta x UEA</button>
                                </div>
                            </div>
                        </div>

                        <table class="kardex-table">
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
                            <tbody>
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

                        <div class="section-title">Colegiaturas - Servicios en Caja</div>

                        <div class="section-title">Detalle</div>

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
                                    <td class="text-center"><button class="btn-emitir">Emitir</button></td>
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
                            <button class="tab active">Datos Personales</button>
                            <button class="tab">Seguro Social</button>
                            <button class="tab">Tutorías</button>
                            <button class="tab">Documentos</button>
                        </div>

                        <div class="tab-content">
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
                                    <span class="field-value">Santiago Yanhuitlalpan</span>
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
                            <button class="tab active">Datos Académicos</button>
                            <button class="tab">Resumen Trimestral</button>
                            <button class="tab">Autorizaciones</button>
                            <button class="tab">UEA no aprobadas</button>
                            <button class="tab">Crédititos Cubiertos</button>
                        </div>

                        <div class="tab-content">
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
                                    <span class="field-value">185</span>
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
                                    <span class="field-value">250</span>
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
                                <button class="btn-update">Imprime información</button>
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
                            <div class="date-display">08 - Abril - 2026 19:39</div>
                        </div>

                        <div class="tabs">
                            <button class="tab active">Datos Académicos</button>
                            <button class="tab">UEA no aprobadas</button>
                        </div>

                        <div class="tab-content">
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
                                    <span class="field-value">250</span>
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
                                    <span class="field-value">185</span>
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

                            <div class="btn-update-container">
                                <button class="btn-update">CONTINUAR</button>
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
                                <button class="btn-print">IMPRIMIR</button>
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
});
