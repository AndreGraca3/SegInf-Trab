package pt.isel.presentation;

import pt.isel.jwe.JweOperations;

public class Main {
    public static void main(String[] args) throws NoSuchMethodException {
        String cmd = args[0];
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i < args.length - 1; i++) {
            sb.append(args[i]);
        }
        switch (cmd) {
            case ("enc"):
                System.out.println(JweOperations.enc(sb.toString(), args[args.length - 1]));
                break;
            case ("dec"):
                System.out.println(JweOperations.dec(args[1], args[2]));
                break;
            default:
                throw new NoSuchMethodException("Invalid command " + cmd + " !");
        }
    }
}
