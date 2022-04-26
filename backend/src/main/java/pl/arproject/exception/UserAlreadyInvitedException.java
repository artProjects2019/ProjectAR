package pl.arproject.exception;

public class UserAlreadyInvitedException extends RuntimeException {

    public UserAlreadyInvitedException(String message) {
        super(message);
    }
}
