package pt.isel.utils;

import java.io.*;

public class BufferedFileOperations {
    public static void write(String fileName, String blockWithHash, Boolean append) throws IOException {
        new File(fileName).createNewFile();
        PrintWriter writer = new PrintWriter(new FileWriter(fileName, append));
        writer.println(blockWithHash);
        writer.close();
    }

    public static String readLastLine(String fileName) throws IOException {
        new File(fileName).createNewFile();
        String lastLine = null;
        String sCurrentLine;
        BufferedReader reader = new BufferedReader(new FileReader(fileName));
        while ((sCurrentLine = reader.readLine()) != null) {
            lastLine = sCurrentLine;
        }
        return lastLine;
    }
}
