package pl.arproject.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RegistrationRequestException.class)
    public ResponseEntity<Object> handleRegistrationRequestException(RegistrationRequestException e) {
        ApiException apiException = new ApiException(
                e.getMessage(),
                CONFLICT
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(RegistrationConfirmationException.class)
    public ResponseEntity<Object> handleRegistrationConfirmationException(RegistrationConfirmationException e) {
        ApiException apiException = new ApiException(
                e.getMessage(),
                e.getHttpStatus()
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException e) {
        ApiException apiException = new ApiException(
                e.getMessage(),
                NOT_FOUND
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(UserAlreadyInvitedException.class)
    public ResponseEntity<Object> handleUserAlreadyInvitedException(UserAlreadyInvitedException e) {
        ApiException apiException = new ApiException(
                e.getMessage(),
                CONFLICT
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(UsersAreAlreadyFriendsException.class)
    public ResponseEntity<Object> handleUsersAreAlreadyFriendsException(UsersAreAlreadyFriendsException e) {
        ApiException apiException = new ApiException(
                e.getMessage(),
                CONFLICT
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }
}
