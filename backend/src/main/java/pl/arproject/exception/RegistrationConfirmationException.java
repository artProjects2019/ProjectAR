package pl.arproject.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class RegistrationConfirmationException extends RuntimeException {
    private HttpStatus httpStatus;

    public RegistrationConfirmationException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
