package pt.isel.blockchain;

import jdk.jfr.Description;
import pt.isel.utils.BufferedFileOperations;

import java.io.BufferedReader;
import java.io.FileReader;

public class BlockChain {

    static TransactionBlock genesis =
            new TransactionBlock(-1, -1, -1F , "0x0");

    @Description("addBlock <origin> <destiny> <value> <filename>")
    public static void addBlock(int origin, int destiny, float value, String filename) {
        try {
            String lastBlockString = BufferedFileOperations.readLastLine(filename);
            if (lastBlockString == null) { // genesis doesn't exist
                genesis.addTransactionBlock(filename);
                lastBlockString = genesis.toString();
            }

            String hash = Hash.hash(lastBlockString);
            TransactionBlock newBlock =
                    new TransactionBlock(origin, destiny, value, hash);
            newBlock.addTransactionBlock(filename);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Description("verifyChain <filename>")
    public static boolean verifyChain(String filename) {
        try {
            BufferedReader reader = new BufferedReader(new FileReader(filename));
            var gen = reader.readLine(); // skip genesis
            if(gen == null) return true; // empty file
            if(!gen.equals(genesis.toString())) return false;

            String prevLine = genesis.toString();
            String currLine;
            while((currLine = reader.readLine()) != null) {
                if(!Hash.hash(prevLine).equals(currLine.split(",")[3])) return false;
                prevLine = currLine;
            }
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}