package <%- package %>;

import javax.persistence.*;
import java.io.Serializable;

/**
 * <%- model.description %>
 */
@Entity
@Table(name = "<%- entity.toLowerCase() %>")
public class <%- entity %> implements Serializable {

  private static final long serialVersionUID = <%- Math.round(Math.random() * 1000000000000) %>L;

<% model.properties.forEach(property -> { -%>
  private <%- property.type %> <%- property.name %>;
<% } -%>

<% model.properties.forEach(property -> { -%>
  <% if (property.type.toLowerCase() !== 'boolean') { -%>
  public <%- property.type %> get<%- property.capitalizedName %>() {
    return <%- property.name %>;
  }
  <% } else { -%>
  public <%- property.type %> is<%- property.capitalizedName %>() {
    return <%- property.name %>;
  }
  <% } -%>
  
  public void set<%- property.capitalizedName %>(<%- property.type %> <%- property.name %>) {
    this.<%- property.name %> = <%- property.name %>;
  }  
<% } -%>

}
