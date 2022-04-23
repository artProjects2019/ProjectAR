package pl.arproject.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RegistrationRequestException.class)
    public ResponseEntity<Object> handleRegistrationRequestException(
            RegistrationRequestException e) {

        ApiException apiException = new ApiException(
                e.getMessage(),
                UNPROCESSABLE_ENTITY
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(RegistrationConfirmationException.class)
    public ResponseEntity<Object> handleRegistrationConfirmationException(
            RegistrationConfirmationException e) {

        ApiException apiException = new ApiException(
                e.getMessage(),
                e.getHttpStatus()
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(
            UserNotFoundException e) {

        ApiException apiException = new ApiException(
                e.getMessage(),
                NOT_FOUND
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }
}
