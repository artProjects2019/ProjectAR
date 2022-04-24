package pl.arproject.email;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RegistrationEmailService {

    private final EmailSender emailSender;

    public void sendEmail(String toEmail, String username, String token) {
        String message =
                "Hi " + username + "!\n" +
                "\nThank you for registering. Please click on the below link to activate your account:\n" +
                "https://ar-project2019.herokuapp.com/api/register/confirm/?token=" + token +
                "\n\nThis email is generated automatically, please do not reply.";
        String subject = "Confirm your email";

        emailSender.sendEmail(toEmail, subject, message);
    }
}
