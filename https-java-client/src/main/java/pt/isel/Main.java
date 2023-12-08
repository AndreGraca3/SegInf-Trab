package pt.isel;

import javax.net.ssl.*;
import java.io.*;
import java.security.KeyStore;
import java.security.SecureRandom;
import java.security.cert.CertificateFactory;

public class Main {

    private static final int PORT = 4433;
    private static SSLContext ssl;

    public static void main(String[] args) {
        makeConnection();
        System.out.println("Connection established successfully!");
    }

    private static void prepareConnection() {

        try (FileInputStream certificate = new FileInputStream("https-java-client/certificates/CA1.cer")) {
            KeyStore ksCertificate = KeyStore.getInstance(KeyStore.getDefaultType());
            ksCertificate.load(null);
            ksCertificate.setCertificateEntry(
                    "cert",
                    CertificateFactory.getInstance("X.509").generateCertificate(certificate)
            );

            TrustManagerFactory trustManager =
                    TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManager.init(ksCertificate);

            SecureRandom random = new SecureRandom();
            ssl = SSLContext.getInstance("TLS");
            ssl.init(null, trustManager.getTrustManagers(), random);
        } catch (Exception e) {
            System.out.println("Error preparing connection: " + e.getMessage());
        }
    }

    public static void makeConnection() {
        prepareConnection();
        try (SSLSocket client = (SSLSocket) ssl.getSocketFactory().createSocket("www.secure-server.edu", PORT)) {
            client.startHandshake();
        } catch (IOException e) {
            System.out.println("Error making connection: " + e.getMessage());
        }
    }
}