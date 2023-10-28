package pt.isel.jwe;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.PrivateKey;
import java.security.PublicKey;

public class SymmetricKeyOperations {

    private final static String algorithm = "RSA/ECB/OAEPPadding";
    private final static String keyAlgorithm = "AES";

    public static byte[] encrypt(PublicKey kp, SecretKey SymmetricKey) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);

        cipher.init(Cipher.WRAP_MODE, kp);

        return cipher.wrap(SymmetricKey);
    }

    public static Key decrypt(PrivateKey kp, byte[] SymmetricKey) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);

        cipher.init(Cipher.UNWRAP_MODE, kp);

        return cipher.unwrap(SymmetricKey, keyAlgorithm, Cipher.SECRET_KEY);
    }
}
