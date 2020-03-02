<div class="form-group">
    <label> Nombre de usuario.</label>
    <input type="text" class="form-control" name="nombre" placeholder="Nombre_usuario">   
    <?php
    $validador->mostrar_error_nombre();
    ?>
</div>
<div class="form-group">
    <label> Email.</label>
    <input type="email" class="form-control" name="email" placeholder="usuario@gmail.com">
    <?php
    $validador->mostrar_error_email();
    ?>   
</div>
<div class="form-group">
    <label> Contraseña.</label>
    <input type="password" class="form-control" name="clave1" placeholder="*********">
    <?php
    $validador->mostrar_error_clave1();
    ?>          
</div>
<div class="form-group">
    <label> Repite la contraseña.</label>
    <input type="password" class="form-control" name="clave2" placeholder="********">
    <?php
    $validador->mostrar_error_clave2();
    ?>
</div>
<br>
<button type="submit" class=" btn btn-default btn-primary" name="enviar"> Enviar datos.</button>
<button type="reset" class=" btn btn-default btn-primary"> Limpiar.</button>
