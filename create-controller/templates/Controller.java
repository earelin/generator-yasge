package <%- controllerPackage %>;

<% if (restController) { -%>
import org.springframework.web.bind.annotation.RestController;
<% } else { -%>
import org.springframework.stereotype.Controller;
<% } -%>

/**
 * <%- controllerDescription %>.
 */
<% if (restController) { -%>
@RestController
<% } else { -%>
@Controller
<% } -%>
public class <%- controllerName %> {

}
