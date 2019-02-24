FROM <%- dockerBaseImage %>
ENV JAVA_OPTS="-server -Djgroups.tcp.address=NON_LOOPBACK -Djava.net.preferIPv4Stack=true"

CMD java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /app.jar
<% if (webServer) { -%>
EXPOSE <%- webServerPort %>
<% } -%>
ADD *.jar /app.jar
