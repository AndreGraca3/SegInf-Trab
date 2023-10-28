package pt.isel.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.Objects;

public class Utils {
    public static ArrayList<String> getFilesFromFolder(String folderName) {
        ArrayList<String> files = new ArrayList<>();
        var folder = new File(folderName);
        for (var file : Objects.requireNonNull(folder.listFiles())) {
            files.add(file.getAbsolutePath());
        }
        return files;
    }
}
