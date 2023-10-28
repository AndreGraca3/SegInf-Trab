package pt.isel.jwe;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.IvParameterSpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class CryptOperations {
    private static final String algorithm = "AES/GCM/NoPadding";

    public static byte[] encrypt(
            String msg,
            String AAD,
            SecretKey SymmetricKey,
            byte[] IV,
            int tagLength
    ) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
        Cipher cipher = Cipher.getInstance(algorithm);

        GCMParameterSpec gcm = new GCMParameterSpec(tagLength, new IvParameterSpec(IV).getIV());

        cipher.init(Cipher.ENCRYPT_MODE, SymmetricKey, gcm);

        cipher.updateAAD(AAD.getBytes());

        return cipher.doFinal(msg.getBytes());
    }

    public static String decrypt(
            byte[] msg,
            String AAD,
            SecretKey SymmetricKey,
            byte[] IV,
            int tagLength
    ) throws NoSuchPaddingException, NoSuchAlgorithmException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, InvalidAlgorithmParameterException {
        Cipher cipher = Cipher.getInstance(algorithm);

        GCMParameterSpec gcm = new GCMParameterSpec(tagLength, new IvParameterSpec(IV).getIV());

        cipher.init(Cipher.DECRYPT_MODE, SymmetricKey, gcm);

        cipher.updateAAD(AAD.getBytes());

        return new String(cipher.doFinal(msg));
    }

}
