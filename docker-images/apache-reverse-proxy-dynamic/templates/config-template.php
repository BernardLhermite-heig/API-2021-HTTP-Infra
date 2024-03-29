<?php
    $dynamic_app = getenv('DYNAMIC_APP');
    $static_app = getenv('STATIC_APP');
?>

<VirtualHost *:80>
	ServerName api.labo.ch
	
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
		
	ProxyPass '/api/prize/' 'http://<?php print "$dynamic_app"?>/'
	ProxyPassReverse '/api/prize/' 'http:/<?php print "$dynamic_app"?>/'
		
	ProxyPass '/' 'http://<?php print "$static_app"?>/'
	ProxyPassReverse '/' 'http://<?php print "$static_app"?>/'
</VirtualHost>