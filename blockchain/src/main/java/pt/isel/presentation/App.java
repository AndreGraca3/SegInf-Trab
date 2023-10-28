package pt.isel.presentation;

import pt.isel.blockchain.BlockChain;

public class App {
    public static void main(String[] args) {
        try {
            String cmd = args[0];
            switch (cmd) {
                case("addblock"):
                    BlockChain.addBlock(
                            Integer.parseInt(args[1]),
                            Integer.parseInt(args[2]),
                            Float.parseFloat(args[3]),
                            args[4]
                    );
                    break;
                case("verifychain"):
                    if(BlockChain.verifyChain(args[1])) {
                        System.out.println("Chain is valid!");
                    } else {
                        System.err.println("Chain is invalid!");
                    }
                    break;
                default:
                    throw new NoSuchMethodException("Invalid command " + cmd +" !");
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}