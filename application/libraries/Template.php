<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Template {
	var $template_data = array();

	function set($name, $value) {
		$this->template_data[$name] = $value;
	}

	function view($template = '', $view = '' , $view_data = array(), $return = FALSE){
		$this->CI =& get_instance();

    require_once APPPATH.'third_party/Mustache/Autoloader.php';
    Mustache_Autoloader::register();

        // $mustache = new Mustache_Engine(array(
    //   'template_class_prefix' => '__MyTemplates_',
    //   'cache' => dirname(__FILE__) . '/tmp/cache/mustache',
    //   'cache_file_mode' => 0666, // Please, configure your umask instead of doing this :)
    //   'cache_lambda_templates' => true,
    //   'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/views'),
    //   'partials_loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/views/partials'),
    //   'helpers' => array('i18n' => function($text) {
    //   // do something translatey here...
    //   }),
    //   'escape' => function($value) {
    //   return htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
    //   },
    //   'charset' => 'ISO-8859-1',
    //   'logger' => new Mustache_Logger_StreamLogger('php://stderr'),
    //   'strict_callables' => true,
    //   'pragmas' => [Mustache_Engine::PRAGMA_FILTERS],
    // ));

		$this->set('content', $this->CI->load->view($view, $view_data, TRUE));
		return $this->CI->load->view($template, $this->template_data, $return);
	}

	function parse($template = '', $view = '' , $view_data = array(), $return = FALSE){
		$this->CI =& get_instance();
		$this->CI->load->library('parser');

		$this->set('content', $this->CI->parser->parse($view, $view_data, TRUE));
		return $this->CI->parser->parse($template, $this->template_data, $return);
	}
}

/* Ref: http://jeromejaglale.com/doc/php/codeigniter_template */
/* End of file Template.php */
/* Location: ./system/application/libraries/Template.php */
