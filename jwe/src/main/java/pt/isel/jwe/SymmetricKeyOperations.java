package pt.isel.jwe;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.PrivateKey;
import java.security.PublicKey;

public class SymmetricKeyOperations {

    private final static String algorithm = "RSA/ECB/OAEPPadding";
    private final static String keyAlgorithm = "AES";

    public static byte[] encrypt(PublicKey publicKey, SecretKey symmetricKey) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);

        cipher.init(Cipher.WRAP_MODE, publicKey);

        return cipher.wrap(symmetricKey);
    }

    public static Key decrypt(PrivateKey kp, byte[] symmetricKey) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);

        cipher.init(Cipher.UNWRAP_MODE, kp);

        return cipher.unwrap(symmetricKey, keyAlgorithm, Cipher.SECRET_KEY);
    }
}
