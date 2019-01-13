package <%- classPackage %>;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;

public class <%- className %>Test {

  private <%- className %> <%- classVariableName %>;

  @Before
  public void setUp() {
    <%- classVariableName %> = new <%- className %>();
  }

}
