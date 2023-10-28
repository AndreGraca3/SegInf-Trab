package pt.isel.blockchain;

import pt.isel.utils.BufferedFileOperations;

import java.io.IOException;

public class TransactionBlock {
    int source;
    int destination;
    float value;
    String hash;

    public TransactionBlock(int source, int destination, float value, String hash) {
        this.source = source;
        this.destination = destination;
        this.value = value;
        this.hash = hash;
    }

    public void addTransactionBlock(String fileName) {
        try {
            BufferedFileOperations.write(fileName, this.toString(), true);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public String toString() {
        return source + "," + destination + "," + value + "," + hash;
    }
}
