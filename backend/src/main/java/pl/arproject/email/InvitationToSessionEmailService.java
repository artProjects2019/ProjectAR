package pl.arproject.email;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class InvitationToSessionEmailService {

    private final EmailSender emailSender;

    public void createAndSendEmail(String toEmail, String toUsername, String fromUsername, String sessionKey) {
        String message =
                "Hi " + toUsername + "!\n" +
                        "\n" + fromUsername + " have invited you to the private game session." +
                        " You can join the session using below key:\n" +
                        sessionKey +
                        "\n\nThis email is generated automatically, please do not reply.";
        String subject = "Invitation to the game session";

        emailSender.sendEmail(toEmail, subject, message);
    }
}
