package pl.arproject.validator;

import org.springframework.stereotype.Service;
import pl.arproject.registration.RegistrationRequest;

import java.util.regex.Pattern;

@Service
public class UserDataValidator {

    public boolean patternMatches(String data, String regexPattern) {
        return Pattern.compile(regexPattern)
                .matcher(data)
                .matches();
    }

    public boolean isUsernameValid(String username) {
        String regexPattern = "[a-zA-Z0-9]{4,15}";
        return patternMatches(username, regexPattern);
    }

    public boolean isEmailValid(String email) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        return patternMatches(email, regexPattern);
    }

    public boolean isPasswordValid(String password) {
        String regexPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$";
        return patternMatches(password, regexPattern);
    }

    public String validateRegistrationRequest(RegistrationRequest request) {
        StringBuilder errorMessage = new StringBuilder();

        if(!isUsernameValid(request.getUsername())) {
            errorMessage.append("username is not valid\n");
        }

        if(!isEmailValid(request.getEmail())) {
            errorMessage.append("email is not valid\n");
        }

        if(!isPasswordValid(request.getPassword())) {
            errorMessage.append("password is not valid");
        }

        return errorMessage.toString();
    }
}
