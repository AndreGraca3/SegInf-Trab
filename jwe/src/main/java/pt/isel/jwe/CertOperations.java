package pt.isel.jwe;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.*;
import java.security.cert.*;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;

import static pt.isel.utils.Utils.getFilesFromFolder;

public class CertOperations {

    private static final char[] password = "changeit".toCharArray();

    static private X509Certificate getCertificateFromFile(String fileName) throws IOException, CertificateException {
        CertificateFactory factory = CertificateFactory.getInstance("X.509");

        FileInputStream fis = new FileInputStream(fileName);
        X509Certificate cert = (X509Certificate) factory.generateCertificate(fis);
        fis.close();
        return cert;
    }

    /**
     * Validates a certificate against a chain of certificates
     *
     * @param certificateFile The certificate to be validated
     * @param chain           The chain of certificates
     * @param trustedCount    The number of trusted certificates in the chain
     * @return true if the certificate is valid, false otherwise
     */
    private static boolean validateCertificate(
            String certificateFile,
            ArrayList<String> chain,
            int trustedCount
    ) throws CertificateException, IOException, InvalidAlgorithmParameterException, NoSuchAlgorithmException {

        ArrayList<X509Certificate> certCollection = new ArrayList<>();
        for (String s : chain) {
            certCollection.add(getCertificateFromFile(s));
        }

        CertStore certStore = CertStore.getInstance("Collection", new
                CollectionCertStoreParameters(certCollection)
        );
        X509CertSelector certSelector = new X509CertSelector();
        certSelector.setCertificate(getCertificateFromFile(certificateFile));

        Set<TrustAnchor> trustAnchorSet = new HashSet<>();

        for (int i = 1; i <= trustedCount; i++) {
            trustAnchorSet.add(new TrustAnchor(certCollection.get(certCollection.size() - i), null));
        }

        PKIXBuilderParameters params = new PKIXBuilderParameters(trustAnchorSet, certSelector);
        params.addCertStore(certStore);
        params.setRevocationEnabled(false);
        try {
            CertPathBuilder certPathBuilder = CertPathBuilder.getInstance("PKIX");
            CertPathBuilderResult certPathBuilderResult = certPathBuilder.build(params);
            CertPath certPath = certPathBuilderResult.getCertPath();
            CertPathValidator certPathValidator = CertPathValidator.getInstance("PKIX");
            certPathValidator.validate(certPath, params);
            return true;
        } catch (CertPathValidatorException | InvalidAlgorithmParameterException |
                 CertPathBuilderException e) {
            return false;
        }
    }

    public static PublicKey getPublicKey(String filename) throws InvalidAlgorithmParameterException, CertificateException, IOException, NoSuchAlgorithmException {
        var certs = getFilesFromFolder("jwe/certificates/intermediates");
        certs.addAll(getFilesFromFolder("jwe/certificates/trust-anchors"));
        if (!validateCertificate(filename, certs, 2))
            throw new IllegalArgumentException("Not a valid certificate!");

        X509Certificate cert = getCertificateFromFile(filename);

        return cert.getPublicKey();
    }

    public static PrivateKey getPrivateKey(String recipientPfx) throws UnrecoverableKeyException, KeyStoreException, NoSuchAlgorithmException, IOException, CertificateException {
        KeyStore ks = KeyStore.getInstance("PKCS12");
        ks.load(
                new FileInputStream(recipientPfx),
                password
        );
        Enumeration<String> entries = ks.aliases();
        if (entries.hasMoreElements()) {
            String alias = entries.nextElement();
            return (PrivateKey) ks.getKey(alias, password);
        }
        throw new UnrecoverableKeyException("Couldn't find a private key!");
    }
}
