package <%- servicePackage %>;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;

/**
 * <%- serviceName %>Impl unit testing.
 */
public class <%- serviceName %>ImplTest {

  private <%- serviceName %>Impl <%- serviceVariableName %>;

  @Before
  public void setUp() {
    <%- serviceVariableName %> = new <%- serviceName %>Impl();
  }

}
