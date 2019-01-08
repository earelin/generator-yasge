package <%=packageName%>;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.net.InetAddress;

/**
 * Spring application entry point.
 */
@SpringBootApplication
public class Application {

  private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

  /**
   * Application main function.
   * @param args Command line arguments.
   */
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(Application.class);
    Environment env = app.run(args).getEnvironment();

    String protocol = "http";
    if (env.getProperty("server.ssl.key-store") != null) {
      protocol = "https";
    }
    String hostAddress = "localhost";
    try {
      hostAddress = InetAddress.getLocalHost().getHostAddress();
    } catch (Exception e) {
      LOGGER.warn("The host name could not be determined, using `localhost` as fallback", e);
    }
    LOGGER.info("\n----------------------------------------------------------\n\t" +
            "Application '{}' is running! Access URLs:\n\t" +
            "Local: \t\t{}://localhost:{}\n\t" +
            "External: \t{}://{}:{}\n\t" +
            "Profile(s): \t{}\n----------------------------------------------------------",
        env.getProperty("spring.application.name"),
        protocol,
        env.getProperty("server.port"),
        protocol,
        hostAddress,
        env.getProperty("server.port"),
        env.getActiveProfiles());
  }
}
