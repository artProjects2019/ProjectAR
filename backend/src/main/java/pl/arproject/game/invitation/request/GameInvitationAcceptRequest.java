package pl.arproject.game.invitation.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class GameInvitationAcceptRequest {
    private String receiverUsername;
    private String sessionKey;
}
