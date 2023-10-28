package pt.isel.blockchain;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash {
    public static String hash(String ...msg) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        for (String part: msg) {
            md.update(part.getBytes());
        }
        var hashBytes = md.digest();
        StringBuilder hexString = new StringBuilder();

        for (byte b : hashBytes) {
            hexString.append(String.format("%02x", b));
        }
        return "0x" + hexString;
    }
}
