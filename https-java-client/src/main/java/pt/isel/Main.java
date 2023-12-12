package pt.isel;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.TrustManagerFactory;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.KeyStore;
import java.security.SecureRandom;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;

public class Main {

    private static final int PORT = 4433;
    private static SSLContext ssl;

    public static void main(String[] args) throws Exception {
        makeConnection();
        System.out.println("Connection established successfully!");
    }

    private static void prepareConnection() {

        try {
            KeyStore ks = KeyStore.getInstance("PKCS12");
            ks.load(null, null);

            Certificate CA1 = CertificateFactory.getInstance("X.509")
                    .generateCertificate(new FileInputStream("https-java-client/certificates/CA1.cer"));

            ks.setCertificateEntry("CA1", CA1);

            TrustManagerFactory trustManager =
                    TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManager.init(ks);

            SecureRandom random = new SecureRandom();
            ssl = SSLContext.getInstance("TLS");
            ssl.init(null, trustManager.getTrustManagers(), random);
        } catch (Exception e) {
            System.out.println("Error preparing connection: " + e.getMessage());
        }
    }

    public static void makeConnection() throws IOException {
        prepareConnection();
        try (SSLSocket client = (SSLSocket) ssl.getSocketFactory().createSocket("www.secure-server.edu", PORT)) {
            client.startHandshake();
        }
    }
}