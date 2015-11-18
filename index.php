<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
        class User {
         public $firstname = "";
         public $lastname = "";
         public $birthdate = "";
        } 
        
        $user = new User();
        $user->firstname = "foo";
        $user->lastname = "bar";
        
        json_encode($user);
        
        $user->birthdate = new DateTime();
        json_encode($user);
        ?>
        
        
    </body>
</html>
