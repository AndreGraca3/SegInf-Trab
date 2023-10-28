package pt.isel.jwe;

import java.util.ArrayList;
import java.util.Base64;

public class JweToken {

    private static final String regex = ".";

    public static String toJweToken(String AAD, byte[]... information) {
        StringBuilder res = new StringBuilder();
        res.append(AAD).append(regex);
        for (byte[] info : information) {
            res.append(
                    new String(Base64.getUrlEncoder().withoutPadding().encode(info))
            );
            if (information[information.length - 1] != info)
                res.append(regex);
        }
        return res.toString();
    }

    public static ArrayList<byte[]> fromString(String msg) {
        String[] split = msg.split("\\.");
        ArrayList<byte[]> res = new ArrayList<>();
        for (String str : split) {
            res.add(str.getBytes());
        }
        return res;
    }
}
