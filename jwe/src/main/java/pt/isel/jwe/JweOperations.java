package pt.isel.jwe;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.PrivateKey;
import java.security.PublicKey;

public class JweOperations {

    private static final int ivSize = 12;
    private static final int tagLengthBits = 128;
    // 128 bits => 16 bytes
    private static final int tagLengthBytes = tagLengthBits / 8;
    private static final String AAD_HEADER = "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ";

    public static String enc(String someString, String recipientCertificate) {
        try {
            // generate symmetric Key
            KeyGenerator secretKeyGenerator = KeyGenerator.getInstance("AES");
            SecretKey symmetricKey = secretKeyGenerator.generateKey();

            byte[] IV = generateIV(ivSize);

            PublicKey publicKey = CertOperations.getPublicKey(recipientCertificate);

            // encrypt symmetric key using public Key
            byte[] encryptedSymmetricKey = SymmetricKeyOperations.encrypt(publicKey, symmetricKey);

            // encrypt message with Symmetric Key
            byte[] encryptedMessage = CryptOperations.encrypt(
                    someString,
                    AAD_HEADER,
                    symmetricKey,
                    IV,
                    tagLengthBits
            );

            byte[] encryptedMessageEncoded =
                    new String(encryptedMessage)
                            .substring(0, encryptedMessage.length - 1 - tagLengthBytes)
                            .getBytes();

            byte[] authenticationTagEncoded =
                    new String(encryptedMessage)
                            .substring(encryptedMessage.length - 1 - tagLengthBytes)
                            .getBytes();

            return JweToken.toJweToken(
                    AAD_HEADER,
                    encryptedSymmetricKey,
                    IV,
                    encryptedMessageEncoded,
                    authenticationTagEncoded
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public static String dec(String jweString, String recipientPfx) {
        try {

            String[] jweTokenSplit = jweString.split("\\.");
            var jweDecodedTokenSplit = JweToken.fromArray(jweTokenSplit);

            if (jweDecodedTokenSplit.size() != 5)
                throw new IllegalArgumentException("Expected number of arguments : 5 , got : " + jweDecodedTokenSplit.size());

            String AAD = jweTokenSplit[0];
            if (!AAD.equals(AAD_HEADER))
                throw new IllegalArgumentException("Received AAD is invalid!");

            PrivateKey privateKey = CertOperations.getPrivateKey(recipientPfx);
            byte[] encryptedSymmetricKey = jweDecodedTokenSplit.get(1);
            SecretKey symmetricKey = (SecretKey) SymmetricKeyOperations.decrypt(privateKey, encryptedSymmetricKey);

            byte[] IV = jweDecodedTokenSplit.get(2);

            byte[] encryptedMessage = (new String(jweDecodedTokenSplit.get(3)) + new String(jweDecodedTokenSplit.get(4))).getBytes();

            return CryptOperations.decrypt(
                    encryptedMessage,
                    AAD,
                    symmetricKey,
                    IV,
                    tagLengthBits
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private static byte[] generateIV(int size) {
        StringBuilder tmp = new StringBuilder();
        for (int i = 0; i < size; i++) {
            tmp.append((int) (Math.random() * 9));
        }
        return tmp.toString().getBytes();
    }
}
