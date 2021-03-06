package pl.arproject.email;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RegistrationEmailService {

    private final EmailSender emailSender;

    public void createAndSendEmail(String toEmail, String toUsername, String token) {
        String message =
                "Hi " + toUsername + "!\n" +
                        "\nThank you for registering. With the below token you can activate your account:\n" +
                        token +
                        "\n\nThis email is generated automatically, please do not reply.";
        String subject = "Confirm your email";

        emailSender.sendEmail(toEmail, subject, message);
    }
}