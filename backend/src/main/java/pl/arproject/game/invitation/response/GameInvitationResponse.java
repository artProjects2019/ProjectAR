package pl.arproject.game.invitation.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GameInvitationResponse {
    private String senderUsername;
    private String game;
    private String sessionKey;
}
