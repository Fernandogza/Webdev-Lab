<?php
/**
 * Configuracion de la base de datos
 */
 //*/
R::setup('mysql:host=localhost;dbname=eventos', // host|ip; nombre de la base de datos
         'root', //user
         '251993'); //password
         //mysql
//*/

/*/ PostgreSQL
R::setup( 'pgsql:host=localhost;dbname=mydatabase',
        'user', 'password' );
//*/

/*/ SQLite3
R::setup( 'sqlite:/tmp/dbfile.db' );
//*/
