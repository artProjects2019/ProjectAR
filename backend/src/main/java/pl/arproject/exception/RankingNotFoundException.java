package pl.arproject.exception;

public class RankingNotFoundException extends RuntimeException {
    public RankingNotFoundException(String message) {
        super(message);
    }
}
