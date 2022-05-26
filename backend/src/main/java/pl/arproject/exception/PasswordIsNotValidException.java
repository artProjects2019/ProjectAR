package pl.arproject.exception;

public class PasswordIsNotValidException extends RuntimeException {

    public PasswordIsNotValidException(String message) {
        super(message);
    }
}
