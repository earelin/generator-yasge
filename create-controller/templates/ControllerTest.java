package <%- controllerPackage %>;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;

/**
 * <%- controllerName %> unit testing.
 */
public class <%- controllerName %>Test {

  private <%- controllerName %> <%- controllerVariableName %>;

  @Before
  public void setUp() {
    <%- controllerVariableName %> = new <%- controllerName %>();
  }

}
